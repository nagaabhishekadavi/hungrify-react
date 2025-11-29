import { useEffect, useState } from "react";
// import { MENU_API } from "../utils/constants"; // Commented out since we're using mock data
import mockMenuData from "../components/mocks/mockResMenu.json";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]); // Add resId as dependency

  const fetchData = async () => {
    // Comment out the API call and use mock data instead
    // const data = await fetch(MENU_API + resId);
    // const json = await data.json();
    // setResInfo(json.data);
    
    // Use mock data instead of API response
    console.log("useRestaurantMenu - Fetching data for restaurant ID:", resId);
    console.log("useRestaurantMenu - Mock data structure:", mockMenuData.data);
    console.log("useRestaurantMenu - Cards array:", mockMenuData.data?.cards);
    setResInfo(mockMenuData.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
