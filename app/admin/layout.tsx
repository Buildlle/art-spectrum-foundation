'use client';

import { useSession, signOut } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Don't apply auth checks to the login page
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-slate-50">
        {children}
      </div>
    );
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen bg-slate-50">Loading...</div>;
  }

  if (!session || (session.user as any)?.role !== 'admin') {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-slate-900">
              ASF Content Management
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">
                Welcome, {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => window.open('/', '_blank')}
                className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                View Site
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}