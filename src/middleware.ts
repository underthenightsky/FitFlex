import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse,type NextRequest } from 'next/server';
const isProtectedRoute = createRouteMatcher(["/generate-program","/profile","/chat"]);

// what we are doing here is basically storing all the protected routes in a isProtectedRouteConst, saying these pages should not be visited wiithout verification 
// export function middleleware(req:NextRequest){
//   console.log(req.nextUrl);
//   const res = NextResponse.next();
//   res.headers.append('Access-Control-Allow-Origin','*')

//   return res;
// }
export default clerkMiddleware(
  async (auth,req)=>{
    if(isProtectedRoute(req)) await auth.protect();
    // what we are doing here is checking if we are on a protected route and if we on such a route to check if we are logged in or not otherwise redirect us to the login page
  // console.log(req.nextUrl);
  // const res = NextResponse.next();
  // res.headers.append('Access-Control-Allow-Origin','*')

  // return res;
  } 
  
)


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
