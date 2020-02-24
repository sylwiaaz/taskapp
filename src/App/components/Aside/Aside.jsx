import React from "react";
import "./aside.scss";
import { FaRegUserCircle } from "react-icons/fa";

const users = ["Jan Nowak", "Kasia Kowalska", "Andrzej Wojciechowski"];

const Aside = () => {
  const userList = users.map(user => <User key={user} userName={user} />);
  return (
    <aside className="contact-list">
      <h3 className="team-name">Our team</h3>
      <ul>{userList}</ul>
    </aside>
  );
};

const User = ({ userName }) => {
  return (
    <li>
      <FaRegUserCircle className="user-icon" />
      <p className="user-name">{userName}</p>
    </li>
  );
};

export default Aside;
