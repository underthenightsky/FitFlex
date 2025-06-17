"use client"
import Vapi from "@vapi-ai/web";

const key = process.env.NEXT_PUBLIC_VAPI_API_KEY;

 export const vapi = new Vapi(key!)
    console.log(vapi);
     
//   is used to show that the data type could be undefined or string as expected, clerk will handle env management
// we are expoting a live vapi connection made by connecting to the website using the API