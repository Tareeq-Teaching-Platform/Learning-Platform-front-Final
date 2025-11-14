import { DeleteIcon, Edit, Loader2, PlusCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { API_BASE_URL } from '../../../config/api';
import EditClassModal from './EditClassModal'
import CreateLevelModal from './CreateLevelModal'
DataTable.use(DT);

const ClassesTable = () => {
  const [editingClass, setEditingClass] = useState(null);
  const queryClient = useQueryClient();
  const [creatingClass, setCreatingClass] = useState(false);
  // fetching the classes data
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/levels`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.data.levels;
    },
    staleTime: 5 * 60 * 1000,
  });

  // deleting a class:
  const deleteMutation = useMutation({
    mutationFn: async (classId) => {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}/levels/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast.success('Class deleted successfully!');
    },

    onError: (error) => {
      toast.error("Failed to delete class");
      console.error(error)
    }
  });

  const handleDelete = (classData) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${classData.name}?`
    );

    if (confirmed) {
      deleteMutation.mutate(classData.id);
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
  const tableData = classes?.map(classItem => [
    classItem.id,
    classItem.name,
    formatDate(classItem.created_at),
    formatDate(classItem.updated_at),
    classItem // Pass the whole class object for actions
  ]) || [];

  // Event handler for button clicks in DataTable
  useEffect(() => {
    const handleClick = (e) => {
      // Handle delete button clicks
      if (e.target.closest('.delete-btn')) {
        const classId = parseInt(e.target.closest('.delete-btn').dataset.classId);
        const classData = classes?.find(c => c.id === classId);
        if (classData) handleDelete(classData);
      }
      
      // Handle edit button clicks
      if (e.target.closest('.edit-btn')) {
        const classId = parseInt(e.target.closest('.edit-btn').dataset.classId);
        const classData = classes?.find(c => c.id === classId);
        if (classData) setEditingClass(classData);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [classes]);

  useEffect(() => {
    console.log("Classes list:", classes)
  }, [classes])

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className='animate-spin w-8 h-8' />
    </div>
  );
  
  if (error) return (
    <div className="alert alert-error">
      <span>Error loading classes...</span>
    </div>
  );

  return (
    <>
    <div className='w-full flex'>
                        <button onClick={()=>setCreatingClass(true)} className='btn bg-green-300 shadow- border-0 hover:scale-101 duration-100 ml-auto'>Create Class <PlusCircleIcon/></button>
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
                targets: 4, // Actions column
                orderable: false,
                searchable: false,
                render: (data, type, row) => {
                  const classData = row[4];
                  return `
                    <div class="flex gap-2">
                      <button class="btn bg-red-400 border-0 btn-error btn-sm delete-btn" data-class-id="${classData.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                      <button class="btn bg-yellow-200 border-0 btn-sm edit-btn" data-class-id="${classData.id}">
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
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
        </DataTable>
      </div>

      {editingClass && (
        <EditClassModal
          classData={editingClass}
          onClose={() => setEditingClass(null)}
        />
      )}
      {creatingClass && (
        <CreateLevelModal onClose={()=>setCreatingClass(false)}/>
      )}
    </>
  )
}

export default ClassesTable