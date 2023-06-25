import React, { useState, useEffect, useCallback } from 'react';
import { apiCall, ENDPOINTS } from '../../lib/Api';
import ErrorAlert from '../../components/Alerts/ErrorAlerts'
import { useParams, useNavigate } from 'react-router-dom';

const EditDealershipForm = () => {
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  
  const handleInputChange = (event, isFile) => {
    const { name, files } = event.target;
    if (isFile) {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: event.target.value });
    }
  };
  
  const params = useParams();
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'image') {
        for (const file of value) {
          data.append('image', file);
        }
      } else {
        data.append(key, value);
      }
    }
    
    const endpoint = ENDPOINTS.editDealership;
    endpoint.url += `/${params.id}`;
    const response = await apiCall(endpoint, { data });
    
    if (response.success) {
      navigate(endpoint.url);
    } else {
      setErrorMessages(['Something Went Wrong!']);
    }
  };
  
  const fetchDealership = useCallback(async () => {
    const endpoint = ENDPOINTS.getDealerships;
    endpoint.url += `/${params.id}`;
    const response = await apiCall(endpoint);
    
    if (response.success) {
      const dealership = response.dealership;
      const imagesWithThumbnail = dealership.images.map((image) => ({
        ...image,
        thumbnail: image.url.replace('/upload', '/upload/w_200'),
      }));
      setFormData({
        title: dealership.title,
        location: dealership.location,
        description: dealership.description,
        images: imagesWithThumbnail,
      });
    } else {
      setErrorMessages(['Failed to fetch dealership']);
    }
  }, [params.id]);

  
  useEffect(() => {
    fetchDealership();
  }, [fetchDealership]);

  const handleImageDelete = (filename) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      deleteImages: [...(prevFormData.deleteImages || []), filename],
    }));
  };


  return (
    <>
     <ErrorAlert messages={errorMessages} />
    <div className="row">
      <h1 className="text-center">Edit Dealership Info</h1>
      <div className="col-md-6 offset-md-3">
        <form
          onSubmit={handleSubmit}
          className="validated-form"
          encType="multipart/form-data"
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              required
              value={formData.title || ''}
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">Please enter the name.</div>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              className="form-control"
              type="text"
              id="location"
              name="location"
              required
              value={formData.location || ''}
              onChange={handleInputChange}
            />
            <div className="invalid-feedback">Please enter the location.</div>
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              className="form-control"
              type="file"
              id="image"
              name="image"
              onChange={(event) => handleInputChange(event, true)}
              multiple
            />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              type="text"
              id="description"
              name="description"
              required
              value={formData.description || ''}
              onChange={handleInputChange}
            ></textarea>
            <div className="invalid-feedback">Please enter a description.</div>
          </div>
          
          {formData.images && formData.images.length > 0 && (
  <div className="mb-3">
    <label className="form-label">Current Images:</label>
    {formData.images.map((image, index) => (
      <div key={index}>
        <img src={image.thumbnail} className="img-thumbnail" alt="" />
        <div className="form-check-inline">
          <input
            type="checkbox"
            id={`image-${index}`}
            name="deleteImages[]"
            value={image.filename}
            onChange={() => handleImageDelete(image.filename)}
          />
          <label htmlFor={`image-${index}`}>Delete</label>
        </div>
      </div>
    ))}
  </div>
)}

              
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditDealershipForm;
