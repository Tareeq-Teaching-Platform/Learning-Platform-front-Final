import React from 'react'
import { useAuth } from '../Context/AuthProvider'
import { Loader2Icon } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children,alllowedRoles}) => {
    const {user,loading} = useAuth();
    
    if(loading) {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Loader2Icon className='h-8 w-8 animate-spin' />
        </div>
    )
}

    if(!user){
        return<Navigate to='/login' replace />;
        
    }
    if(alllowedRoles && !alllowedRoles.includes(user.role)) {
        return <Navigate to='/unauthorized' replace />;
    }

    //show the component
  return children
}

export default ProtectedRoute;