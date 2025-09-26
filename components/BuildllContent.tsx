'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

interface BuildllContentProps {
  id: string;
  text: string;
  type: 'text' | 'image' | 'link';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  page?: string;
  children?: React.ReactNode;
}

export default function BuildllContent({
  id,
  text,
  type = 'text',
  className = '',
  as: Component = 'span',
  page = 'default',
  children
}: BuildllContentProps) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const isAdmin = (session?.user as any)?.role === 'admin';
  const [currentText, setCurrentText] = useState(text);

  // Only show edit capabilities to admins in edit mode
  const canEdit = isAdmin && isEditMode;

  useEffect(() => {
    // Fetch current content from database
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content?key=${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.content) {
          setCurrentText(data.content);
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleEdit = async (newText: string) => {
    try {
      // Try to update existing content
      let response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: id,
          content: newText
        })
      });

      // If content doesn't exist, create it
      if (!response.ok) {
        response = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: id,
            type,
            content: newText,
            page,
            position: id
          })
        });
      }

      if (response.ok) {
        setCurrentText(newText);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    }
  };

  if (type === 'image') {
    return (
      <img
        src={currentText}
        alt=""
        className={className}
        data-buildll-id={id}
        data-buildll-text={currentText}
        data-buildll-type={type}
        data-buildll-editable={canEdit ? 'true' : 'false'}
      />
    );
  }

  return (
    <Component
      className={className}
      data-buildll-id={id}
      data-buildll-text={currentText}
      data-buildll-type={type}
      data-buildll-editable={canEdit ? 'true' : 'false'}
    >
      {children || currentText}
    </Component>
  );
}