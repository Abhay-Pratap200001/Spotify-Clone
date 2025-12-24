// import { Button } from "@/components/ui/button"
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage"
 
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
    </Routes>
    </>
  )
}
 
export default App
