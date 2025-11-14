import { DeleteIcon, Edit, Loader2, BookOpen } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { API_BASE_URL } from '../../../config/api';
import { useAuth } from '../../../Context/AuthProvider';
import EditUserModal from './EditUserModal'

// eslint-disable-next-line react-hooks/rules-of-hooks
DataTable.use(DT);

const StudentsTable = () => {
  const { user } = useAuth();
  const [editingStudent, setEditingStudent] = useState(null);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const queryClient = useQueryClient();

  // fetching the students data
  const { data: students, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/admin/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.data.students;
    },
    staleTime: 5 * 60 * 1000,
  });

  // deleting a student:
  const deleteMutation = useMutation({
    mutationFn: async (studentId) => {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}/users/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student deleted successfully!');
    },

    onError: (error) => {
      toast.error("Failed to delete student");
      console.error(error)
    }
  });

  const handleDelete = (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (confirmed) {
      deleteMutation.mutate(student.id);
    }
  };

  const toggleExpandCourses = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Prepare data for DataTable
  const tableData = students?.map(student => [
    student.id,
    student.name,
    student.email,
    student.tokens,
    student.total_enrolled_courses,
    formatDate(student.created_at),
    formatDate(student.updated_at),
    student // Pass the whole student object for actions
  ]) || [];

  // Event handler for button clicks in DataTable
  useEffect(() => {
    const handleClick = (e) => {
      // Handle delete button clicks
      if (e.target.closest('.delete-btn')) {
        const studentId = parseInt(e.target.closest('.delete-btn').dataset.studentId);
        const student = students?.find(s => s.id === studentId);
        if (student) handleDelete(student);
      }
      
      // Handle edit button clicks
      if (e.target.closest('.edit-btn')) {
        const studentId = parseInt(e.target.closest('.edit-btn').dataset.studentId);
        const student = students?.find(s => s.id === studentId);
        if (student) setEditingStudent(student);
      }
      
      // Handle view courses button clicks
      if (e.target.closest('.view-courses-btn')) {
        const studentId = parseInt(e.target.closest('.view-courses-btn').dataset.studentId);
        toggleExpandCourses(studentId);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [students]);

  useEffect(() => {
    console.log("Students list:", students)
  }, [students])

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className='animate-spin w-8 h-8' />
    </div>
  );
  
  if (error) return (
    <div className="alert alert-error">
      <span>Error loading students...</span>
    </div>
  );

  return (
    <>
      <div className="overflow-x-auto">
        <DataTable
          data={tableData}
          className="display table table-zebra"
          options={{
            pageLength: 10,
            ordering: true,
            searching: true,
            lengthChange: true,
            info: true,
            columnDefs: [
              {
                targets: 3, // Tokens column
                render: (data) => `<span class="badge badge-primary">${data}</span>`
              },
              {
                targets: 4, // Enrolled Courses column
                render: (data, type, row) => {
                  const student = row[7];
                  return `
                    <button 
                      class="btn btn-sm btn-ghost gap-2 view-courses-btn" 
                      data-student-id="${student.id}"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                      ${data} course${data !== 1 ? 's' : ''}
                    </button>
                  `;
                }
              },
              {
                targets: 7, // Actions column
                orderable: false,
                searchable: false,
                render: (data, type, row) => {
                  const student = row[7];
                  return `
                    <div class="flex gap-2">
                      <button class="btn bg-red-400 border-0 btn-error btn-sm delete-btn" data-student-id="${student.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                      <button class="btn bg-yellow-200 border-0 btn-sm edit-btn" data-student-id="${student.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                    </div>
                  `;
                }
              }
            ]
          }}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Tokens</th>
              <th>Enrolled Courses</th>
              <th>Joined At</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
        </DataTable>
      </div>

      {/* Course expansion modal */}
      {expandedStudent && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Enrolled Courses</h3>
            {students?.find(s => s.id === expandedStudent)?.enrolled_courses.length > 0 ? (
              <div className="grid gap-2">
                {students?.find(s => s.id === expandedStudent)?.enrolled_courses.map((course) => (
                  <div 
                    key={course.course_id} 
                    className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{course.course_name}</span>
                      <span className={`ml-3 badge ${
                        course.enrollment_status === 'active' 
                          ? 'badge-success' 
                          : 'badge-error'
                      }`}>
                        {course.enrollment_status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>Enrolled: {formatDate(course.enrolled_at)}</span>
                      {course.expires_at && (
                        <span className="ml-4">
                          Expires: {formatDate(course.expires_at)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No enrolled courses yet
              </div>
            )}
            <div className="modal-action">
              <button className="btn" onClick={() => setExpandedStudent(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {editingStudent && (
        <EditUserModal
          User={editingStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}
    </>
  )
}

export default StudentsTable