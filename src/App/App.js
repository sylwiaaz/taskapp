import React from "react";
import "./App.css";
import SideBarContainer from "./components/Sidebar/SidebarContainer";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <SideBarContainer />
      <Board />
    </div>
  );
}

export default App;
