'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function EditModeToolbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const [isDeploying, setIsDeploying] = useState(false);

  // Only show for authenticated admins
  if (status === 'loading') return null;
  if (!session || (session.user as any)?.role !== 'admin') return null;

  const toggleEditMode = () => {
    const params = new URLSearchParams(searchParams);
    if (isEditMode) {
      params.delete('edit');
    } else {
      params.set('edit', 'true');
    }
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl);
  };

  const handleDeploy = async () => {
    if (!confirm('Deploy your changes to the live site?')) return;

    setIsDeploying(true);
    try {
      const response = await fetch('/api/deploy', { method: 'POST' });
      if (response.ok) {
        alert('Deployment started! Your changes will be live shortly.');
      } else {
        alert('Failed to start deployment');
      }
    } catch (error) {
      alert('Failed to start deployment');
    } finally {
      setIsDeploying(false);
    }
  };

  const goToAdmin = () => {
    router.push('/admin');
  };

  if (!isEditMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleEditMode}
          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg transition-colors text-sm font-medium"
        >
          Enable Edit Mode
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={handleDeploy}
        disabled={isDeploying}
        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg"
      >
        {isDeploying ? 'Publishing...' : 'Publish Changes'}
      </button>

      <button
        onClick={goToAdmin}
        className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg"
      >
        Admin Dashboard
      </button>

      <button
        onClick={toggleEditMode}
        className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg"
      >
        Exit Edit Mode
      </button>
    </div>
  );
}