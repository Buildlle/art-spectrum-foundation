'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

interface EditableContentProps {
  contentKey: string;
  type: 'text' | 'image' | 'link';
  defaultContent: string;
  page: string;
  position?: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  metadata?: Record<string, unknown>;
}

export default function EditableContent({
  contentKey,
  type,
  defaultContent,
  page,
  position,
  className = '',
  as: Component = 'div',
  metadata = {}
}: EditableContentProps) {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';

  const [content, setContent] = useState(defaultContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [originalContent, setOriginalContent] = useState(defaultContent);
  const editRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch current content from database
    fetchContent();
  }, [contentKey]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content?key=${contentKey}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.content) {
          setContent(data.content);
          setOriginalContent(data.content);
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleClick = () => {
    if (!isEditMode) return;
    setIsEditing(true);
    setTimeout(() => {
      if (editRef.current) {
        editRef.current.focus();
      }
    }, 0);
  };

  const handleSave = async () => {
    if (content === originalContent) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      // Try to update existing content
      let response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: contentKey,
          content,
          metadata
        })
      });

      // If content doesn't exist, create it
      if (!response.ok) {
        response = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: contentKey,
            type,
            content,
            metadata,
            page,
            position
          })
        });
      }

      if (response.ok) {
        setOriginalContent(content);
        setIsEditing(false);
      } else {
        alert('Failed to save content');
        setContent(originalContent);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
      setContent(originalContent);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setContent(originalContent);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (type === 'image') {
    return (
      <div className={`relative group ${isEditMode ? 'cursor-pointer' : ''}`}>
        <img
          src={content}
          alt={(metadata?.alt as string) || ''}
          className={className}
          onClick={handleClick}
        />
        {isEditMode && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-10 border-2 border-dashed border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
              Click to edit image
            </span>
          </div>
        )}
        {isEditing && (
          <div className="absolute top-0 left-0 right-0 bg-white p-4 shadow-lg border rounded z-50">
            <input
              type="url"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Image URL"
              onKeyDown={handleKeyDown}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Component
      className={`${className} ${isEditMode ? 'relative group cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {isEditing ? (
        <div
          ref={editRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          dangerouslySetInnerHTML={{ __html: content }}
          className="outline-none border-2 border-blue-500 bg-blue-50 p-2 rounded"
        />
      ) : (
        <>
          <span dangerouslySetInnerHTML={{ __html: content }} />
          {isEditMode && (
            <div className="absolute inset-0 bg-blue-500 bg-opacity-10 border-2 border-dashed border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                Click to edit
              </span>
            </div>
          )}
        </>
      )}
      {isSaving && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
          Saving...
        </div>
      )}
    </Component>
  );
}