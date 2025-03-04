import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link, Links } from "react-router";
import useOnlineStatus from "./utils/useOnlineStatus";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]); // Manage state for restaurant list
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
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
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
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
        <button
          className="filter-btn"
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
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
