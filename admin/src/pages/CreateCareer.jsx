import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Loader2,
  Check,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Plus,
  X,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TYPE_OPTIONS = [
  { value: 'temps-plein', label: 'Temps plein' },
  { value: 'temps-partiel', label: 'Temps partiel' },
  { value: 'contrat', label: 'Contrat' },
  { value: 'stage', label: 'Stage' },
];

const CreateCareer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { accessToken } = useAuth();
  const isEditMode = !!id;

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [location, setLocation] = useState('Montréal, QC');
  const [type, setType] = useState('temps-plein');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [requirements, setRequirements] = useState(['']);
  const [benefits, setBenefits] = useState(['']);
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [salaryVisible, setSalaryVisible] = useState(false);
  const [closingDate, setClosingDate] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // UI state
  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(!!id);
  const [saveMessage, setSaveMessage] = useState(null);

  // Fetch categories
  useEffect(() => {
    if (accessToken) {
      fetchCategories();
    }
  }, [accessToken]);

  // Fetch career data in edit mode
  useEffect(() => {
    if (isEditMode && id && accessToken) {
      fetchCareerData();
    }
  }, [id, accessToken]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/careers/admin/categories`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      }
    } catch {
      console.error('Failed to fetch categories');
    }
  };

  const fetchCareerData = async () => {
    try {
      const res = await fetch(`${API_URL}/careers/admin/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();

      if (res.ok) {
        setTitle(data.title || '');
        setCategory(data.category || '');
        setLocation(data.location || 'Montréal, QC');
        setType(data.type || 'temps-plein');
        setDescription(data.description || '');
        setResponsibilities(
          data.responsibilities?.length > 0 ? data.responsibilities : [''],
        );
        setRequirements(
          data.requirements?.length > 0 ? data.requirements : [''],
        );
        setBenefits(data.benefits?.length > 0 ? data.benefits : ['']);
        setSalaryMin(data.salary?.min ?? '');
        setSalaryMax(data.salary?.max ?? '');
        setSalaryVisible(data.salary?.isVisible ?? false);
        setClosingDate(
          data.closingDate
            ? new Date(data.closingDate).toISOString().split('T')[0]
            : '',
        );
        setIsPublished(data.isPublished || false);
      } else {
        setSaveMessage({
          type: 'error',
          text: 'Erreur lors du chargement du poste',
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

  // --- List field helpers ---
  const updateListItem = (setter, index, value) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addListItem = (setter) => {
    setter((prev) => [...prev, '']);
  };

  const removeListItem = (setter, index) => {
    setter((prev) =>
      prev.length <= 1 ? [''] : prev.filter((_, i) => i !== index),
    );
  };

  // --- Category helpers ---
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === '__new__') {
      setShowCustomCategory(true);
      setCategory('');
    } else {
      setShowCustomCategory(false);
      setCustomCategory('');
      setCategory(value);
    }
  };

  const confirmCustomCategory = () => {
    if (customCategory.trim()) {
      setCategory(customCategory.trim());
      setShowCustomCategory(false);
    }
  };

  // --- Save ---
  const saveCareer = async () => {
    if (!title.trim()) {
      setSaveMessage({ type: 'error', text: 'Le titre est requis.' });
      return;
    }
    if (!category.trim()) {
      setSaveMessage({ type: 'error', text: 'La catégorie est requise.' });
      return;
    }
    if (!description.trim()) {
      setSaveMessage({ type: 'error', text: 'La description est requise.' });
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const careerData = {
        title: title.trim(),
        category: category.trim(),
        location: location.trim(),
        type,
        description: description.trim(),
        responsibilities: responsibilities.filter((r) => r.trim()),
        requirements: requirements.filter((r) => r.trim()),
        benefits: benefits.filter((b) => b.trim()),
        salary: {
          min: salaryMin ? Number(salaryMin) : null,
          max: salaryMax ? Number(salaryMax) : null,
          isVisible: salaryVisible,
        },
        closingDate: closingDate || null,
        isPublished,
      };

      const url = isEditMode
        ? `${API_URL}/careers/${id}`
        : `${API_URL}/careers`;
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(careerData),
      });

      const data = await res.json();

      if (res.ok) {
        setSaveMessage({
          type: 'success',
          text: isEditMode
            ? 'Poste mis à jour avec succès!'
            : 'Poste créé avec succès!',
        });
        // Refresh categories in case a new one was auto-created
        fetchCategories();
        setTimeout(() => navigate('/careers'), 1500);
      } else {
        setSaveMessage({
          type: 'error',
          text: data.message || "Erreur lors de l'enregistrement.",
        });
      }
    } catch {
      setSaveMessage({
        type: 'error',
        text: 'Erreur de connexion au serveur.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // --- Render list field ---
  const renderListField = (label, items, setter, placeholder) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        {label}
      </label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-5 text-right">
              {index + 1}.
            </span>
            <input
              type="text"
              value={item}
              onChange={(e) => updateListItem(setter, index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] text-sm"
            />
            <button
              type="button"
              onClick={() => removeListItem(setter, index)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Supprimer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => addListItem(setter)}
        className="mt-3 flex items-center gap-1.5 text-sm text-[#D71C1C] hover:text-[#B01818] font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        Ajouter
      </button>
    </div>
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
            onClick={() => navigate('/careers')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-black">
              {isEditMode ? 'Modifier le poste' : 'Créer un poste'}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditMode
                ? 'Modifiez les détails du poste'
                : "Ajoutez une nouvelle offre d'emploi"}
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
            onClick={saveCareer}
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

      {/* Title */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Titre du poste *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Développeur Full-Stack Senior"
          className="w-full text-2xl font-bold text-black border-none outline-none bg-transparent placeholder-gray-300"
        />
      </div>

      {/* Category + Type row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Catégorie *
          </label>
          {showCustomCategory ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && confirmCustomCategory()}
                placeholder="Nouvelle catégorie..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C]"
                autoFocus
              />
              <button
                type="button"
                onClick={confirmCustomCategory}
                className="p-2 bg-[#D71C1C] text-white rounded-lg hover:bg-[#B01818] transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomCategory(false);
                  setCustomCategory('');
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <select
              value={
                category &&
                categories.some(
                  (c) => c.name.toLowerCase() === category.toLowerCase(),
                )
                  ? category
                  : category
                    ? '__current__'
                    : ''
              }
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] bg-white"
            >
              <option value="" disabled>
                Sélectionnez une catégorie
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              {category &&
                !categories.some(
                  (c) => c.name.toLowerCase() === category.toLowerCase(),
                ) && <option value="__current__">{category}</option>}
              <option value="__new__">+ Nouvelle catégorie...</option>
            </select>
          )}
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Type d'emploi *
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] bg-white"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location + Closing Date row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Lieu *
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Montréal, QC"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C]"
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Date de clôture
          </label>
          <input
            type="date"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C]"
          />
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez le poste en détail..."
          rows={5}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C] resize-none text-sm"
        />
      </div>

      {/* Responsibilities */}
      {renderListField(
        'Responsabilités',
        responsibilities,
        setResponsibilities,
        'Ex: Développer et maintenir des applications web...',
      )}

      {/* Requirements */}
      {renderListField(
        'Exigences',
        requirements,
        setRequirements,
        "Ex: 3+ ans d'expérience en développement...",
      )}

      {/* Benefits */}
      {renderListField(
        'Avantages',
        benefits,
        setBenefits,
        'Ex: Assurance santé complète...',
      )}

      {/* Salary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Salaire
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Minimum ($)
            </label>
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              placeholder="Ex: 60000"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Maximum ($)
            </label>
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              placeholder="Ex: 90000"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D71C1C]"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={salaryVisible}
            onChange={(e) => setSalaryVisible(e.target.checked)}
            className="w-4 h-4 text-[#D71C1C] border-gray-300 rounded focus:ring-[#D71C1C]"
          />
          <span className="text-sm text-gray-600">
            Afficher le salaire publiquement
          </span>
        </label>
      </div>
    </div>
  );
};

export default CreateCareer;
