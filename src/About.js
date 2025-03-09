import { useEffect } from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "./utils/UserContext";

const About = () => {
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.984048&lng=77.7481552&restaurantId=82160&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    console.log(json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>About</h1>
      <h2>Namaste React</h2>
      <UserContext.Consumer>
        {({ loggedInUser }) => (
          <h1 className="text-xl font-bold">{loggedInUser}</h1>
        )}
      </UserContext.Consumer>

      <UserClass name={"Cedric Class"} location={"Bengaluru"} />
    </div>
  );
};
export default About;
