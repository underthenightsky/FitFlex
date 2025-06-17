import { SignUp } from "@clerk/nextjs"

function SignUpPage() {
  return (
   <main>
    {/* here using tailwimd we can use the flexbox , height to the whole screen , full width , place the box itself in the center and then plce the items on the center */}
    <div className="flex h-screen w-full items-center justify-center">
      <SignUp/>
    </div>
   </main>
  )
}

export default SignUpPage;