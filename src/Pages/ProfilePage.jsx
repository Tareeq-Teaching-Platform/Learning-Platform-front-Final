import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthProvider'
import StudentProfile from '../Components/ProfileViews/StudentProfile';
import AdminProfile from '../Components/ProfileViews/AdminProfile';
import TeacherProfile from '../Components/ProfileViews/TeacherProfile';
import NotLoggedIn from '../Components/NotLoggedIn';

const ProfilePage = () => {
  const {user} = useAuth();
  
  if(!user) return <NotLoggedIn/>

  return (
    <>
    {user?.role === 'student' && <StudentProfile/>}
    {user?.role === 'admin' && <AdminProfile/>}
    {user?.role === 'teacher' && <TeacherProfile/>}
    </>
  )
}

export default ProfilePage