"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";

 const ConvexReactProvider1 = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


function ConvexReactProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={ConvexReactProvider1}>
    
        {children}
     
    </ConvexProvider>
  );
}

export default ConvexReactProvider;