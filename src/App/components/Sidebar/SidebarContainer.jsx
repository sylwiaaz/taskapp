import React from "react";
import UserList from "./UserList/UserList";
import "./sidebar.scss";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { connect } from "react-redux";
import { hideSidebar, showSidebar } from "../../store/actions/sidebarAction";

const SidebarContainer = ({ isOpenSidebar, dispatch }) => {
  const handleToggleSidebar = () => {
    isOpenSidebar ? dispatch(hideSidebar()) : dispatch(showSidebar());
  };
  return (
    <React.Fragment>
      <button
        onClick={handleToggleSidebar}
        className={`toggle-btn ${isOpenSidebar ? "open" : ""}`}
      >
        {isOpenSidebar ? <FaArrowCircleLeft /> : <FaArrowCircleRight />}
      </button>
      <div className={`sidebar-container ${isOpenSidebar ? "" : "hide"}`}>
        <UserList />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isOpenSidebar: state.openSidebar.isOpenSidebar
  };
};

export default connect(mapStateToProps)(SidebarContainer);
