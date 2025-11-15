import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthProvider'
import Hero from '../Components/Hero';
import ImageCarousel from '../Components/ImageCarousel';
import LevelsImageCarousel from '../Components/LevelsImageCarousel';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useQuery } from '@tanstack/react-query';
const Home = () => {
  const {user} = useAuth();
  const [teachers,setTeachers] = useState([]);

  const fetchClasses = async () => {
    const response = await axios.get(`${API_BASE_URL}/levels`);
    return response.data.data.levels;
  };
  
  const { data: classes, isLoading, isError, error } = useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
  });
  
  useEffect(()=>{
    const fetchTeachers = async()=>{
      try {
      const response = await axios.get(`${API_BASE_URL}/users/teachers`)
      const teachersList = response.data.data.teachers;
      

      const transformedList = teachersList.map((teacher)=>({
        id:teacher.id,
        title:teacher.name,
        url:teacher.profile_picture
      }))
      setTeachers(transformedList)
    } catch (error) {
      console.error("Error fetching teachers: ",error)
    }
    }
    fetchTeachers()
  },[])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }
  
  if (isError) return <div>Error: {error.message}</div>;
  console.log(classes)
  return (
    <div className='flex flex-col'>
      <Hero/>
      <div>
        <LevelsImageCarousel title={"Class Levels"} images={classes} scrollIndicator={3.65}/>
      </div>
      <div>
        <ImageCarousel title={"Teachers"} images={teachers} scrollIndicator={4.2}/>
      </div>
    </div>
  )
}

export default Home