import { Trash2 } from 'lucide-react';

const BlogTitle = ({ content, color, onChange, onColorChange, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all focus-within:border-[#D71C1C] focus-within:shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Titre de section
          </span>
          <input
            type="color"
            value={color || '#1f2937'}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border border-gray-200"
            title="Couleur du titre"
          />
        </div>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <input
        type="text"
        value={content || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Entrez le titre de section..."
        className="w-full text-xl font-bold border-none outline-none bg-transparent placeholder-gray-300"
        style={{ color: color || '#1f2937' }}
      />
    </div>
  );
};

export default BlogTitle;
