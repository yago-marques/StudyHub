import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from "../pages/SignIn"
import { UserRegister } from '../pages/UserRegister';
import { Profile } from '../pages/Profile';
import { PostPage } from '../components/PostPage';
import { Checklist } from '../pages/CheckList';

export function AppRoutes() {
  return(
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/cadastro" element={<UserRegister />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/post/:post_uid" element={<PostPage />} />
      <Route path="/checklist" element={<Checklist />} />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  )
}