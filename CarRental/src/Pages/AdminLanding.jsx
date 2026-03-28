import React, { useState } from 'react';
import Background from '../assets/Images/Background.png';
import LayoutBox from '../Components/LayoutBox.jsx';

export default function AdminLandingPage() {
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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

      if (res.status === 401) throw new Error('Unauthorized');
      if (!res.ok) throw new Error('Failed to save car');

      setSuccessMessage(' Car added successfully!');
      setStep(1);
      setCarDetails({ name: '', price: '', location: '', available: true });
      setImageUrl('');
      setSelectedFile(null);

      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ❌ Not logged in
  if (!token) {
    return (
      <LayoutBox background={Background}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Please Login as Admin
          </h2>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </a>
        </div>
      </LayoutBox>
    );
  }

  return (
    <LayoutBox background={Background}>

      <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Admin - Add New Car
        </h1>

        {/* Success */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 border rounded-lg p-3 mb-4 text-center">
            {successMessage}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex flex-col items-center">

            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="h-40 mb-4 rounded-xl shadow-md object-cover"
              />
            )}

            <label className="w-full flex flex-col items-center border-2 border-dashed p-6 rounded-lg cursor-pointer hover:bg-gray-100">
              <span className="mb-2">
                {loading ? 'Uploading...' : 'Choose Car Image'}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleCarSubmit} className="space-y-4">

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="h-40 mx-auto rounded-xl mb-4"
              />
            )}

            <input
              type="text"
              name="name"
              placeholder="Car Name"
              value={carDetails.name}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />

            <input
              type="text"
              name="price"
              placeholder="Price"
              value={carDetails.price}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={carDetails.location}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="available"
                checked={carDetails.available}
                onChange={handleInputChange}
              />
              Available
            </label>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Add Car'}
            </button>

          </form>
        )}

      </div>

    </LayoutBox>
  );
}