import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from "../pages/SignIn"

export function AppRoutes() {
  return(
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<SignIn />} />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  )
}