import { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill-new';
// Quill CSS loaded via index.html to avoid Tailwind v4 parser conflict

const BlogParagraph = ({ content, onChange, onDelete }) => {
  const [isFocused, setIsFocused] = useState(false);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }],
        ['link'],
        ['clean'],
      ],
    }),
    [],
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'color',
    'link',
  ];

  return (
    <div
      className={`bg-white border rounded-lg p-4 transition-all ${
        isFocused
          ? 'border-[#D71C1C] shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Paragraphe
        </span>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="blog-paragraph-editor">
        <ReactQuill
          value={content || ''}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Rédigez votre paragraphe..."
        />
      </div>
    </div>
  );
};

export default BlogParagraph;
