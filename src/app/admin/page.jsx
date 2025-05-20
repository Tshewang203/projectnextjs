import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import User from '@/models/User';
import AdminStats from '@/components/admin/AdminStats';
import RecentBookings from '@/components/admin/RecentBookings';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  await connectDB();

  // Get total bookings
  const totalBookings = await Booking.countDocuments();
  
  // Get bookings by status
  const pendingBookings = await Booking.countDocuments({ status: 'pending' });
  const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
  const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
  
  // Get total users
  const totalUsers = await User.countDocuments();
  
  // Get recent bookings
  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email');

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Statistics */}
      <AdminStats
        stats={[
          {
            name: 'Total Bookings',
            value: totalBookings,
            icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
          },
          {
            name: 'Pending Bookings',
            value: pendingBookings,
            icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
          },
          {
            name: 'Confirmed Bookings',
            value: confirmedBookings,
            icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          },
          {
            name: 'Total Users',
            value: totalUsers,
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
          },
        ]}
      />

      {/* Recent Bookings */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
        <RecentBookings bookings={recentBookings} />
      </div>
    </div>
  );
} 