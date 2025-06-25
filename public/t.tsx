"use client"
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { z } from "zod"
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {Control,FieldPath,useForm} from "react-hook-form";


const   ProfileForm=( ) =>{
 
const {formData,setFormData}=useState({
                  age:20,
                  height:160,
                  weight :60,
                  injuries:"None",
                  fitness_goals:"Muscle gain",
                  workout_days:5,
                  dietary_restrictions:"None",
                  fitness_level:"beginner"
    })

  
  const {  user } = useUser();

 const   OnSubmit=  async (values:z.infer<typeof formSchema>)=>{
     
   
      // go to convex db from here
  
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "user_id":user?.id,
  "age": formData.age,
  "height": formData.height,
  "weight": formData.weight,
  "injuries": formData.injuries,
  "fitness_goals":formData.fitness_goals,
  "workout_days": formData.workout_days,
  "dietary_restrictions": formData.dietary_restrictions,
  "fitness_level": formData.fitness_level
});
console.log(raw);
const requestOptions={
  method: "POST",
  headers: myHeaders,
  body: raw,
};

await fetch("https://beaming-cobra-603.convex.site/api/generate-program",requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  }

  return ( //just create a normal form with div and useStates and use some form of type checking and input length checking , test vapi and during production set appropriate frontend url in the http.ts file in convex 

    <div className="flex justify-center items-center mb-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>
          Health Report
          </CardTitle>
          <CardDescription>
        Fill out the following fields for our AI Agent to get to know you and help you reach your goals
          </CardDescription>
        </CardHeader>
      
  
      <form  >
        <CardContent> 
          {/* we are having issue with the width we need a 2d layout so we use a grid mx-auto isnt working so lets try to set max width  */}
         <div className="flex flex-row gap-4">
        <FormField
       
          name="age"
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Age(in years)</FormLabel>
              <FormControl>
                <Input placeholder="20" />
              </FormControl>
              <FormDescription>
                This is your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
         
          name="height"
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Height (in cm)</FormLabel>
              <FormControl>
                <Input placeholder="170" />
              </FormControl>
              <FormDescription>
                This is your height.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         </div>
         <div className="flex flex-row gap-4 mb-4 mt-4 ">
        <FormField
        
          name="weight"
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Weight (in kg)</FormLabel>
              <FormControl>
                <Input placeholder="73" />
              </FormControl>
              <FormDescription>
                This is your weight.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
       
         
          name="workout_days"
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Workout Days</FormLabel>
              <FormControl>
                <Input placeholder="5"/>
              </FormControl>
              <FormDescription className="mx-auto">
               No. of Days 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className= "flex-column space-y-4">
        <FormField
       
          name="injuries"
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Current Injuries</FormLabel>
              <FormControl>
                <Input placeholder="None" />
              </FormControl>
              <FormDescription>
                This is the injuries your body currently has.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
        
          name="fitness_goals"
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Fitness Goal</FormLabel>
              <FormControl>
                <Input placeholder="Muscle Gain" />
              </FormControl>
              <FormDescription>
                This is the fitness goal you are aiming for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
         
          name="dietary_restrictions"
          render={({ ...field }) => (
            <FormItem>
              <FormLabel>Dietary Restrictions</FormLabel>
              <FormControl>
                <Input placeholder="None" />
              </FormControl>
              <FormDescription>
               Dietary Restrictions you have
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
       
          name="fitness_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your fitness level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
             <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Beginner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
               Your current fitness level
              </FormDescription>
              <FormMessage />
              
            </FormItem>
           
          )}
        /></div>
       
</CardContent>
<div className=
{`flex justify-center items-center pt-4 `}>
<CardFooter>
  <div className="hover:bg-indigo-800">
        <Button type="submit"
         onClick={()=>{OnSubmit}}
          
         >
          Submit
          
         </Button>
         </div>
         </CardFooter>
         </div>
      </form>
    
    </Card>
    </div>
  )
}
// name of fieldprops can be anything bascically it states that the fields in the form must follow the name of terms in the schema great for verification 
interface ProfileFormFieldProps{
    name:FieldPath<z.infer<typeof formSchema>>;
    label:string;
    placeholder:string;
    description:string
    inputType:string;
    formControl:Control<z.infer<typeof formSchema>,any>
}
const ProfileFormField:React.FC<ProfileFormFieldProps>=({
name,label,placeholder,description,inputType,formControl,
})=>{
    
       return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default function page(){
  return(
    <ProfileForm/>
  )
}