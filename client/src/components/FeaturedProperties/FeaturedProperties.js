import React from "react";
import useFetch from "../../hooks/useFetch";
import "./FeaturedProperties.css";
function FeaturedProperties() {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4&min=10&max=500");
  return (
    <div className="fp">
      {loading ? (
        "Loading please wait..."
      ) : (
        <>
          {data.map((item, index) => {
            return (
              <div className="fpItem" key={index}>
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" className="fpImg" />
                {/* <img src={item.photos[0]} alt="" className="fpImg" /> */}
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                {item.rating && <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FeaturedProperties;
