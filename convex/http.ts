
import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import {createDietPlan,createWorkoutPlan} from "./getPlans"

const http = httpRouter();

http.route({
  path: "/clerk-webhook", //we are trying to send some data regarding user to clerk like data updation
  // this data is being sent from clerk to us and we  need to verify it and send it to convex to say that a user has been created or updated 
  // after sign in or updation clerk will go to the link ehere our db is hosted/this url allowing upadtion if no malicious requests are found
  method: "POST", // we need convex cause its faster to query results from there than clerk
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");
// check if svix is presernt which shows that requests are authenticated
    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("No svix headers found", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;
    // create a webhoook event and return the result of the operation so that we can tell the user if the sign in or signup was effective or not 
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      //once clerk has verified that tjis is okay and has created it in its user dashboard we send a notification to convex that a user with these details has been created and add it to the convex database
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;

      const email = email_addresses[0].email_address;

      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();
        // mutation means trying to update the user data fields , we see that he user is trying to do something like this , store the fields and return the results of the operation
      try {
        await ctx.runMutation(api.users.updateUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (error) {
        console.log("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
      }
    }

    return new Response("Webhooks processed successfully", { status: 200 });
  }),
});

http.route({
  path: "/api/generate-program",
  method: "OPTIONS",
  handler: httpAction(async (ctx, request) => {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          // e.g. https://mywebsite.com, configured on your Convex dashboard
          "Access-Control-Allow-Origin": process.env.CLIENT_ORIGIN!,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Digest",
          "Access-Control-Max-Age": "86400",
        }),
      });
    } else {
      return new Response();
    }
  }),
});

http.route({
  path:"/api/generate-program",
  method:"POST",
  handler: httpAction(async (ctx,req)=>{
    //req is the command and , ctx is the additional data provided to perform that action , this is not the req,res of mongo.express
    
    try{
      
        const payload = await req.json();
        // extract values from the payload
        const{
          user_id,age,height,weight,injuries,workout_days,fitness_goals,fitness_level,dietary_restrictions
        }=payload;
       
       
        
        const dietPlan= await createDietPlan(age,height,weight,injuries,workout_days,fitness_goals,fitness_level,dietary_restrictions);
        
        const workoutPlan =await  createWorkoutPlan(age,height,weight,injuries,workout_days,fitness_goals,fitness_level);

        // now that we have these values first generate a fitness paln and then store both the data and diet paln of the user in the convex db to show in the profile section 

        const planId= await ctx.runMutation(api.plans.createPlan,{
          userId:user_id,
          dietPlan,
          isActive:true,
          workoutPlan,
          name:  `${fitness_goals} Plan -${new Date().toLocaleDateString()}`
        })
        // in the name  of the plan we just want to name it using the fitness plan chosen by the user and than append the date of the creation i.e today's date 
        return new Response(
          JSON.stringify({
            success:true,
            data:{
              planId,
              workoutPlan,
              dietPlan
            }
          }),{
            status:200,
            headers:new Headers({
        // e.g. https://mywebsite.com, configured on your Convex dashboard
        "Access-Control-Allow-Origin": process.env.CLIENT_ORIGIN!,
        Vary: "origin",
      }),})
    }
    catch(error){
      console.log("Error while generating program from gemini",error,`ctx-${ctx}`,`req-${req}`)
      return new Response(
        JSON.stringify({
          success:false,
          error:error instanceof Error ? error.message:String(error),
          ctx:ctx,
          req:req
        })
        ,{status:500,
          headers: { "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"}})
    }
  })

  

})
export default http;