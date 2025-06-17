"use client"
import { useUser } from "@clerk/nextjs";
import  Link  from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
 

} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton } from '@clerk/nextjs';

export function Navbar(){
  const {isSignedIn}= useUser();
  if(isSignedIn){
    return NavbarAuthenticated();
  }
  else{
   return  NavbarUnauthenticated()
  }
}

function NavbarAuthenticated(){
    
  return (
      
        
        <NavigationMenu className="flex flex-row flex-grow right-0">
  <NavigationMenuList className=" justify-end items-end space-x-4 " >
<NavigationMenuItem>
    <Avatar>
  <AvatarImage src="/exercise.jpg" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
</NavigationMenuItem>
    <NavigationMenuItem className="text-xl" asChild>
      <Link href="/">
      FlexFit</Link>
    </NavigationMenuItem>
       <NavigationMenuItem>   
        <Link href="/profile"><button className="text-base hover:border-indigo-600 ">
      Profile</button></Link>      
    </NavigationMenuItem>
      <NavigationMenuItem>  
        <DropdownMenu>
  <DropdownMenuTrigger><button className="">
    Get Started</button>
    </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Start your Fitness Assessment</DropdownMenuLabel>
    <DropdownMenuSeparator />
   <DropdownMenuItem> <Link href="/generate-program">
      Call
      </Link></DropdownMenuItem>
    <DropdownMenuItem><Link href="/chat">
      Fill out a Form
      </Link></DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu> 
     
    </NavigationMenuItem>
    <NavigationMenuItem>   
     
        <SignOutButton >
           
      <button className="">Sign Out</button>
       
    </SignOutButton>
   
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

  )

}
function NavbarUnauthenticated(){

  return (
    <NavigationMenu className="flex flex-row justify-end space-x-1">
  <NavigationMenuList className="justify-end items-end space-x-4">
    <NavigationMenuItem>
    <Avatar>
  <AvatarImage src="/exercise.jpg" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
</NavigationMenuItem>
    <NavigationMenuItem className="text-xl">
      
      FlexFit
    </NavigationMenuItem>
       <NavigationMenuItem>     
   
         <Link href="/sign-in"><button className="text-base hover:border-indigo-600 ">
      Sign In</button></Link>   
      
    </NavigationMenuItem>
    <NavigationMenuItem>     
   
       <Link href="/sign-up"><button className="text-base hover:border-indigo-600 ">
      Sign Up</button></Link> 
      
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
  )
}
export default Navbar;