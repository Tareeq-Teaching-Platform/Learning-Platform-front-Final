import React, { useState, useEffect } from 'react';
import { User2, X, Loader2, Upload } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Initialize form with user data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || ''
      });
      setPreviewUrl(user.profile_picture || '');
      setSelectedFile(null);
      setError('');
      setSuccess(false);
    }
  }, [isOpen, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only image files (JPEG, PNG, GIF, WebP) are allowed');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validation
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      let updatedUser = { ...user };

      // Update name if changed
      if (formData.name !== user.name) {
        const nameResponse = await axios.put(
          `${API_BASE_URL}/auth/profile`,
          { name: formData.name },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (nameResponse.data.success) {
          updatedUser = nameResponse.data.user;
        }
      }

      // Update profile picture if file selected
      if (selectedFile) {
        const formDataFile = new FormData();
        formDataFile.append('profile_picture', selectedFile);

        const pictureResponse = await axios.post(
          `${API_BASE_URL}/auth/profile/picture`,
          formDataFile,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (pictureResponse.data.success) {
          updatedUser = pictureResponse.data.user;
        }
      }

      // Check if any changes were made
      if (formData.name === user.name && !selectedFile) {
        setError('No changes detected');
        setLoading(false);
        return;
      }

      setSuccess(true);
      
      // Call the onUpdate callback with updated user data
      if (onUpdate) {
        onUpdate(updatedUser);
      }

      // Close modal after short delay to show success message
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      console.error('Profile update error:', err);
      setError(
        err.response?.data?.message || 
        'Unable to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      setSuccess(false);
      setSelectedFile(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop and container */}
      <input 
        type="checkbox" 
        checked={isOpen} 
        onChange={() => {}} 
        className="modal-toggle" 
      />
      <div className="modal modal-open">
        <div className="modal-box relative max-w-md">
          {/* Close button */}
          <button
            onClick={handleClose}
            disabled={loading}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal header */}
          <h3 className="font-bold text-2xl mb-6">Edit Profile</h3>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Preview */}
            <div className="flex flex-col items-center mb-4">
              <div className="avatar mb-3">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" />
                  ) : (
                    <div className="w-full h-full bg-primary flex items-center justify-center">
                      <User2 className="w-12 h-12 text-primary-content" />
                    </div>
                  )}
                </div>
              </div>

              {/* File Upload Button */}
              <label className="btn btn-sm btn-outline btn-primary cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
              
              {selectedFile && (
                <p className="text-xs text-success mt-2">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input input-bordered w-full"
                disabled={loading}
                required
                minLength={2}
              />
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error">
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="alert alert-success">
                <span className="text-sm">Profile updated successfully!</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="modal-action">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;