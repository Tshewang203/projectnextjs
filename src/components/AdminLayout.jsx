import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const AdminLayout = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/auth/signin');
  }

  // Check if user has admin role
  if (!session?.user?.role === 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout; 