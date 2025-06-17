     
     import { GoogleGenAI } from "@google/genai";
    

     export async function createWorkoutPlan(age:number,height:number,weight:number,injuries:string,workout_days:number,fitness_goals:string,fitness_level:string){

        const workoutPrompt = `You are an experienced fitness coach creating a personalized workout plan based on:
        Age: ${age}
        Height: ${height}
        Weight: ${weight}
        Injuries or limitations: ${injuries}
        Available days for workout: ${workout_days}
        Fitness goal: ${fitness_goals}
        Fitness level: ${fitness_level}
        
        As a professional coach:
        - Consider muscle group splits to avoid overtraining the same muscles on consecutive days
        - Design exercises that match the fitness level and account for any injuries
        - Structure the workouts to specifically target the user's fitness goal
        
        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
        - "sets" and "reps" MUST ALWAYS be NUMBERS, never strings
        - For example: "sets": 3, "reps": 10
        - Do NOT use text like "reps": "As many as possible" or "reps": "To failure"
        - Instead use specific numbers like "reps": 12 or "reps": 15
        - For cardio, use "sets": 1, "reps": 1 or another appropriate number
        - NEVER include strings for numerical fields
        - NEVER add extra fields not shown in the example below
        
        Return a JSON object with this EXACT structure:
        {
          "schedule": ["Monday", "Wednesday", "Friday"],
          "exercises": [
            {
              "day": "Monday",
              "routines": [
                {
                  "name": "Exercise Name",
                  "sets": 3,
                  "reps": 10
                }
              ]
            }
          ]
        }
        
        DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`.trim().replace(/[\r\n]+/g, "");

     
 
 
    const ai = new GoogleGenAI({ apiKey:process.env.GEMINI_API_KEY});
       let workoutPlan = await get_gemini_response(workoutPrompt,ai);
       workoutPlan=JSON.parse(workoutPlan);
       console.log(workoutPlan)
        workoutPlan=validateWorkoutPlan(workoutPlan);
       
        return workoutPlan;
        
      }


async function get_gemini_response(prompt:any,ai:any)  {
  
  let response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: "Generate a fitness plan based on the context without any extra spacing or new lines",
    config:{
      systemInstruction:prompt
    }
  });
  // console.log(response);
  response=response.text.replace(/\\s+/g,'').replace("json","").replace(/[```]/gm,"");
  // response =response.replace(/json|'''/g,"")
  // response=await ai.models.generateContent({
  //   model: "gemini-2.0-flash-001",
  //   contents: response,
  //   config:{
  //     systemInstruction:"convert this string to a valid JSON object"
  // }});

  return response;
}


  export async function createDietPlan(age:number,height:number,weight:number,injuries:string,workout_days:number,fitness_goals:string,fitness_level:string,dietary_restrictions:string){
        const dietPrompt = `You are an experienced nutrition coach creating a personalized diet plan based on:
        Age: ${age}
        Height: ${height}
        Weight: ${weight}
        Fitness goal: ${fitness_goals}
        Dietary restrictions:${dietary_restrictions}
        Fitness Level:${fitness_level}
        
        As a professional nutrition coach:
        - Calculate appropriate daily calorie intake based on the person's stats and goals
        - Create a balanced meal plan with proper macronutrient distribution
        - Include a variety of nutrient-dense foods while respecting dietary restrictions
        - Consider meal timing around workouts for optimal performance and recovery
        
        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
        - "dailyCalories" MUST be a NUMBER, not a string
        - DO NOT add fields like "supplements", "macros", "notes", or ANYTHING else
        - ONLY include the EXACT fields shown in the example below
        - Each meal should include ONLY a "name" and "foods" array

        Return a JSON object with this structure and no other fields , don't add "/n" or "''" while returning the json object:
        { "dailyCalories": 2000, "meals": [{ "name": "Breakfast","foods": ["Oatmeal with berries", "Greek yogurt", "Black coffee"]},
            {"name": "Lunch", "foods": ["Grilled chicken salad", "Whole grain bread", "Water"]
            }
          ]
        }
        
        DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`.trim().replace(/[\r\n]+/g, "");
        console.log(dietPrompt)
        
 
    const ai = new GoogleGenAI({ apiKey:process.env.GEMINI_API_KEY});
        let  dietPlan =await get_gemini_response(dietPrompt,ai);
        
        dietPlan = JSON.parse(dietPlan);
        console.log(dietPlan)
        return validateDietPlan(dietPlan);
     
      }

      // validate and fix workout plan to ensure it has proper numeric types
      //map just ensures that we apply a particualr check for all elements in an array just like a for loop
function validateWorkoutPlan(plan: any) {
  const validatedPlan = {
    schedule: plan.schedule,
    exercises: plan.exercises.map((exercise: any) => ({
      day: exercise.day,
      routines: exercise.routines.map((routine: any) => ({
        name: routine.name,
        sets: typeof routine.sets === "number" ? routine.sets : parseInt(routine.sets) || 1,
        reps: typeof routine.reps === "number" ? routine.reps : parseInt(routine.reps) || 10,
      })),
    })),
  };
  return validatedPlan;
}

// validate diet plan to ensure it strictly follows schema
function validateDietPlan(plan: any) {
  // only keep the fields we want
  const validatedPlan = {
    dailyCalories: plan.dailyCalories,
    meals: plan.meals.map((meal: any) => ({
      name: meal.name,
      foods: meal.foods,
    })),
  };
  return validatedPlan;
}
      