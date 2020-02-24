import React from "react";
import "./userlist.scss";
import { FaRegUserCircle } from "react-icons/fa";

const users = ["Jan Nowak", "Kasia Kowalska", "Andrzej Wojciechowski"];

const UserList = () => {
  const userList = users.map(user => <User key={user} userName={user} />);
  return (
    <div className="contact-list">
      <h3 className="team-name">Our team</h3>
      <ul>{userList}</ul>
    </div>
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

export default UserList;
