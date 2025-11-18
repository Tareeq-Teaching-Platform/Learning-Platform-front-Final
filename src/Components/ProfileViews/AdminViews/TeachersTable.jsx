import { DeleteIcon, Edit, Loader2, PlusCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { API_BASE_URL } from '../../../config/api';
import { useAuth } from '../../../Context/AuthProvider';
import EditUserModal from './EditUserModal';
import RegisterTeacherModal from './ReigsterTeacherModal';

// eslint-disable-next-line react-hooks/rules-of-hooks
DataTable.use(DT);

const TeachersTable = () => {
  const {user} = useAuth();
  const [creatingTeacher,setCreatingTeacher] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const queryClient = useQueryClient();

  // fetching the teachers data
  const {data: teachers, isLoading, error} = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/admin/teachers`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.data.teachers;
    },
    staleTime: 5 * 60 * 1000,
  });

  // deleting a teacher:
  const deleteMutation = useMutation({
    mutationFn: async (teacherId) => {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}/users/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['teachers']});
      toast.success('Teacher deleted successfully!');
    },

    onError: (error) => {
      toast.error("Failed to delete teacher");
      console.error(error)
    }
  });

  const handleDelete = (teacher) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${teacher.name}?`
    );

    if (confirmed) {
      deleteMutation.mutate(teacher.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Prepare data for DataTable
  const tableData = teachers?.map(teacher => [
    teacher.id,
    teacher.name,
    teacher.email,
    formatDate(teacher.created_at),
    formatDate(teacher.updated_at),
    teacher // Pass the whole teacher object for actions
  ]) || [];

  // Event handler for button clicks in DataTable
  useEffect(() => {
    const handleClick = (e) => {
      // Handle delete button clicks
      if (e.target.closest('.delete-btn')) {
        const teacherId = parseInt(e.target.closest('.delete-btn').dataset.teacherId);
        const teacher = teachers?.find(t => t.id === teacherId);
        if (teacher) handleDelete(teacher);
      }
      
      // Handle edit button clicks
      if (e.target.closest('.edit-btn')) {
        const teacherId = parseInt(e.target.closest('.edit-btn').dataset.teacherId);
        const teacher = teachers?.find(t => t.id === teacherId);
        if (teacher) setEditingTeacher(teacher);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [teachers]);

  useEffect(() => {
    console.log("Teachers list:", teachers)
  }, [teachers])

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className='animate-spin w-8 h-8' />
    </div>
  );

  if (error) return (
    <div className="alert alert-error">
      <span>Error loading teachers...</span>
    </div>
  );

  return (
    <div>
      <div className='w-full flex'>
                        <button onClick={()=>setCreatingTeacher(true)} className='btn bg-green-400 shadow- border-0 hover:scale-101 duration-100 ml-auto'>Register Teacher <PlusCircleIcon/></button>
                        </div>
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
                targets: 5, // Actions column
                orderable: false,
                searchable: false,
                render: (data, type, row) => {
                  const teacher = row[5];
                  return `
                    <div class="flex gap-2">
                      <button class="btn bg-red-500 text-white border-0 btn-error btn-sm delete-btn" data-teacher-id="${teacher.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                      <button class="btn bg-yellow-300 border-0 btn-sm edit-btn" data-teacher-id="${teacher.id}">
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
              <th>Joined At</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
        </DataTable>
      </div>

      {editingTeacher && (
        <EditUserModal
          User={editingTeacher}
          onClose={() => setEditingTeacher(null)}
        />
      )}

      {creatingTeacher && (
        <RegisterTeacherModal onClose={()=>setCreatingTeacher(false)} />
      )}
    </div>
  )
}

export default TeachersTable