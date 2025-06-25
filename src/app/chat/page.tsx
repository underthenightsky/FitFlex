"use client"
import React,{useState} from "react";
import {useUser} from "@clerk/nextjs"
import {Button} from "@/components/ui/button"
import axios from "axios"
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';




 const ProfileForm=()=>{
  // for storing the data of the user 
  const [formData,setFormData]= useState({
                  age:20,
                  height:160,
                  weight :60,
                  injuries:"None",
                  fitness_goals:"Muscle gain",
                  workout_days:5,
                  dietary_restrictions:"None",
                  fitness_level:"beginner"
  });
  // to get the user_id of the user 
  const {user}= useUser();

  // handle change in input for all fields
  function changeHandler(e:any){
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  // to handle form type and input validation 
 
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit(e:any){
    e.preventDefault();


    const body = JSON.stringify({
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
    console.log(body);
    // get headers for sending request
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions= {
      method:"POST",
      headers:myHeaders,
      body:body
    }

    // send the request 
    await fetch("https://beaming-cobra-603.convex.site/api/generate-program",requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  
  }
  return (
   
    <div className="grid grid-cols-2  justify-center-safe gap-y-1 justify-items-center">

      <p className="text-3xl col-span-2 ">Health Report</p>
      <p className="text-base  col-span-2">Fill out the following fields for our AI Agent to get to know you and help you reach your goals</p>

      <div className="grid grid-rows-subgrid col-span-1 row-span-2">
        <label>Your Age</label>
        <input type="text" name="age" className="border-1 border-white rounded-lg pl-2" value={formData.age} onChange={changeHandler} />
      </div>

       <div className="grid grid-rows-subgrid col-span-1 row-span-2">
        <label>Height</label>
        <input type="text" name="Height"  value={formData.height} onChange={changeHandler} className="border-1 border-white rounded-lg  pl-2"/>
      </div>

      <div className="grid grid-rows-subgrid col-span-1 row-span-2">
        <label>Weight</label>
        <input type="text" name="Weight"  value={formData.weight} onChange={changeHandler} className="border-1 border-white rounded-lg  pl-2"/>
      </div>

       <div className="grid grid-rows-subgrid col-span-1 row-span-2">
        <label>Workout Days</label>
        <input type="text" name="workout_days"  value={formData.workout_days} onChange={changeHandler}  className="border-1 border-white rounded-lg  pl-2"/>
      </div>

      <div className="grid grid-rows-subgrid col-span-1 row-span-2">
        <label>Current Injuries</label>
        <input type="text" name="injuries" value={formData.injuries} onChange={changeHandler}  className="border-1 border-white rounded-lg  pl-2"/>
      </div>

      <div className="grid grid-rows-subgrid col-span-1 row-span-2">
        <label>Fitness Goals</label>
        <input type="text" name="fitness_goals" value={formData.fitness_goals} onChange={changeHandler} className="border-1 border-white rounded-lg  pl-2" />
      </div>

      <div className="grid grid-rows-subgrid col-span-1 row-span-2">
        <label>Dietary Restrictions</label>
        <input type="text" name="dietary_restrictions" value={formData.dietary_restrictions} onChange={changeHandler} className="border-1 border-white rounded-lg  pl-2" />
      </div>

      <div className="grid grid-rows-subgrid col-span-1 row-span-2    ">
        <label htmlFor="fitness_level"  className="  ">Fitness Level</label>
        <input type="select"/>
        <select id="fitness_level"  name="fitness_level" value={formData.fitness_level} onChange={changeHandler}  className=" border-1 border-white rounded-lg  pl-2 ">
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        </select>
        
      </div>

    <button  onClick={onSubmit} className="bg-auto col-span-2 row-span-2 justify-self-center bg-black rounded-xl pr-2 pl-2 pt-1 pb-1" >
      Submit
      </button>

    </div>
   
  )

}

export default ProfileForm