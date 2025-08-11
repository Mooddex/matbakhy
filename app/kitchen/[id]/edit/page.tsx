'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Kitchen {
  _id: string;
  name: string;
  description: string;
  maker: string;
  location: string;
  phoneNumber: string;
  price: number;
  imageUrl?: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  maker?: string;
  location?: string;
  phoneNumber?: string;
  price?: string;
  general?: string;
}

const EditKitchenPage = () => {
  const { id } = useParams();
  const router = useRouter();
  
  const [kitchen, setKitchen] = useState<Kitchen | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  // Fetch kitchen data
  useEffect(() => {
    const fetchKitchen = async () => {
      if (!id) return;
      
      try {
        const res = await fetch(`/api/kitchens/${id}`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch kitchen');
        }
        
        if (data.success) {
          setKitchen(data.data);
        } else {
          setErrors({ general: data.message || 'Kitchen not found' });
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setErrors({ general: err instanceof Error ? err.message : 'Failed to load kitchen' });
      } finally {
        setLoading(false);
      }
    };

    fetchKitchen();
  }, [id]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!kitchen?.name?.trim()) {
      newErrors.name = 'Kitchen name is required';
    } else if (kitchen.name.length > 100) {
      newErrors.name = 'Kitchen name must be less than 100 characters';
    }

    if (!kitchen?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (kitchen.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (!kitchen?.maker?.trim()) {
      newErrors.maker = 'Maker name is required';
    }

    if (!kitchen?.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!kitchen?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(kitchen.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!kitchen?.price || kitchen.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!kitchen || !validateForm()) {
      return;
    }

    setSaving(true);
    setSuccess(false);
    setErrors({});

    try {
      const res = await fetch(`/api/kitchens/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: kitchen.name.trim(),
          description: kitchen.description.trim(),
          maker: kitchen.maker.trim(),
          location: kitchen.location.trim(),
          phoneNumber: kitchen.phoneNumber.trim(),
          price: Number(kitchen.price),
          imageUrl: kitchen.imageUrl?.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update kitchen');
      }

      if (data.success) {
        setSuccess(true);
        // Redirect after short delay to show success message
        setTimeout(() => {
          router.push(`/kitchen/${id}`);
        }, 1500);
      } else {
        setErrors({ general: data.message || 'Failed to update kitchen' });
      }
    } catch (err) {
      console.error('Update error:', err);
      setErrors({ general: err instanceof Error ? err.message : 'Failed to update kitchen' });
    } finally {
      setSaving(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof Kitchen, value: string | number) => {
    if (!kitchen) return;
    
    setKitchen({ ...kitchen, [field]: value });
    
    // Clear field-specific error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-violet-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading kitchen details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!kitchen && errors.general) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Kitchen</h1>
              <p className="text-gray-600 mb-6">{errors.general}</p>
              <Link 
                href="/explore" 
                className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition"
              >
                <ArrowLeft size={20} />
                Back to Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href={`/kitchen/${id}`} 
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 transition"
            >
              <ArrowLeft size={20} />
              Back to Kitchen
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Edit Kitchen</h1>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="container mx-auto px-4">
            <p className="text-green-700">Kitchen updated successfully! Redirecting...</p>
          </div>
        </div>
      )}

      {/* General Error Message */}
      {errors.general && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="container mx-auto px-4">
            <p className="text-red-700">{errors.general}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Kitchen Image Preview */}
              {kitchen?.imageUrl && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Image
                  </label>
                  <div className="relative h-48 w-full rounded-lg overflow-hidden">
                    <Image
                      src={kitchen.imageUrl}
                      alt={kitchen.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Kitchen Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Kitchen Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={kitchen?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter kitchen name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={kitchen?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your kitchen"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Two column layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Maker */}
                <div>
                  <label htmlFor="maker" className="block text-sm font-medium text-gray-700 mb-2">
                    Made By *
                  </label>
                  <input
                    type="text"
                    id="maker"
                    value={kitchen?.maker || ''}
                    onChange={(e) => handleInputChange('maker', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                      errors.maker ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter maker name"
                  />
                  {errors.maker && <p className="mt-1 text-sm text-red-600">{errors.maker}</p>}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={kitchen?.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter location"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={kitchen?.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price (EGP) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    min="1"
                    step="1"
                    value={kitchen?.price || ''}
                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter price"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={kitchen?.imageUrl || ''}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-violet-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKitchenPage;