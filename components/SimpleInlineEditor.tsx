'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function SimpleInlineEditor() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const isAdmin = (session?.user as { role?: string })?.role === 'admin';
  const [editingElement, setEditingElement] = useState<HTMLElement | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (isAdmin && isEditMode) {
      makeElementsEditable();
    }
  }, [isAdmin, isEditMode]);

  const makeElementsEditable = () => {
    // Find all text elements that should be editable
    const selectors = 'h1, h2, h3, h4, h5, h6, p, span, button';
    const elements = document.querySelectorAll(selectors);

    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;

      // Skip elements that are already processed or are in edit controls
      if (htmlElement.hasAttribute('data-inline-editable') ||
          htmlElement.closest('.inline-editor-modal') ||
          htmlElement.closest('.inline-editor-toolbar')) {
        return;
      }

      // Only process elements with actual text content
      const textContent = htmlElement.textContent?.trim();
      if (!textContent || textContent.length < 3) return;

      // Mark as editable
      htmlElement.setAttribute('data-inline-editable', 'true');
      htmlElement.style.cursor = 'pointer';
      htmlElement.style.outline = '2px solid transparent';
      htmlElement.style.transition = 'all 0.2s ease';

      // Add hover effects
      const handleMouseEnter = () => {
        htmlElement.style.outline = '2px dashed #3b82f6';
        htmlElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
      };

      const handleMouseLeave = () => {
        htmlElement.style.outline = '2px solid transparent';
        htmlElement.style.backgroundColor = 'transparent';
      };

      const handleClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        setEditingElement(htmlElement);
        setEditValue(htmlElement.textContent || '');
      };

      htmlElement.addEventListener('mouseenter', handleMouseEnter);
      htmlElement.addEventListener('mouseleave', handleMouseLeave);
      htmlElement.addEventListener('click', handleClick);
    });

    // Add styles for editing indicator
    if (!document.getElementById('inline-editor-styles')) {
      const style = document.createElement('style');
      style.id = 'inline-editor-styles';
      style.textContent = `
        [data-inline-editable]:hover::after {
          content: '✏️ Click to edit';
          position: absolute;
          background: #3b82f6;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          white-space: nowrap;
          z-index: 10000;
          pointer-events: none;
          transform: translateY(-100%);
        }
      `;
      document.head.appendChild(style);
    }
  };

  const saveContent = async () => {
    if (!editingElement) return;

    try {
      // Generate a simple ID from the element's text
      const elementId = editingElement.textContent?.slice(0, 20).replace(/\s+/g, '-').toLowerCase() || 'content';

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: elementId,
          type: 'text',
          content: editValue,
          page: window.location.pathname || '/',
          position: elementId
        })
      });

      if (response.ok || response.status === 409) { // 409 means it already exists
        // Update existing content
        await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: elementId,
            content: editValue
          })
        });
      }

      // Update the element
      editingElement.textContent = editValue;
      setEditingElement(null);
      setEditValue('');
    } catch (error) {
      alert('Failed to save changes');
    }
  };

  if (!isAdmin || !isEditMode) return null;

  return (
    <>
      {/* Edit Mode Indicator */}
      <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow-lg">
        🎨 EDIT MODE - Click any text to edit
      </div>

      {/* Edit Modal */}
      {editingElement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 inline-editor-modal">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Edit Content</h3>
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full h-32 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={saveContent}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingElement(null);
                  setEditValue('');
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}