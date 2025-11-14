import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'
import { useCart } from '../Context/CartContext'
import { useAuth } from '../Context/AuthProvider'

const InstructorCourses = () => {
  const { user } = useAuth();
  const { id } = useParams()
  const { addToCart, isInCart, removeFromCart } = useCart();

  // Fetch teacher courses
  const getTeacherCourses = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/courses?teacher=${id}`)
    return response.data.data.courses
  }

  const { data: teacherCoursesList, isLoading, error } = useQuery({
    queryKey: ["teacherCourses", id],
    queryFn: () => getTeacherCourses(id),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  })

  // Fetch enrolled course IDs
  const { data: enrolledCourseIds = [], isLoading: enrollmentsLoading } = useQuery({
    queryKey: ['enrolled-course-ids', user?.id],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/users/enrolled-courses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data.enrolled_course_ids;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  // Create a Set for fast lookup
  const enrolledSet = new Set(enrolledCourseIds);

  // Helper function to check if user is enrolled in a course
  const isEnrolled = (courseId) => {
    return enrolledSet.has(courseId);
  }

  if (isLoading) {
    return <div className='flex justify-center items-center min-h-screen'>
      <span className='loading size-10 loading-spinner text-black'></span>
    </div>;
  }

  if (error) {
    return <div className='p-6 m-6'>Error loading courses: {error.message}</div>;
  }

  if (!teacherCoursesList || teacherCoursesList.length === 0) {
    return <div className='p-6 m-6'>No classes available for this instructor</div>;
  }

  return (
    <div className='grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 m-6'>
      {teacherCoursesList.map((course) => (
        <div className="card bg-base-100 shadow-sm" key={course.id}>
          <Link to={`/course/${course.id}`}>
            <figure>
              <img className='w-full'
                src={`${course?.icon ? course.icon : 'https://tse3.mm.bing.net/th/id/OIP.b24O8PL795Ze4GaRBCOEegHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3'}`}
                alt={course.name} />
            </figure>
          </Link>

          <div className="card-body">
            <h2 className="card-title">
              {course.title}
            </h2>
            <p>{course.description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{course.teacher_name} شرح الاستاذ</div>
              <div className="badge badge-outline">${course.price}</div>
            </div>

            <div className='card-actions justify-center items-center p-3 mt-1'>
              {/* Check if enrolled first (only for logged-in users) */}
              {user && isEnrolled(course.id) ? (
                <Link
                  to={`/course/${course.id}`}
                  className='btn btn-success w-full'
                >
                  ✓ Go to Course
                </Link>
              ) : isInCart(course.id) ? (
                // In cart - show cart options (works for both logged in and guest)
                <div className='flex gap-2 w-full'>
                  <button
                    disabled
                    className='btn btn-success flex-1'
                  >
                    ✓ In Cart
                  </button>
                  <button
                    onClick={() => removeFromCart(course.id)}
                    className='btn btn-error'
                  >
                    Remove
                  </button>
                </div>
              ) : (
                // Not enrolled, not in cart - allow anyone to add
                <button
                  onClick={() => addToCart(course)}
                  className='btn btn-primary w-full'
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InstructorCourses