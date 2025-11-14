import { Loader2, PlusCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react'
import DT from 'datatables.net-dt'
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../../../config/api';
import { toast } from 'react-toastify';
import EditCourseModal from './EditCourseModal';
import CreateCourseModal from './CreateCourseModal';

DataTable.use(DT);

const CoursesTable = () => {
  const queryClient = useQueryClient();
  const [editingCourse, setEditingCourse] = useState(false);
  const [creatingCourse, setCreatingCourse] = useState(false);

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const token = await localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/admin/courses`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      return response.data.data.courses
    },
    staleTime: 5 * 60 * 1000,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (courseId) => {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course deleted successfully!');
    },
    onError: (error) => {
      toast.error("Failed to delete course");
      console.error(error)
    }
  });

  const handleDelete = (course) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${course.title}?`
    );

    if (confirmed) {
      deleteMutation.mutate(course.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    { data: 'id' },
    { data: 'title' },
    { data: 'description' },
    { 
      data: 'price',
      render: (data) => `$${Number(data).toFixed(2)}`
    },
    { data: 'token_price' },
    { 
      data: 'status',
      render: (data) => {
        const badgeClass = data === 'active' ? 'badge-success' : 'badge-error';
        return `<span class="badge ${badgeClass}">${data}</span>`;
      }
    },
    { 
      data: 'created_at',
      render: (data) => formatDate(data)
    },
    { 
      data: 'expires_at',
      render: (data) => data ? formatDate(data) : 'N/A'
    },
    { data: 'level_name' },
    { data: 'subject_name' },
    { data: 'teacher_name' },
    {
      data: null,
      orderable: false,
      searchable: false,
      render: (data, type, row) => {
        return `
          <div class="flex gap-2">
            <button class="btn bg-red-400 border-0 btn-error btn-sm delete-btn" data-course-id="${row.id}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
            <button class="btn bg-yellow-200 border-0 btn-sm edit-btn" data-course-id="${row.id}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
          </div>
        `;
      }
    }
  ];

  // Event handler for button clicks
  useEffect(() => {
    const handleClick = (e) => {
      // Handle delete button clicks
      if (e.target.closest('.delete-btn')) {
        const courseId = parseInt(e.target.closest('.delete-btn').dataset.courseId);
        const course = courses?.find(c => c.id === courseId);
        if (course) handleDelete(course);
      }
      
      // Handle edit button clicks
      if (e.target.closest('.edit-btn')) {
        const courseId = parseInt(e.target.closest('.edit-btn').dataset.courseId);
        const course = courses?.find(c => c.id === courseId);
        if (course) setEditingCourse(course);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [courses]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className='animate-spin w-8 h-8' />
    </div>
  );
  
  if (error) return (
    <div className="alert alert-error">
      <span>Error loading courses...</span>
    </div>
  );

  return (
    <>
      <div className='w-full flex'>
                        <button onClick={()=>setCreatingCourse(true)} className='btn bg-green-300 shadow- border-0 hover:scale-101 duration-100 ml-auto'>Create a Course <PlusCircleIcon/></button>
                        </div>
      <div className='overflow-x-auto'>
        <DataTable 
          data={courses || []}
          columns={columns} 
          className='display table table-zebra'
          options={{
            pageLength: 10,
            ordering: true,
            searching: true,
            lengthChange: true,
            info: true
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Token Price</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Expires At</th>
              <th>Level</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
        </DataTable>
      </div>

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
        />
      )}

      {creatingCourse && (
        <CreateCourseModal
        onClose={()=>setCreatingCourse(false)}
        />
      )}
    </>
  )
}

export default CoursesTable