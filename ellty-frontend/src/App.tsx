import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "@/pages/Register"
import Login from "@/pages/Login"
import Main from "./pages/Main"
import { Toaster } from 'sonner'
export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
    <Toaster richColors />
    </>
  )
}
