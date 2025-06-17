"use client"
;
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import  vapi  from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// changed the function name to something in capital due to react language specifications 
function GenerateProfile() {
  // goals - setup call between vapi and user and then and take the data and send it to the gemini 
  const[callActive,setCallActive]=useState(false);
  const[connecting,setConnecting]=useState(false);
  const[isSpeaking,setIsSpeaking]=useState(false);
  const [messages,setMessages]=useState<any[]>([]);
  const [callEnded,setCallEnded]= useState(false);

  const{user}=useUser();
  const router = useRouter();
  const messageContainerRef=useRef<HTMLDivElement>(null);
  // SOLUTION to get rid of "Meeting has ended" error
  useEffect(() => {
    const originalError = console.error;
    // override console.error to ignore "Meeting has ended" errors
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return; // don't pass to original handler
      }

      // pass all other errors to the original handler
      return originalError.call(console, msg, ...args);
    };

    // restore original handler on unmount
    return () => {
      console.error = originalError;
    };
  }, []);
  // we want to build a dashboard where the user can see the messages appear as they speak and autoscroll, through them, we will do so using the messages react variable
  useEffect(()=>{
    if(messageContainerRef.current){
      messageContainerRef.current.scrollTop=messageContainerRef.current.scrollHeight;
    }
  },[messages]) // any change in the messages varirable , that is when any new line is said this useEffect will be called 

    // now that we have created all these variable to store the state of the call , now we need to extract this data from vapi , these are the event listeners
    // setup event listeners for vapi
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };
    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);
    
    //send to user to the profile page once the call ends
    useEffect(()=>{
      // this is why callEnded variable is so important
     
        // const router already created
        // we have set the src as base and all paths can be found relative to it allowing easy movement, path similar to the ones seen on websites moving from home page to another 
        if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(redirectTimer);
      }
    },[callEnded,router])

    async function toggleCall(){
      // if there is a preexisting call stop it
      if(callActive){
        vapi.stop()
      }
      else{
        //start new call
       
        try{
            setConnecting(true);
            setMessages([]);
            setCallEnded(false);
            const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        }); 
        }catch(error){
          console.log(error);
          setConnecting(false);
          //if we see an error stop the connection
        }     

      }
    }
  return (
    <div className="flex  flex-col jutify-content p-4 pb-10">
            <CardHeader className="flex justify-center-safe items-center flex-col">
                <CardTitle>
                  <p>
                Generate you own Fitness Program
            </p>
            </CardTitle>
            <CardDescription>
            <p className="italic ">
                Have a chat with our AI assistant to create your plan 
            </p>
            </CardDescription>
            </CardHeader>
          
    <div className="flex justify-center flex-row mt-2.5 mb-4 mx-auto">
        
        <Card className="mr-10 flex-1/2 border border-gray-200 shadow-lg">
            <CardHeader>
                <CardTitle>
                       <Avatar>
        <AvatarImage src="/hero-ai2.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>            
                </CardTitle>
                <CardDescription>
                   
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardTitle>FlexFit</CardTitle>
                <CardDescription>
                    Fitnesss and Diet Coach
                </CardDescription>
            </CardContent>
            <CardFooter>
                <CardAction>
                <Button>Status</Button>
                </CardAction>
            </CardFooter>
        </Card>
        <Card className="mr-auto ml-auto flex-1/2 border border-gray-200 shadow-lg">
            <CardHeader>
                <CardTitle>
                       <Avatar>
        <AvatarImage src="/boy.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>            
                </CardTitle>
                
            </CardHeader>
            <CardContent className="flex-grow">
                <CardTitle>
                You
                </CardTitle>
                <CardDescription>
                    User
                </CardDescription>
            </CardContent>
            <CardFooter className="flex-end">
                <CardAction>
                <Button className="bg-indigo-900">
                    Ready
                    </Button>
                </CardAction>
            </CardFooter>
        </Card>
       
    </div>
     {/* MESSAGE COINTER  */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
          >
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">
                    {msg.role === "assistant" ? "CodeFlex AI" : "You"}:
                  </div>
                  <p className="text-foreground">{msg.content}</p>
                </div>
              ))}

              {callEnded && (
                <div className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-primary mb-1">System:</div>
                  <p className="text-foreground">
                    Your fitness program has been created! Redirecting to your profile...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
    <div className={`justify-center items-center flex m-auto ${
      callActive ?"bg-destructive hover:bg-destructive"
      :callEnded?"bg-green-600 hover-bg-green-600"
      :"bg-primary "
    } text-white `}>
    <Button onClick={toggleCall}
    disabled={connecting ||callEnded}>
       
            {
                callActive ? "End Call"
                : connecting  ?"Connecting ..."
                :callEnded ?"View Profile"
                :"Start Call"
            }
       
    </Button>
   </div>
    
    
   
   </div>
      
  )
}

export default GenerateProfile;