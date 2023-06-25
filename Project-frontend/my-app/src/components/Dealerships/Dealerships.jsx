import React, { useEffect, useState } from 'react';
import { ENDPOINTS, apiCall } from '../../lib/Api'
import ErrorAlert from '../Alerts/ErrorAlerts'
import DealershipsMap from '../Map/DealershipMap'

const Dealerships = () => {
  const [dealerships, setDealerships] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchDealerships = async () => {
    
        const response = await apiCall(ENDPOINTS.getDealerships);
        console.log(response)
        if(response.success){
            setDealerships(response.dealerships);
        } else {
        setErrorMessages(['Something Went Wrong!'])
      }
    };

    fetchDealerships();
  }, []);

  return (
    <div>
       <ErrorAlert messages={errorMessages} />
        <DealershipsMap dealerships={dealerships} />
      <h1>All Dealerships</h1>
      {dealerships.map((dealership) => (
        <div className="card" key={dealership._id} style={{ marginBottom: '1rem' }}>
          <div className="row">
            <div className="col-md-4">
              {dealership.images.length ? (
                <img className="img-fluid" alt="" src={dealership.images[0].url} />
              ) : (
                <img className="img-fluid" alt="" src="" />
              )}
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{dealership.title}</h5>
                <p className="card-text">{dealership.description}</p>
                <a href={`/dealerships/${dealership._id}`} className="btn btn-primary">
                  View {dealership.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dealerships;
