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
  <Card className='flex flex-column min-h-screen flex-grow'>
    <Card className="flex flex-row  justify-content-center  flex-grow
 ">
   
    <Card className="flex flex-column  flex-1/3">
      <CardHeader>
        <CardTitle>Tranform your body with advanced AI technology</CardTitle>
        <CardDescription>
        Talk to our AI Assistant and get personalized diet plans and workout routiens designed just for you 
        </CardDescription>
       
      </CardHeader>
      <CardContent className='flex justify-content-center '>
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
      <CardFooter className="flex-col justify-end">
        
        <Button variant="outline" className="w-full"
        asChild>
          <Link href="/generate-program">
          Build your Program 
          </Link>          
        </Button>
      </CardFooter>
    </Card> 
    
    
    <div className="flex flex-2/3 justify-center mx-auto flex-col">
      <div className="flex  justify-center ">
        <div className="flex flex-col">
        <CardTitle>FlexFit</CardTitle>
        <CardDescription>
         Your personal AI Trainer
        </CardDescription>  
           
      </div>
      <div className=' mx-auto flex flex-col'>
        <div className="flex flex-col">
        <div className="flex-col">
      <div>New Users</div>
     
  <ChartContainer config={chartConfig} className="min-h-[200px] max-w-1/2">
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


<div className="flex-col">
      <div>New Users</div>
     
  <ChartContainer config={chartConfig} className="min-h-[200px] max-w-1/2">
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
</div>
      </div>
     
    </div>
  </Card>

   
    <Card className="flex flex-column flex-2/3 ">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>
        Check out the reviews from our 100+ customers
        </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-row'>
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
    
    </Card>
  )
}

export default page