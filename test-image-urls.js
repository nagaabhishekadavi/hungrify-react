// Test script to check image URLs
const mockData = require('./src/components/mocks/mockResListData.json');

const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// Find the restaurant data
const restaurantCard = mockData?.data?.cards?.find(
  (card) => card?.card?.card?.id === "restaurant_grid_listing"
);

const restaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

if (restaurants && restaurants.length > 0) {
  console.log("Found", restaurants.length, "restaurants");
  
  // Check first few restaurants and their image URLs
  restaurants.slice(0, 5).forEach((restaurant, index) => {
    const info = restaurant.info;
    const imageUrl = CDN_URL + info.cloudinaryImageId;
    console.log(`Restaurant ${index + 1}:`, info.name);
    console.log('Image ID:', info.cloudinaryImageId);
    console.log('Full URL:', imageUrl);
    console.log('---');
  });
} else {
  console.log("No restaurants found in mock data");
}