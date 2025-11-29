import { useContext, useState } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { loggedInUser } = useContext(UserContext);
  const [imageError, setImageError] = useState(false);

  // Debug: Log the resData to see its structure (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log("RestaurantCard resData:", resData);
  }

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
  } = resData || {};
  
  const deliveryTime = sla?.deliveryTime;
  
  // Multiple fallback image options
  const getImageUrl = () => {
    if (imageError || !cloudinaryImageId) {
      return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=250&h=200&fit=crop&crop=center";
    }
    return CDN_URL + cloudinaryImageId;
  };
  
  const handleImageError = () => {
    console.log("Image failed to load for:", name, "- using fallback");
    setImageError(true);
  };

  return (
    <div
      data-testid="resCard"
      className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200"
    >
      <img
        className="rounded-lg w-full h-40 object-cover"
        alt={`${name || 'Restaurant'} image`}
        src={getImageUrl()}
        onError={handleImageError}
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log("Image loaded successfully for:", name);
          }
        }}
        style={{ backgroundColor: '#f0f0f0' }}
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines?.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime} minutes</h4>
      <h4>User : {loggedInUser} </h4>
    </div>
  );
};

// Higher Order Component

// input - RestaurantCard =>> RestaurantCardPromoted

export const withPromtedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
