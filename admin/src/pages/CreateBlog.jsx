import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Type,
  FileText,
  ImageIcon,
  Save,
  Loader2,
  Eye,
  Check,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import BlogTitle from '../components/blog/BlogTitle';
import BlogParagraph from '../components/blog/BlogParagraph';
import BlogImage from '../components/blog/BlogImage';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CATEGORIES = [
  { value: 'conseils', label: 'Conseils' },
  { value: 'tendances', label: 'Tendances' },
  { value: 'etudes', label: 'Études de cas' },
  { value: 'guide', label: 'Guide' },
  { value: 'technologie', label: 'Technologie' },
  { value: 'legislation', label: 'Législation' },
];

/**
 * Sanitize Quill's HTML output before saving to DB.
 * Removes inline styles that cause text overflow issues on the frontend
 * (white-space: pre-wrap, fixed widths, etc.) while preserving
 * formatting classes and semantic tags.
 */
const sanitizeQuillHtml = (html) => {
  if (!html) return html;

  // Quill encodes every space as &nbsp; (non-breaking space).
  // Non-breaking spaces prevent the browser from wrapping text at those
  // positions, so the entire paragraph acts as one giant unbreakable word
  // and the browser is forced to break mid-word at the container edge.
  // Fix: replace &nbsp; with regular spaces.
  let cleaned = html.replace(/&nbsp;/g, ' ');

  // Also replace the raw unicode non-breaking space character (\u00A0)
  cleaned = cleaned.replace(/\u00A0/g, ' ');

  // Use DOMParser to clean up inline styles
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleaned, 'text/html');

  // Walk all elements and clean up problematic styles
  const allElements = doc.body.querySelectorAll('*');
  allElements.forEach((el) => {
    const style = el.getAttribute('style');
    if (style) {
      const cleanedStyle = style
        .replace(/white-space\s*:\s*[^;]+;?/gi, '')
        .replace(/(?<!max-|min-)width\s*:\s*[^;]+;?/gi, '')
        .replace(/max-width\s*:\s*[^;]+;?/gi, '')
        .replace(/min-width\s*:\s*[^;]+;?/gi, '')
        .replace(/overflow[^:]*\s*:\s*[^;]+;?/gi, '')
        .replace(/word-break\s*:\s*[^;]+;?/gi, '')
        .replace(/word-wrap\s*:\s*[^;]+;?/gi, '')
        .trim();

      if (cleanedStyle) {
        el.setAttribute('style', cleanedStyle);
      } else {
        el.removeAttribute('style');
      }
    }
  });

  return doc.body.innerHTML;
};

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [mainTitle, setMainTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('conseils');
  const [coverImage, setCoverImage] = useState(null); // URL (existing or preview)
  const [coverImageFile, setCoverImageFile] = useState(null); // File to upload
  const [coverImagePublicId, setCoverImagePublicId] = useState(null);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [originalContentBlocks, setOriginalContentBlocks] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const isEditMode = !!id;

  // Load blog data when editing
  useEffect(() => {
    if (isEditMode && id && accessToken) {
      fetchBlogData();
    }
  }, [id, accessToken]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!showAddMenu) return;

    const handleClickOutside = (e) => {
      const addMenuButton = document.querySelector('[data-add-menu-button]');
      const addMenuDropdown = document.querySelector(
        '[data-add-menu-dropdown]',
      );

      if (
        addMenuButton &&
        !addMenuButton.contains(e.target) &&
        addMenuDropdown &&
        !addMenuDropdown.contains(e.target)
      ) {
        setShowAddMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showAddMenu]);

  const fetchBlogData = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs/admin/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const blog = await res.json();

      if (res.ok) {
        setMainTitle(blog.title || '');
        setExcerpt(blog.excerpt || '');
        setAuthor(blog.author || '');
        setCategory(blog.category || 'conseils');
        setIsPublished(blog.isPublished || false);
        setCoverImage(blog.coverImage || null);
        setCoverImagePublicId(blog.coverImagePublicId || null);
        const blocks = (blog.contentBlocks || []).map((block) => ({
          ...block,
          id: block._id || `block-${block.order}-${Date.now()}`,
          file: null, // No file for existing blocks (already uploaded)
        }));
        setContentBlocks(blocks);
        setOriginalContentBlocks(JSON.parse(JSON.stringify(blocks))); // Deep copy for comparison
      } else {
        setSaveMessage({
          type: 'error',
          text: 'Erreur lors du chargement du blog',
        });
      }
    } catch {
      setSaveMessage({
        type: 'error',
        text: 'Erreur de connexion au serveur',
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a new content block
  const addBlock = useCallback(
    (type) => {
      const newBlock = {
        id: Date.now(),
        type,
        content: '',
        file: null,
        publicId: null,
        color: type === 'title' ? '#1f2937' : null,
        order: contentBlocks.length,
      };
      setContentBlocks((prev) => [...prev, newBlock]);
      setShowAddMenu(false);
    },
    [contentBlocks.length],
  );

  // Update a content block
  const updateBlock = useCallback(
    (blockId, content, preservePublicId = null) => {
      setContentBlocks((prev) =>
        prev.map((block) => {
          if (block.id !== blockId) return block;

          return {
            ...block,
            content: typeof content === 'object' ? content.url : content,
            file: typeof content === 'object' ? content.file : null,
            publicId:
              typeof content === 'object'
                ? content.publicId !== undefined
                  ? content.publicId
                  : preservePublicId || block.publicId
                : preservePublicId || block.publicId,
          };
        }),
      );
    },
    [],
  );

  // Delete a content block
  const deleteBlock = useCallback((blockId) => {
    setContentBlocks((prev) => prev.filter((block) => block.id !== blockId));
  }, []);

  /**
   * Find image URLs/publicIds that need to be deleted from Cloudinary.
   * This includes images that were replaced or removed in edit mode.
   */
  const getOrphanedImages = () => {
    if (!isEditMode) return [];

    const orphaned = [];

    for (const originalBlock of originalContentBlocks) {
      if (originalBlock.type === 'image' && originalBlock.publicId) {
        const currentBlock = contentBlocks.find(
          (b) => b.id === originalBlock.id,
        );

        if (!currentBlock) {
          // Image block was deleted entirely
          orphaned.push(originalBlock.publicId);
        } else if (currentBlock.file) {
          // Image block still exists but has a new file (image was replaced)
          orphaned.push(originalBlock.publicId);
        } else if (currentBlock.content !== originalBlock.content) {
          // Content URL changed
          orphaned.push(originalBlock.publicId);
        }
      }
    }

    return orphaned;
  };

  // Save blog
  const saveBlog = async () => {
    if (!mainTitle.trim()) {
      setSaveMessage({ type: 'error', text: 'Le titre principal est requis.' });
      return;
    }
    if (!excerpt.trim()) {
      setSaveMessage({ type: 'error', text: "L'extrait est requis." });
      return;
    }
    if (!author.trim()) {
      setSaveMessage({ type: 'error', text: "L'auteur est requis." });
      return;
    }
    if (!coverImage && !coverImageFile) {
      setSaveMessage({ type: 'error', text: "L'image de couverture est requise." });
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      // Validate content blocks
      const invalidBlocks = contentBlocks.filter(
        (block) => !block.content || block.content.toString().trim() === '',
      );

      if (invalidBlocks.length > 0) {
        setSaveMessage({
          type: 'error',
          text: 'Tous les blocs de contenu doivent avoir du contenu.',
        });
        setIsSaving(false);
        return;
      }

      // Step 0: Upload cover image if a new file was selected
      let finalCoverImage = coverImage;
      let finalCoverImagePublicId = coverImagePublicId;

      if (coverImageFile) {
        const coverFormData = new FormData();
        coverFormData.append('image', coverImageFile);
        const coverRes = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
          body: coverFormData,
        });
        const coverData = await coverRes.json();
        if (!coverRes.ok) {
          setSaveMessage({ type: 'error', text: coverData.message || "Erreur lors de l'upload de la couverture." });
          setIsSaving(false);
          return;
        }
        // Delete old cover image from Cloudinary if replacing
        if (isEditMode && coverImagePublicId) {
          try {
            await fetch(`${API_URL}/upload/delete`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
              body: JSON.stringify({ publicId: coverImagePublicId }),
            });
          } catch {}
        }
        finalCoverImage = coverData.url;
        finalCoverImagePublicId = coverData.publicId;
      }

      // Step 1: Upload all image blocks to Cloudinary
      const uploadedImages = [];
      let uploadError = null;

      for (const block of contentBlocks) {
        if (block.type === 'image' && block.file) {
          try {
            const formData = new FormData();
            formData.append('image', block.file);

            const res = await fetch(`${API_URL}/upload`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              body: formData,
            });

            const data = await res.json();

            if (res.ok) {
              uploadedImages.push({
                blockId: block.id,
                url: data.url,
                publicId: data.publicId,
              });
            } else {
              uploadError = data.message || "Erreur lors de l'upload d'image";
              break;
            }
          } catch (err) {
            uploadError = "Erreur de connexion lors de l'upload";
            break;
          }
        }
      }

      if (uploadError) {
        setSaveMessage({
          type: 'error',
          text: uploadError,
        });
        setIsSaving(false);
        return;
      }

      // Step 1.5: Delete orphaned images (only in edit mode)
      const orphanedImages = getOrphanedImages();
      for (const publicId of orphanedImages) {
        try {
          const deleteRes = await fetch(`${API_URL}/upload/delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ publicId }),
          });
          if (!deleteRes.ok) {
            const deleteData = await deleteRes.json();
            console.error(
              'Failed to delete orphaned image:',
              publicId,
              deleteData,
            );
          }
        } catch (err) {
          console.error('Failed to delete orphaned image:', publicId, err);
        }
      }

      // Step 2: Format blocks with uploaded image data
      const formattedBlocks = contentBlocks.map((block, index) => {
        const formattedBlock = {
          type: block.type,
          content:
            block.type === 'paragraph'
              ? sanitizeQuillHtml(block.content.toString().trim())
              : block.content.toString().trim(),
          order: index,
        };

        if (block.type === 'image') {
          const uploadedImage = uploadedImages.find(
            (img) => img.blockId === block.id,
          );
          if (uploadedImage) {
            // Newly uploaded image
            formattedBlock.content = uploadedImage.url;
            formattedBlock.publicId = uploadedImage.publicId;
          } else if (block.publicId) {
            // Existing image that wasn't re-uploaded
            formattedBlock.publicId = block.publicId;
          }
        }

        if (block.type === 'title' && block.color) {
          formattedBlock.color = block.color;
        }

        return formattedBlock;
      });

      const blogData = {
        title: mainTitle,
        excerpt,
        author,
        category,
        coverImage: finalCoverImage,
        coverImagePublicId: finalCoverImagePublicId,
        contentBlocks: formattedBlocks,
        isPublished,
      };

      // Step 3: Create/update the blog
      const url = isEditMode ? `${API_URL}/blogs/${id}` : `${API_URL}/blogs`;
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (res.ok) {
        setSaveMessage({
          type: 'success',
          text: isEditMode
            ? 'Article mis à jour avec succès!'
            : 'Article créé avec succès!',
        });
        setTimeout(() => navigate('/blogs'), 1500);
      } else {
        // Blog creation failed - cleanup uploaded images
        for (const uploadedImage of uploadedImages) {
          try {
            await fetch(`${API_URL}/upload/delete`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ publicId: uploadedImage.publicId }),
            });
          } catch (err) {
            console.error('Cleanup error:', err);
          }
        }

        setSaveMessage({
          type: 'error',
          text: data.message || "Erreur lors de l'enregistrement.",
        });
      }
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text: 'Erreur de connexion au serveur.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Render content block
  const renderBlock = useCallback(
    (block) => {
      switch (block.type) {
        case 'title':
          return (
            <BlogTitle
              key={block.id}
              content={block.content}
              color={block.color || '#1f2937'}
              onChange={(content) => updateBlock(block.id, content)}
              onColorChange={(color) => {
                setContentBlocks((prev) =>
                  prev.map((b) => (b.id === block.id ? { ...b, color } : b)),
                );
              }}
              onDelete={() => deleteBlock(block.id)}
            />
          );
        case 'paragraph':
          return (
            <BlogParagraph
              key={block.id}
              content={block.content}
              onChange={(content) => updateBlock(block.id, content)}
              onDelete={() => deleteBlock(block.id)}
            />
          );
        case 'image':
          return (
            <BlogImage
              key={block.id}
              content={block.content}
              publicId={block.publicId}
              onChange={(data) => updateBlock(block.id, data, block.publicId)}
              onDelete={() => deleteBlock(block.id)}
            />
          );
        default:
          return null;
      }
    },
    [updateBlock, deleteBlock],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#D71C1C]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/blogs')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-black">
              {isEditMode ? "Modifier l'article" : 'Créer un article'}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditMode
                ? 'Modifiez le contenu de votre article'
                : 'Ajoutez du contenu à votre blog'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Publish toggle */}
          <button
            type="button"
            onClick={() => setIsPublished(!isPublished)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isPublished
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            {isPublished ? (
              <>
                <ToggleRight className="w-5 h-5" />
                Publié
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5" />
                Brouillon
              </>
            )}
          </button>

          {/* Save button */}
          <button
            onClick={saveBlog}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-[#D71C1C] text-white rounded-lg font-medium hover:bg-[#B01818] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Enregistrer
          </button>
        </div>
      </div>

      {/* Save message */}
      {saveMessage && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
            saveMessage.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {saveMessage.type === 'success' ? (
            <Check className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          {saveMessage.text}
        </div>
      )}

      {/* Main title */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Titre principal *
        </label>
        <input
          type="text"
          value={mainTitle}
          onChange={(e) => setMainTitle(e.target.value)}
          placeholder="Entrez le titre principal de l'article..."
          className="w-full text-2xl font-bold text-black border-none outline-none bg-transparent placeholder-gray-300"
        />
      </div>

      {/* Excerpt */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Description courte *
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Un court résumé de l'article (affiché dans la liste des blogs)..."
          rows={2}
          className="w-full text-gray-700 border-none outline-none bg-transparent placeholder-gray-300 resize-none"
        />
      </div>

      {/* Cover Image */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
          Image de couverture *
        </label>
        <p className="text-xs text-gray-400 mb-3">
          Dimensions optimales : <span className="font-semibold text-gray-500">800 × 400 px</span> (ratio 2:1) — cette image s'affiche sur la carte de l'article.
        </p>
        <div className="flex items-start gap-4">
          {coverImage && (
            <div className="relative shrink-0">
              <img
                src={coverImage}
                alt="Couverture"
                className="h-24 w-48 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => { setCoverImage(null); setCoverImageFile(null); setCoverImagePublicId(null); }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
          <label className="flex flex-col items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#D71C1C] hover:text-[#D71C1C] transition-all cursor-pointer text-sm">
            <ImageIcon className="w-5 h-5" />
            <span>{coverImage ? 'Remplacer l\'image' : 'Choisir une image'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setCoverImageFile(file);
                  setCoverImage(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Category + Author row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Catégorie *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Auteur *
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nom de l'auteur..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C]"
          />
        </div>
      </div>

      {/* Content blocks */}
      <div className="space-y-4 mb-6">{contentBlocks.map(renderBlock)}</div>

      {/* Add block button */}
      <div className="relative mb-8">
        <button
          data-add-menu-button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#D71C1C] hover:text-[#D71C1C] transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter un élément</span>
        </button>

        {showAddMenu && (
          <div
            data-add-menu-dropdown
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
          >
            <button
              onClick={() => addBlock('title')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Type className="w-5 h-5 text-[#D71C1C]" />
              <div className="text-left">
                <span className="block font-medium text-gray-700">
                  Titre de section
                </span>
                <span className="text-xs text-gray-400">
                  Titre pour structurer votre article
                </span>
              </div>
            </button>
            <button
              onClick={() => addBlock('paragraph')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <FileText className="w-5 h-5 text-[#D71C1C]" />
              <div className="text-left">
                <span className="block font-medium text-gray-700">
                  Paragraphe
                </span>
                <span className="text-xs text-gray-400">
                  Texte avec mise en forme (gras, italique, listes...)
                </span>
              </div>
            </button>
            <button
              onClick={() => addBlock('image')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <ImageIcon className="w-5 h-5 text-[#D71C1C]" />
              <div className="text-left">
                <span className="block font-medium text-gray-700">Image</span>
                <span className="text-xs text-gray-400">
                  Image depuis votre appareil (via Cloudinary)
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
