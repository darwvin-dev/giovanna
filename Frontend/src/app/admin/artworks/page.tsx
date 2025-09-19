"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: number;
  technique: string;
  dimensions: string;
  category: string;
}

const ArtworkManager: React.FC = () => {
  // State for artworks and form
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    technique: '',
    dimensions: '',
    category: 'painting'
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Load mock data on component mount
  useEffect(() => {
    const mockArtworks: Artwork[] = [
      {
        id: '1',
        title: 'Memoria I',
        description: 'A reflection on time and memory',
        imageUrl: '/alice5.jpg',
        year: 2023,
        technique: 'Oil on canvas',
        dimensions: '100x120 cm',
        category: 'painting'
      },
      {
        id: '2',
        title: 'Temporal Layers',
        description: 'Exploring the concept of time',
        imageUrl: '/alice5.jpg',
        year: 2022,
        technique: 'Mixed media',
        dimensions: '80x80 cm',
        category: 'mixed-media'
      }
    ];
    setArtworks(mockArtworks);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) || 0 : value
    }));
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingArtwork) {
      // Update existing artwork
      const updatedArtworks = artworks.map(artwork => 
        artwork.id === editingArtwork.id 
          ? { 
              ...editingArtwork, 
              ...formData,
              imageUrl: previewUrl || editingArtwork.imageUrl
            } 
          : artwork
      );
      setArtworks(updatedArtworks);
    } else {
      // Create new artwork
      const newArtwork: Artwork = {
        id: Date.now().toString(),
        ...formData,
        imageUrl: previewUrl || '/placeholder-image.jpg'
      };
      setArtworks(prev => [...prev, newArtwork]);
    }
    
    // Reset form
    resetForm();
  };

  // Edit artwork
  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setIsEditing(true);
    setFormData({
      title: artwork.title,
      description: artwork.description,
      year: artwork.year,
      technique: artwork.technique,
      dimensions: artwork.dimensions,
      category: artwork.category
    });
    setPreviewUrl(artwork.imageUrl);
  };

  // Delete artwork
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      setArtworks(prev => prev.filter(artwork => artwork.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      year: new Date().getFullYear(),
      technique: '',
      dimensions: '',
      category: 'painting'
    });
    setImageFile(null);
    setPreviewUrl(null);
    setEditingArtwork(null);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-serif font-bold mb-8">Artwork Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Artwork Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Artwork' : 'Add New Artwork'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Technique</label>
                <input
                  type="text"
                  name="technique"
                  value={formData.technique}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Dimensions</label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="ex: 100x120 cm"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="painting">Painting</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="photography">Photography</option>
                  <option value="mixed-media">Mixed Media</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {previewUrl && (
                <div className="mt-4">
                  <div className="relative h-48 w-full rounded-md overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Update Artwork' : 'Add Artwork'}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Artwork List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Artworks ({artworks.length})</h2>
          
          {artworks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">No artworks yet. Add your first artwork!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {artworks.map(artwork => (
                <div key={artwork.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="p-4 flex-1">
                      <h3 className="font-semibold">{artwork.title}</h3>
                      <p className="text-sm text-gray-600">{artwork.technique}, {artwork.year}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{artwork.description}</p>
                    </div>
                    
                    <div className="p-4 flex flex-col space-y-2">
                      <button
                        onClick={() => handleEdit(artwork)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(artwork.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkManager;