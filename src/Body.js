import { useEffect, useState, useContext } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link, Links } from "react-router";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]); // Manage state for restaurant list
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  const { loggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9698196&lng=77.7499721&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const res = await data.json();
    const inform =
      res?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setRestaurants(inform);
    setFilteredRestaurants(inform);
  };

  const OnlineStatus = useOnlineStatus();

  if (OnlineStatus === false)
    return (
      <h1>Looks like you are offline! Please check your internet connection</h1>
    );

  return (
    <div className="body">
      <div className="filter flex">
        <div className="m-4 p-4 ">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="m-4 px-4 py-1 bg-green-100 rounded-md"
            onClick={() => {
              const filtRestaurant = restaurants.filter((res) =>
                res?.info?.name.toLowerCase().includes(searchText)
              );
              setFilteredRestaurants(filtRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-md"
            onClick={() => {
              const filteredList = restaurants.filter(
                (resto) => parseFloat(resto.info.avgRating || 0) >= 4.5
              );
              setRestaurants(filteredList); // Update state instead of mutating resList
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
        <div className="">
          Name:
          <input
            type="text"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
