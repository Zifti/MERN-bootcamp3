import React, { useState } from 'react';
import { apiCall, ENDPOINTS } from '../../lib/Api';
import ErrorAlert from '../../components/Alerts/ErrorAlerts'

const DealershipForm = () => {
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



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'image') {
        for (const file of value) {
          data.append('image', file); // Append each selected file
        }
      } else {
        data.append(key, value);
      }
    }

    const response = await apiCall(ENDPOINTS.createDealership, { data });
    if (response.success) {
      console.log(response);
    } else {
      setErrorMessages(['Something Went Wrong!']);
    }
  };

  return (
    <>
     <ErrorAlert messages={errorMessages} />
    <div className="row">
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
              onChange={handleInputChange}
            ></textarea>
            <div className="invalid-feedback">Please enter a description.</div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default DealershipForm;




