import React from "react";

const Movies = props => {
  return (
    <div className="col s12 m6 l3">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          {props.image == null ? (
            <img
              src={`https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png`}
              alt="card-image"
              style={{ width: "100%", height: 360 }}
            />
          ) : (
            <img
              src={`http://image.tmdb.org/t/p/w185${props.image}`}
              alt="card image"
              style={{ width: "100%", height: 360 }}
            />
          )}
        </div>
        <div className="card-content">
          <p>
            <a href="#">View Details</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movies;
