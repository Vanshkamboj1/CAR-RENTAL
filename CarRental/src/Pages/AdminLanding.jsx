import React, { useState } from 'react';
import Background from '../assets/Images/Background.png';

export default function AdminLandingPage() {
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // ✅ added
  const [carDetails, setCarDetails] = useState({
    name: '',
    price: '',
    location: '',
    available: true
  });

  const token = localStorage.getItem('authToken');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401) throw new Error('Unauthorized - Please login as admin');
      if (!res.ok) throw new Error('Image upload failed');

      const imageUrl = await res.text();
      setImageUrl(imageUrl.trim());
      setStep(2);
    } catch (err) {
      console.error('Upload error:', err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ✅ Updated: use success message instead of alert
  const handleCarSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      const finalCarData = { ...carDetails, imageUrl };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalCarData),
      });

      if (res.status === 401) throw new Error('Unauthorized - Please login as admin');
      if (!res.ok) throw new Error('Failed to save car');

      const data = await res.json();
      console.log('Car saved:', data);

      setSuccessMessage(' Car added successfully!');
      setStep(1);
      setCarDetails({ name: '', price: '', location: '', available: true });
      setImageUrl('');
      setSelectedFile(null);

      // Optional: Hide message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Save error:', err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">
            You must be logged in as an admin to access this page.
          </p>
          <a
            href="/admin-login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Go to Admin Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full max-w-lg shadow-2xl p-8 bg-white/90 backdrop-blur-md rounded-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Admin - Add New Car
        </h1>

        {/* ✅ Success message display */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded-lg p-3 mb-4 text-center font-medium">
            {successMessage}
          </div>
        )}

        {/* STEP 1: IMAGE UPLOAD */}
        {step === 1 && (
          <div className="flex flex-col items-center">
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="h-40 mb-4 rounded-xl shadow-md object-cover"
              />
            )}

            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition">
              <span className="text-gray-700 font-medium mb-2">
                {loading ? 'Uploading...' : 'Choose Car Image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {selectedFile && !loading && (
              <p className="mt-3 text-gray-600 text-sm">
                Selected: <span className="font-medium">{selectedFile.name}</span>
              </p>
            )}

            {loading && <p className="text-blue-500 mt-3">Uploading...</p>}
          </div>
        )}

        {/* STEP 2: ADD CAR DETAILS */}
        {step === 2 && (
          <form onSubmit={handleCarSubmit} className="space-y-4">
            {imageUrl && (
              <div className="flex justify-center">
                <img
                  src={imageUrl}
                  alt="Car Preview"
                  className="h-40 rounded-xl shadow-md mb-4 object-cover"
                />
              </div>
            )}

            <div>
              <label className="block font-medium">Car Name</label>
              <input
                type="text"
                name="name"
                value={carDetails.name}
                onChange={handleInputChange}
                required
                className="border rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block font-medium">Price (e.g. ₹ 1800/day)</label>
              <input
                type="text"
                name="price"
                value={carDetails.price}
                onChange={handleInputChange}
                required
                className="border rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={carDetails.location}
                onChange={handleInputChange}
                required
                className="border rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="available"
                checked={carDetails.available}
                onChange={handleInputChange}
              />
              <label className="font-medium">Available</label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Add Car'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
