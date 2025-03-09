import { IMAGE_URL } from "./utils/constants";

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, sla, avgRating, cloudinaryImageId } =
    resData?.info || {};

  return (
    <div className="m-4 p-4 w-[200px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <img
        className="rounded-lg"
        src={IMAGE_URL + cloudinaryImageId}
        alt={name || "Restaurant"}
      />
      <h3 className="font-bold py-2">{name || "Unnamed Restaurant"}</h3>
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

export const withPromotedLabel = (RestaurantCard) => {
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
