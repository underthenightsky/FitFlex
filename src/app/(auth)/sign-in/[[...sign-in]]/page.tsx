import { SignIn } from "@clerk/nextjs"

function SignInPage() {
  return (
   <main>
    {/* here using tailwimd we can use the flexbox , height to the whole screen , full width , place the box itself in the center and then plce the items on the center */}
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn/>
    </div>
   </main>
  )
}

export default SignInPage;