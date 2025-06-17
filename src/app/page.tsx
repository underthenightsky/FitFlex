"use client"
import Link from "next/link"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  // CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Bar, BarChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from 'next/image'
import {  CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { DivideCircle } from "lucide-react"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
export function page() {

  return (
  <div className='grid grid-rows-2 grid-auto-flow-col p-4'>
    <div className="grid  grid-cols-1 md:grid-cols-2
    lg:grid-cols-3 justify-center grid-auto-flow-row gap-x-2.5 rounded-sm m-2 
 ">
   
    <div className="grid grid-auto-flow-col   grid-rows-5 col-span-1 bg-slate-800 rounded-md m-top-3 p-2 border-accent">
     
        <CardTitle className="row-span-1">Tranform your body with advanced AI technology</CardTitle>
        <div className="row-span-1">
        Talk to our AI Assistant and get personalized diet plans and workout routiens designed just for you 
        </div>
       
     
      <CardContent className='flex justify-content-center row-span-1'>
        <CardTitle className="flex flex-row">
          <CardContent>
            500+ Active Users
          </CardContent>
          <CardContent>
           3 min generation
          </CardContent>
          <CardContent>
          100% personalized
          </CardContent>
        </CardTitle>
      </CardContent>
      <CardFooter className="row-span-1 flex-col justify-end">
        
        <Button variant="outline" className="w-full"
        asChild>
          <Link href="/generate-program">
          Build your Program 
          </Link>          
        </Button>
      </CardFooter>
    </div> 
    
    
    <div className="grid grid-auto-flow-col grid-col-1 md:grid-col-2 justify-center col-span-2 m-3">
    
        <div className="flex flex-col col-span-2">
        <CardTitle>FlexFit</CardTitle>
        <CardDescription>
         Your personal AI Trainer
        </CardDescription>  
           
      </div>

     
        <div className="flex-col col-span-1">
      <div>Fitness Enthusisasts Helped</div>
     
  <ChartContainer config={chartConfig} className="min-h-[200px] ">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>

</div>
<div className="flex-col col-span-1">
      <div>Patients Rehabilitiated</div>
     
  <ChartContainer config={chartConfig} className="min-h-[200px] ">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
 </div>  



  
     
    </div>
  </div>

   
    <Card className="flex flex-column flex-2/3 ">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>
        Check out the reviews from our 100+ customers
        </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-row  gap-5'>
        <Card className=" flex flex-column flex-1/3">
          <CardHeader >
          <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <CardDescription>
        Simon 
      </CardDescription>      
          </CardHeader>
          <CardContent>
          <CardTitle>
            Beginner
          </CardTitle>
          <CardDescription className="flex flex-column">
            1. 5 Days workout
            2. Knee Injury
            3. Age-37
          </CardDescription>
          </CardContent>
          <CardFooter>
            <CardAction>
         <Button>
          See workout Plan
         </Button>
            </CardAction>
          </CardFooter>
        </Card>
        <Card className=" flex flex-column flex-1/3">
          <CardHeader >
          <Avatar>
        <AvatarImage src="https://github.com/evilrabbit.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <CardDescription>
        Trevor
      </CardDescription>      
          </CardHeader>
          <CardContent>
          <CardTitle>
            Intermediate
          </CardTitle>
          <CardDescription className="flex flex-column">
            1. 5 Days workout
            2. Hip Injury
            3. Age-45
          </CardDescription>
          </CardContent>
          <CardFooter>
            <CardAction>
         <Button>
          See workout Plan
         </Button>
            </CardAction>
          </CardFooter>
        </Card>
        <Card className=" flex flex-column flex-1/3">
          <CardHeader >
          <Avatar>
        <AvatarImage src="https://github.com/leerob.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <CardDescription>
        Leeroy
      </CardDescription>      
          </CardHeader>
          <CardContent>
          <CardTitle>
            Beginner
          </CardTitle>
          <CardDescription className="flex flex-column">
            1. 3 Days workout
            2. Arm Injury
            3. Age-42
          </CardDescription>
          </CardContent>
          <CardFooter>
            <CardAction>
         <Button>
          See workout Plan
         </Button>
            </CardAction>
          </CardFooter>
        </Card>
        </CardContent>
        
    </Card>
    
    </div>
  )
}

export default page