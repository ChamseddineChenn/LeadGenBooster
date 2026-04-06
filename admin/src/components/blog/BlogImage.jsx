import { useState, useRef } from 'react';
import { Trash2, Upload, ImageIcon } from 'lucide-react';

const BlogImage = ({ content, onChange, onDelete }) => {
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne peut pas dépasser 5 Mo");
      return;
    }

    setError('');

    // Create local blob URL for preview
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        url: event.target.result, // base64 data URL for preview
        file: file, // Store file for later upload
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onChange({ url: '', file: null });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Image
        </span>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <div className="mb-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {content ? (
        <div className="relative group">
          <img
            src={content}
            alt="Blog"
            className="w-full rounded-lg object-cover max-h-80"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <button
              onClick={handleRemoveImage}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors"
            >
              Supprimer l'image
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Upload à la sauvegarde
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#D71C1C] hover:bg-gray-50 transition-all"
        >
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500">
              Cliquez pour ajouter une image
            </span>
            <span className="text-xs text-gray-400">
              JPG, PNG, WebP — Max 5 Mo
            </span>
            <span className="text-xs text-gray-300 mt-2">
              ⚠️ L'image sera uploadée lors de la sauvegarde
            </span>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default BlogImage;
