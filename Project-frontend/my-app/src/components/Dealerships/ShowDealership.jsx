import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ENDPOINTS, apiCall } from '../../lib/Api';
import { useNavigate } from 'react-router-dom';
import ShowDealershipMap from '../Map/ShowDealershipMap'
import '../../assets/styles/ReviewStar.scss';

const ShowDealership = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [dealership, setDealership] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const [reviewRating, setReviewRating] = useState('null');
  const [reviewBody, setReviewBody] = useState('');

  useEffect(() => {
    const fetchDealership = async () => {
      try {
        const endpoint = ENDPOINTS.showDealership;
        endpoint.url += `/${params.id}`;
        const response = await apiCall(endpoint);
        if (response.success) {
          setDealership(response.dealership);
        }
      } catch (error) {
        console.error('Error fetching dealership:', error);
      }
    };

    fetchDealership();
  }, [params.id]);

  if (!dealership) {
    return <div>Loading...</div>;
  }

  const deleteDealership = async () => {
    try {
      const endpoint = ENDPOINTS.deleteDealership;
      endpoint.url += `/${params.id}`;

      const response = await apiCall(endpoint);

      if (response.success) {
        navigate('/dealerships'); // Redirect to the dealerships list after successful deletion
      } else {
        console.error('Error deleting dealership:', response.error);
      }
    } catch (error) {
      console.error('Error deleting dealership:', error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const endpoint = ENDPOINTS.createReview;
      endpoint.url += `/${params.id}/reviews`;

      const data = {
        rating: reviewRating,
        body: reviewBody,
      };
      console.log(data)

      const response = await apiCall(endpoint, { data });

      if (response.success) {
      navigate('/dealerships')
      
      } else {
        console.error('Error submitting review:', response);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const endpoint = ENDPOINTS.deleteReview;
      endpoint.url += `/${params.id}/reviews/${reviewId}`;
      const response = await apiCall(endpoint);
      console.log(response)
      console.log(endpoint)

      if (response.success) {
        console.log('Review deleted successfully');
      } else {
        console.error('Error deleting review:', response.error);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const currentUser = userId && dealership.owner._id === userId;

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {dealership.images.map((img, i) => (
                <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                  <img className="d-block w-100" src={img.url} alt={`Slide ${i + 1}`} />
                </div>
              ))}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{dealership.title}</h5>
              <p className="card-text">{dealership.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{dealership.location}</li>
            </ul>
            {currentUser && (
              <div className="card-body">
                <a className="card-link btn btn-warning" href={`/dealerships/${dealership._id}/edit`}>
                  Edit Info
                </a>
                <button className="btn btn-danger" onClick={deleteDealership}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-6">
          <div>
            <ShowDealershipMap dealership={dealership} />
          </div>
          {userId && (
            <div>
              <h2>Leave a Review</h2>
              <form className="mb-3 validated-form" onSubmit={submitReview} noValidate>
                <div className="mb-3">
                    <fieldset className="starability-basic">
                      <legend>Rating:</legend>
                      {Array.from({ length: 5 }, (_, index) => {
                        const ratingValue = index + 1;
                        return (
                          <React.Fragment key={ratingValue}>
                          <input
                            type="radio"
                            id={`rate${ratingValue}`}
                            name="review[rating]"
                            value={ratingValue}
                            checked={reviewRating >= ratingValue}
                            onChange={() => setReviewRating(ratingValue)}
                          />
                          <label htmlFor={`rate${ratingValue}`} title={`${ratingValue} star`}>
                            {ratingValue} stars
                          </label>
                        </React.Fragment>
                        );
                      })}
                    </fieldset>
                </div>
                <textarea
                  id="reviewBody"
                  name="review[body]"
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  className="form-control"
                  required
                ></textarea>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          )}
          {dealership.reviews.map((review) => (
            <div className="card mb-3" key={review._id}>
              <div className="card-body">
                <h5 className="card-title">{review.author.username}</h5>
                <div className="starability-result" data-rating={review.rating}></div>
                <p className="card-text">Review: {review.body}</p>
                {currentUser && review.author._id === userId && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    deleteReview(review._id);
                  }}>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDealership;
