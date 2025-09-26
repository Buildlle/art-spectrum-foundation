'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

interface EditableElement {
  id: string;
  type: 'text' | 'image' | 'link' | 'background';
  text: string;
  element: Element;
}

export default function BuildllEditor() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const isAdmin = (session?.user as { role?: string })?.role === 'admin';

  const [editingElement, setEditingElement] = useState<EditableElement | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editableElements, setEditableElements] = useState<EditableElement[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isAdmin && isEditMode) {
      initializeEditor();
    } else {
      cleanupEditor();
    }
  }, [isAdmin, isEditMode]);

  const initializeEditor = () => {
    // Find ALL editable elements including images, links, text, and background images
    const textSelectors = 'h1, h2, h3, h4, h5, h6, p, span, button, div';
    const imageSelectors = 'img';
    const linkSelectors = 'a';

    const editableElements: EditableElement[] = [];

    // Process text elements
    const textElements = document.querySelectorAll(textSelectors);
    textElements.forEach((element, index) => {
      if (shouldSkipElement(element)) return;

      const text = element.textContent?.trim() || '';
      if (text.length < 3) return;

      // Skip if it's inside a link (we'll handle the link separately)
      if (element.closest('a')) return;

      const id = `text-${index}`;
      editableElements.push({ id, type: 'text', text, element });
      setupElementForEditing(element, { id, type: 'text', text, element });
    });

    // Process images
    const imageElements = document.querySelectorAll(imageSelectors);
    imageElements.forEach((element, index) => {
      if (shouldSkipElement(element)) return;

      const img = element as HTMLImageElement;
      const src = img.src;
      const alt = img.alt;

      const id = `image-${index}`;
      editableElements.push({ id, type: 'image', text: src, element });
      setupElementForEditing(element, { id, type: 'image', text: src, element });
    });

    // Process links
    const linkElements = document.querySelectorAll(linkSelectors);
    linkElements.forEach((element, index) => {
      if (shouldSkipElement(element)) return;

      const link = element as HTMLAnchorElement;
      const href = link.href;
      const text = link.textContent?.trim() || '';

      const id = `link-${index}`;
      editableElements.push({ id, type: 'link', text: `${text}|${href}`, element });
      setupElementForEditing(element, { id, type: 'link', text: `${text}|${href}`, element });
    });

    // Process elements with background images (only larger containers)
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element, index) => {
      if (shouldSkipElement(element, true)) return;

      const htmlElement = element as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlElement);
      const backgroundImage = computedStyle.backgroundImage;

      // Check if element has a background image (not 'none')
      if (backgroundImage && backgroundImage !== 'none' && backgroundImage.includes('url(')) {
        // Only consider elements that are large enough to be background containers
        const rect = htmlElement.getBoundingClientRect();
        if (rect.width > 200 && rect.height > 100) {
          // Extract URL from background-image CSS property
          const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
          if (urlMatch && urlMatch[1]) {
            const imageUrl = urlMatch[1];

            const id = `bg-image-${index}`;
            editableElements.push({ id, type: 'background', text: imageUrl, element });
            setupElementForEditing(element, { id, type: 'background', text: imageUrl, element });
          }
        }
      }
    });

    setEditableElements(editableElements);
    injectEditorStyles();
  };

  const shouldSkipElement = (element: Element, isBackground = false) => {
    if (element.hasAttribute('data-editor-processed') ||
        element.closest('.fixed') ||
        element.closest('[class*="admin"]') ||
        element.closest('nav') ||
        element.closest('script') ||
        element.closest('style')) {
      return true;
    }

    // For background images, skip if element contains many text elements (likely a container)
    if (isBackground) {
      const textElements = element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
      if (textElements.length > 3) {
        return true; // Skip complex containers
      }
    }

    return false;
  };

  const setupElementForEditing = (element: Element, elementInfo: EditableElement) => {
    element.setAttribute('data-editor-processed', 'true');

    const handleClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      handleElementClick(elementInfo);
    };

    element.addEventListener('click', handleClick);
    element.classList.add('buildll-editable', `buildll-${elementInfo.type}`);
  };

  const cleanupEditor = () => {
    // Remove processed markers and classes
    const elements = document.querySelectorAll('[data-editor-processed]');
    elements.forEach(element => {
      element.classList.remove('buildll-editable');
      element.removeAttribute('data-editor-processed');
    });

    // Remove injected styles
    const styleElement = document.getElementById('buildll-editor-styles');
    if (styleElement) {
      styleElement.remove();
    }

    setEditableElements([]);
  };

  const injectEditorStyles = () => {
    // Remove existing styles
    const existingStyle = document.getElementById('buildll-editor-styles');
    if (existingStyle) existingStyle.remove();

    // Create new style element
    const style = document.createElement('style');
    style.id = 'buildll-editor-styles';
    style.textContent = `
      .buildll-editable {
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        position: relative !important;
        box-shadow: inset 0 0 0 2px transparent !important;
      }

      .buildll-editable:hover {
        box-shadow: inset 0 0 0 2px #3b82f6 !important;
      }

      /* Text elements - preserve original display */
      .buildll-text:hover {
        box-shadow: inset 0 0 0 2px #3b82f6 !important;
        background-color: rgba(59, 130, 246, 0.1) !important;
      }

      .buildll-text:hover::before {
        content: '📝 EDIT TEXT' !important;
        position: absolute !important;
        top: -25px !important;
        left: 0 !important;
        background: #3b82f6 !important;
        color: white !important;
        padding: 2px 6px !important;
        border-radius: 3px !important;
        font-size: 10px !important;
        font-weight: bold !important;
        font-family: system-ui, sans-serif !important;
        white-space: nowrap !important;
        z-index: 10000 !important;
        pointer-events: none !important;
      }

      /* Image elements */
      .buildll-image:hover {
        box-shadow: inset 0 0 0 2px #10b981 !important;
        background-color: rgba(16, 185, 129, 0.1) !important;
      }

      .buildll-image:hover::before {
        content: '🖼️ EDIT IMAGE' !important;
        position: absolute !important;
        top: -25px !important;
        left: 0 !important;
        background: #10b981 !important;
        color: white !important;
        padding: 2px 6px !important;
        border-radius: 3px !important;
        font-size: 10px !important;
        font-weight: bold !important;
        font-family: system-ui, sans-serif !important;
        white-space: nowrap !important;
        z-index: 10000 !important;
        pointer-events: none !important;
      }

      /* Link elements - preserve original display */
      .buildll-link:hover {
        box-shadow: inset 0 0 0 2px #f59e0b !important;
        background-color: rgba(245, 158, 11, 0.1) !important;
      }

      .buildll-link:hover::before {
        content: '🔗 EDIT LINK' !important;
        position: absolute !important;
        top: -25px !important;
        left: 0 !important;
        background: #f59e0b !important;
        color: white !important;
        padding: 2px 6px !important;
        border-radius: 3px !important;
        font-size: 10px !important;
        font-weight: bold !important;
        font-family: system-ui, sans-serif !important;
        white-space: nowrap !important;
        z-index: 10000 !important;
        pointer-events: none !important;
      }

      /* Background image elements */
      .buildll-background {
        position: relative !important;
      }

      .buildll-background:hover {
        box-shadow: inset 0 0 0 3px #8b5cf6 !important;
      }

      .buildll-background:hover::before {
        content: '🎨 EDIT BACKGROUND - Click here' !important;
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        background: #8b5cf6 !important;
        color: white !important;
        padding: 8px 12px !important;
        border-radius: 6px !important;
        font-size: 12px !important;
        font-weight: bold !important;
        font-family: system-ui, sans-serif !important;
        white-space: nowrap !important;
        z-index: 10000 !important;
        pointer-events: none !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
      }

      .buildll-background:hover::after {
        content: '' !important;
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        width: 120px !important;
        height: 40px !important;
        background: transparent !important;
        z-index: 9999 !important;
        cursor: pointer !important;
      }

      .buildll-editing {
        box-shadow: inset 0 0 0 3px #ef4444 !important;
        background-color: rgba(239, 68, 68, 0.1) !important;
      }
    `;
    document.head.appendChild(style);
  };

  const handleElementClick = (elementInfo: EditableElement) => {
    setEditingElement(elementInfo);

    // Prepare edit value based on element type
    let value = elementInfo.text;
    if (elementInfo.type === 'link') {
      // If it doesn't already have the pipe format, create it
      if (!value.includes('|')) {
        const link = elementInfo.element as HTMLAnchorElement;
        value = `${link.textContent || ''}|${link.href || ''}`;
      }
    }

    setEditValue(value);

    // Add editing class
    elementInfo.element.classList.add('buildll-editing');
  };

  const handleSave = async () => {
    if (!editingElement) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: editingElement.id,
          content: editValue
        })
      });

      if (!response.ok) {
        // Create new content if it doesn't exist
        const createResponse = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: editingElement.id,
            type: editingElement.type,
            content: editValue,
            page: window.location.pathname.slice(1) || 'home',
            position: editingElement.id
          })
        });

        if (!createResponse.ok) {
          throw new Error('Failed to save content');
        }
      }

      // Update the element in the DOM based on type
      updateElementInDOM(editingElement, editValue);

      // Update state
      setEditableElements(prev =>
        prev.map(el =>
          el.id === editingElement.id
            ? { ...el, text: editValue }
            : el
        )
      );

      setEditingElement(null);
      setEditValue('');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
      // Remove editing class
      if (editingElement) {
        editingElement.element.classList.remove('buildll-editing');
      }
    }
  };

  const updateElementInDOM = (elementInfo: EditableElement, newValue: string) => {
    const element = elementInfo.element as HTMLElement;

    switch (elementInfo.type) {
      case 'text':
        element.textContent = newValue;
        break;

      case 'image':
        (element as HTMLImageElement).src = newValue;
        break;

      case 'link':
        const [linkText, linkUrl] = newValue.split('|');
        element.textContent = linkText;
        (element as HTMLAnchorElement).href = linkUrl || '#';
        break;

      case 'background':
        // Update background image
        element.style.backgroundImage = `url("${newValue}")`;
        break;
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      // Update the edit value with the uploaded image URL
      setEditValue(result.url);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    if (editingElement) {
      editingElement.element.classList.remove('buildll-editing');
    }
    setEditingElement(null);
    setEditValue('');
    setUploadError('');
  };

  // Don't render anything if not admin or not in edit mode
  if (!isAdmin || !isEditMode) return null;

  return (
    <>
      {/* Editor status indicator */}
      <div className="fixed bottom-4 left-4 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
        {editableElements.length} editable elements
      </div>

      {/* Editing modal */}
      {editingElement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-6 text-slate-900">
              {editingElement.type === 'text' && 'Edit Text Content'}
              {editingElement.type === 'image' && 'Edit Image'}
              {editingElement.type === 'link' && 'Edit Link'}
              {editingElement.type === 'background' && 'Edit Background Image'}
            </h3>

            <div className="space-y-4">
              {editingElement.type === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Text Content
                  </label>
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    rows={4}
                    autoFocus
                    placeholder="Enter your text content..."
                  />
                </div>
              )}

              {(editingElement.type === 'image' || editingElement.type === 'background') && (
                <div className="space-y-4">
                  {/* Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Upload New {editingElement.type === 'background' ? 'Background ' : ''}Image
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file);
                          }
                        }}
                        disabled={isUploading}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={`cursor-pointer inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-full transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isUploading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                          </>
                        ) : (
                          <>
                            Choose File
                          </>
                        )}
                      </label>
                      <p className="text-xs text-slate-500 mt-2">
                        PNG, JPG, GIF, WebP up to 5MB
                      </p>
                    </div>
                    {uploadError && (
                      <p className="text-red-600 text-sm mt-2">{uploadError}</p>
                    )}
                  </div>

                  {/* OR Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">OR</span>
                    </div>
                  </div>

                  {/* URL Section */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {editingElement.type === 'background' ? 'Background Image URL' : 'Image URL'}
                    </label>
                    <input
                      type="url"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Preview */}
                  {editValue && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={editValue}
                        alt="Preview"
                        className="max-w-full h-32 object-cover rounded border"
                        onError={() => {}}
                      />
                    </div>
                  )}
                </div>
              )}

              {editingElement.type === 'link' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Link Text
                    </label>
                    <input
                      type="text"
                      value={editValue.split('|')[0] || ''}
                      onChange={(e) => setEditValue(`${e.target.value}|${editValue.split('|')[1] || ''}`)}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      placeholder="Click here"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Link URL
                    </label>
                    <input
                      type="url"
                      value={editValue.split('|')[1] || ''}
                      onChange={(e) => setEditValue(`${editValue.split('|')[0] || ''}|${e.target.value}`)}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">Preview:</p>
                    <a href="#" className="text-slate-900 hover:underline font-medium">
                      {editValue.split('|')[0] || 'Link Text'}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end mt-8">
              <button
                onClick={handleCancel}
                disabled={isSaving || isUploading}
                className="px-4 py-2 border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50 disabled:opacity-50 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || isUploading || editValue === editingElement.text}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full disabled:opacity-50 text-sm font-medium transition-colors"
              >
                {isSaving ? 'Saving...' : isUploading ? 'Uploading...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}