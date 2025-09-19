"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: number;
  dimensions: string;
  technique: string;
  collection: string;
  category: string;
}

const ArtworkManager: React.FC = () => {
  // ... (bunch of state as before)
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Collection-specific
  const [collectionImage, setCollectionImage] = useState<string | null>(null);
  const [collectionFile, setCollectionFile] = useState<File | null>(null);
  const [collectionPreview, setCollectionPreview] = useState<string | null>(
    null
  );
  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  // Form state for artworks (unchanged)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    dimensions: "",
    technique: "",
    collection: "Collezione Fetzen",
    category: "painting",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const mockArtworks: Artwork[] = [
      {
        id: "1",
        title: "Mandala",
        description: "A reflection on time and memory",
        imageUrl: "/fetzen_2-681x1024.jpg",
        year: 2018,
        dimensions: "32cm x 78 cm",
        technique: "Mixed media",
        collection: "Collezione Fetzen",
        category: "mixed-media",
      },
      {
        id: "2",
        title: "Corteccia",
        description: "Exploring the concept of time",
        imageUrl: "/fetzen_1-696x1024.jpg",
        year: 2018,
        dimensions: "35cm x 62cm",
        technique: "Mixed media",
        collection: "Collezione Fetzen",
        category: "mixed-media",
      },
    ];
    setArtworks(mockArtworks);
    setCollectionImage("/fetzen_home.jpg");
  }, []);

  // cleanup object URLs when unmounting or when preview changes
  useEffect(() => {
    return () => {
      if (collectionPreview) URL.revokeObjectURL(collectionPreview);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Collection handlers ----------
  const handleCollectionImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;
    setCollectionFile(file);

    if (file) {
      // create object URL for fast preview
      const url = URL.createObjectURL(file);
      setCollectionPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      // reset upload state
      setUploadState("idle");
      setUploadMessage(null);
    } else {
      setCollectionPreview(null);
      setCollectionFile(null);
    }
  };

  const handleUploadCollectionImage = async () => {
    if (!collectionFile) return;
    setUploadState("uploading");
    setUploadMessage(null);

    try {
      const formData = new FormData();
      // attention: backend expects field name "image"
      formData.append("image", collectionFile);

      // POST to provided route. using fetch; adjust credentials/mode if needed.
      const res = await fetch("/portolio/hero", {
        method: "POST",
        body: formData,
        // don't set Content-Type (browser will add multipart/form-data boundary)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Upload failed: ${res.status}`);
      }

      // assume backend returns JSON like { imageUrl: "https://..." }
      const data = await res.json().catch(() => null);

      // Update UI depending on response
      if (data && data.imageUrl) {
        setCollectionImage(data.imageUrl);
        setUploadState("success");
        setUploadMessage("Upload completato con successo.");
        // cleanup preview/objectURL
        if (collectionPreview) {
          URL.revokeObjectURL(collectionPreview);
          setCollectionPreview(null);
        }
        setCollectionFile(null);
      } else {
        // fallback: if backend doesn't return URL, try to set to preview
        setCollectionImage(collectionPreview ?? collectionImage);
        setUploadState("success");
        setUploadMessage(
          "Upload completato (nessun URL restituito dal server)."
        );
        setCollectionFile(null);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadState("error");
      setUploadMessage(err?.message ?? "Errore durante l'upload.");
    } finally {
      // keep message visible a bit; you can also auto-hide after few seconds
      setTimeout(() => {
        setUploadState((s) => (s === "uploading" ? "idle" : s));
      }, 2000);
    }
  };

  // ---------- Artwork handlers (kept mostly same as your original) ----------
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) || 0 : value,
    }));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingArtwork) {
      const updatedArtworks = artworks.map((artwork) =>
        artwork.id === editingArtwork.id
          ? {
              ...editingArtwork,
              ...formData,
              imageUrl: previewUrl || editingArtwork.imageUrl,
            }
          : artwork
      );
      setArtworks(updatedArtworks);
    } else {
      const newArtwork: Artwork = {
        id: Date.now().toString(),
        ...formData,
        imageUrl: previewUrl || "/placeholder-image.jpg",
      };
      setArtworks((prev) => [...prev, newArtwork]);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      description: artwork.description,
      year: artwork.year,
      dimensions: artwork.dimensions,
      technique: artwork.technique,
      collection: artwork.collection,
      category: artwork.category,
    });
    setPreviewUrl(artwork.imageUrl);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this artwork?")) {
      setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      year: new Date().getFullYear(),
      dimensions: "",
      technique: "",
      collection: "Collezione Fetzen",
      category: "painting",
    });
    setImageFile(null);
    setPreviewUrl(null);
    setEditingArtwork(null);
  };

  const openNewArtworkModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b p-6">
      <div className="mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-8">
          Artwork Management
        </h1>

        {/* Collection Header Image Upload - improved UX */}
        <div className="mb-12 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">
            Collection Header Image
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div
                className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-900 border border-white/10 flex items-center justify-center"
                aria-live="polite"
              >
                {/* if server image available -> use Image; else if preview -> use img */}
                {collectionPreview ? (
                  // preview from file (object URL)
                  // use regular img for objectURL preview
                  // add alt text for accessibility
                  <img
                    src={collectionPreview}
                    alt="Collection preview"
                    className="object-cover h-full w-full"
                  />
                ) : collectionImage ? (
                  // existing collection image (likely local or remote)
                  // using next/image here as before
                  <Image
                    src={collectionImage}
                    alt="Collection Header"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-gray-400">No image uploaded</span>
                  </div>
                )}
              </div>

              {/* upload status */}
              <div className="mt-3">
                {uploadState === "uploading" && (
                  <div className="text-sm text-amber-300 flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                      ></path>
                    </svg>
                    Uploading...
                  </div>
                )}
                {uploadState === "success" && (
                  <div className="text-sm text-emerald-400">
                    {uploadMessage}
                  </div>
                )}
                {uploadState === "error" && (
                  <div className="text-sm text-red-400">{uploadMessage}</div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Upload New Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCollectionImageChange}
                className="w-full px-4 py-2 border border-white/20 rounded-md bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Upload collection header image"
              />
              <p className="text-xs text-gray-400 mt-2">
                Recommended size: 1920x1080px or similar aspect ratio
              </p>

              {/* Submit button for sending to backend */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleUploadCollectionImage}
                  disabled={!collectionFile || uploadState === "uploading"}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    !collectionFile || uploadState === "uploading"
                      ? "bg-amber-700/30 text-amber-200 cursor-not-allowed"
                      : "bg-amber-600 hover:bg-amber-700 text-white"
                  }`}
                  aria-disabled={!collectionFile || uploadState === "uploading"}
                >
                  {uploadState === "uploading"
                    ? "Uploading..."
                    : "Upload header image"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // cancel preview / selection
                    if (collectionPreview) {
                      URL.revokeObjectURL(collectionPreview);
                      setCollectionPreview(null);
                    }
                    setCollectionFile(null);
                    setUploadState("idle");
                    setUploadMessage(null);
                  }}
                  className="px-3 py-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 text-sm"
                >
                  Cancel
                </button>

                {/* small helper */}
                <span className="text-xs text-gray-400">
                  Seleziona un{"'"}immagine e clicca upload
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* rest of your artworks management (unchanged, only trimmed here for brevity) */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Artworks</h2>
            <button
              onClick={openNewArtworkModal}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Artwork
            </button>
          </div>

          {artworks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No artworks yet. Add your first artwork!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="bg-black/30 rounded-xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {artwork.dimensions} | {artwork.year}
                    </p>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {artwork.description}
                    </p>

                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEdit(artwork)}
                        className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-md text-sm hover:bg-blue-600/50 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(artwork.id)}
                        className="px-3 py-1 bg-red-600/30 text-red-300 rounded-md text-sm hover:bg-red-600/50 transition-colors"
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

      {/* modal (unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl border border-amber-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif">
                  {editingArtwork ? "Edit Artwork" : "Add New Artwork"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close form"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* form inputs same as before */}
                {/* ... (kept identical to your original form) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-white/20 rounded-md bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Year *
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-white/20 rounded-md bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-white/20 rounded-md bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* ... rest of modal form (kept same) ... */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  >
                    {editingArtwork ? "Update Artwork" : "Add Artwork"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkManager;
