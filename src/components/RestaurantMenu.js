import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestrauntMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const dummy = "Dummy Data";

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  // Fixed indices to match mock data structure
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info || {};

  // More robust way to find menu categories
  let categories = [];
  
  if (resInfo?.cards) {
    // Find the card with groupedCard
    const menuCard = resInfo.cards.find(card => card.groupedCard);
    
    if (menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
      categories = menuCard.groupedCard.cardGroupMap.REGULAR.cards.filter(
        (c) =>
          c.card?.["card"]?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    }
  }
  
  // Debug info (can be removed in production)
  if (process.env.NODE_ENV === 'development') {
    console.log("RestaurantMenu - Categories found:", categories.length);
  }

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name || "Restaurant"}</h1>
      <p className="font-bold text-lg">
        {cuisines?.join(", ") || "Various cuisines"} - {costForTwoMessage || "Price not available"}
      </p>
      {/* categories accordions */}
      {categories.length > 0 ? (
        categories.map((category, index) => (
          // controlled component
          <RestaurantCategory
            key={category?.card?.card?.title || index}
            data={category?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
            dummy={dummy}
          />
        ))
      ) : (
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold mb-4">Menu Items</h3>
          <p className="text-gray-600 mb-4">Using sample menu data from Hotel Empire</p>
          
          {/* Fallback: Show some sample menu items */}
          <div className="w-6/12 mx-auto bg-gray-50 shadow-lg p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-4">Sample Menu Items</h4>
            <div className="text-left space-y-3">
              <div className="flex justify-between items-center p-2 border-b">
                <div>
                  <p className="font-medium">Bucket Chicken Biryani</p>
                  <p className="text-sm text-gray-600">Serves 7</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹1260</p>
                  <button className="bg-black text-white px-3 py-1 rounded text-sm">Add +</button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-2 border-b">
                <div>
                  <p className="font-medium">Chicken Biryani</p>
                  <p className="text-sm text-gray-600">Classic chicken biryani</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹350</p>
                  <button className="bg-black text-white px-3 py-1 rounded text-sm">Add +</button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-2 border-b">
                <div>
                  <p className="font-medium">Mutton Biryani</p>
                  <p className="text-sm text-gray-600">Tender mutton biryani</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹450</p>
                  <button className="bg-black text-white px-3 py-1 rounded text-sm">Add +</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
