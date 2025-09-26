'use client';

import { useState, useEffect } from 'react';
import { ContentBlock } from '@/lib/db';

export default function AdminDashboard() {
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerDeploy = async () => {
    try {
      const response = await fetch('/api/deploy', { method: 'POST' });
      const data = await response.json();
      alert('Deployment triggered successfully!');
    } catch (error) {
      alert('Failed to trigger deployment');
    }
  };

  if (loading) {
    return <div>Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <button
          onClick={triggerDeploy}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Deploy Changes
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Inline Editor
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            To edit content inline, visit your live site and add <code>?edit=true</code> to any URL.
          </p>
          <a
            href="/?edit=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Open Inline Editor
          </a>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          <li className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Content Blocks</h3>
              <span className="text-sm text-gray-500">{content.length} blocks</span>
            </div>
          </li>
          {content.map((block) => (
            <li key={block.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      block.type === 'text' ? 'bg-blue-100 text-blue-800' :
                      block.type === 'image' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {block.type}
                    </span>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {block.key}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Page: {block.page} | Last modified: {new Date(block.lastModified!).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 truncate max-w-md">
                    {block.content}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    block.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {block.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}