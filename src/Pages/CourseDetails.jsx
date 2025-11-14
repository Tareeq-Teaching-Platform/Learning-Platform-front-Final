import React from 'react'
import { useAuth } from '../Context/AuthProvider'
import TeacherCourseView from '../Components/courseViews/TeacherCourseView.jsx'
import StudentCourseView from '../Components/courseViews/StudentCourseView.jsx'
const CourseDetails = () => {
  const {user} = useAuth()

  return(
    <>
    {(user?.role ==='teacher' || user?.role==="admin") && <TeacherCourseView/>}
    {(user?.role ==='student' || !user) && <StudentCourseView/>}
    </>
  )
}

export default CourseDetails