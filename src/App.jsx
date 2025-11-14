import Layout from './Components/layout/Layout'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'
import FAQsPage from './Pages/FAQsPage'
import About from './Pages/About'
import { AuthProvider } from './Context/AuthProvider'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import ClassesPage from './Pages/ClassesPage'
import LevelSubjectsPage from './Pages/LevelSubjectsPage'
import SubjectCourses from './Pages/SubjectCourses'
import CourseDetails from './Pages/CourseDetails'
import LectureViewer from './Pages/LectureViewer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExerciseCreation from './Pages/ExerciseCreation'
import ExercisePage from './Pages/ExercisePage'
import {CartProvider} from './Context/CartProvider'
import CartPage from './Pages/CartPage'
import SettingsPage from './Pages/SettingsPage'
import InstructorCourses from './Pages/InstructorCourses'
import CheckoutPage from './Pages/CheckoutPage'
import PaymentSuccessPage from './Pages/PaymentSuccessPage'
import PaymentCancelPage from './Pages/PaymentCancelPage'
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />         
          <Route path='faqs' element={<FAQsPage />} />           
          <Route path='about' element={<About />} />           
          <Route path="classes">
            <Route index element={<ClassesPage/>}/>
            <Route path=':level_id' element={<LevelSubjectsPage/>}/>
            <Route path='subject/:subject_id' element={<SubjectCourses/>}>
            </Route>
          </Route>
          <Route path='course/:id'>
            <Route index element={<CourseDetails/>}/>
            <Route path='lectures/:lecture_id' element={<LectureViewer/>}/>
            <Route path='exercises/:exercise_id' element={<ExercisePage/>}/>
            <Route path='exercise/create' element={<ExerciseCreation/>}/>
          </Route>
          <Route path="profile" element={<ProfilePage />} /> 
          <Route path="login" element={ <LoginPage />} /> 
          <Route path="register" element={<RegisterPage />} /> 
          <Route path='cart' element={<CartPage/>}/>
          <Route path='settings' element={<SettingsPage/>}/>
          <Route path='teacher/:id' element={<InstructorCourses/>} />
          <Route path='checkout' element={<CheckoutPage/>}/>
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/cancel" element={<PaymentCancelPage />} />
        </Route>
      </Routes>
      </CartProvider>
    </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>

  )
}

export default App