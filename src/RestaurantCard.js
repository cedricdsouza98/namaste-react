import { IMAGE_URL } from "./utils/constants";

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, sla, avgRating, cloudinaryImageId } =
    resData?.info || {};

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={IMAGE_URL + cloudinaryImageId}
        alt={name || "Restaurant"}
      />
      <h3>{name || "Unnamed Restaurant"}</h3>
      <h4>{cuisines?.join(", ") || "No cuisines available"}</h4>
      <h4>{avgRating ? `${avgRating} stars` : "No ratings yet"}</h4>
      <h4>
        {sla?.deliveryTime
          ? `${sla.deliveryTime} mins`
          : "Delivery time not available"}
      </h4>
    </div>
  );
};

export default RestaurantCard;
