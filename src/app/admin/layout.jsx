import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 