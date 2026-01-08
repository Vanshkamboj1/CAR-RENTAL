import React, { useState } from 'react';
import Background from '../assets/images/Background.png';

export default function AdminLandingPage() {
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [carDetails, setCarDetails] = useState({
    name: '',
    price: '',
    location: '',
    available: true
  });

  // Step 1: Upload Image to Backend
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:8080/api/admin/upload-image', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');

      const imageUrl = await res.text();
      setImageUrl(imageUrl.trim());
      setStep(2);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle Input Fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Step 3: Submit Car Details to Backend
  const handleCarSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalCarData = {
      ...carDetails,
      imageUrl
    };

    try {
      const res = await fetch('http://localhost:8080/api/admin/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalCarData)
      });

      if (!res.ok) throw new Error('Failed to save car');

      const data = await res.json();
      console.log('Car saved:', data);
      alert('✅ Car added successfully!');
      setStep(1);
      setCarDetails({ name: '', price: '', location: '', available: true });
      setImageUrl('');
      setSelectedFile(null);
    } catch (err) {
      console.error('Save error:', err);
      alert('❌ Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full max-w-lg shadow-2xl p-8 bg-white/90 backdrop-blur-md rounded-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Admin - Add New Car
        </h1>

        {/* STEP 1: IMAGE UPLOAD */}
        {step === 1 && (
          <div className="flex flex-col items-center">
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
                  className="h-40 rounded-xl shadow-md mb-4"
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
                className="border rounded p-2 w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Price (e.g. ₹ 1800/night)</label>
              <input
                type="text"
                name="price"
                value={carDetails.price}
                onChange={handleInputChange}
                required
                className="border rounded p-2 w-full"
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
                className="border rounded p-2 w-full"
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
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
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
