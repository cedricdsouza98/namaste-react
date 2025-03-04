import { useState } from "react";

const User = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);

  return (
    <div className="user-card">
      <h3>Count: {count}</h3>
      <h3>Count2: {count2}</h3>
      <h2>Name: Cedric</h2>
      <h3>Location: Belgaum</h3>
      <h4>Contact: @_cedric_dsouza</h4>
    </div>
  );
};

export default User;
