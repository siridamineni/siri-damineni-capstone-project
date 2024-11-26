import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./Dashboard.scss";
function Dashboard() {
  return (
    <main className="main-wrapper">
      <SideBar />
      <section className="wrapper"></section>
    </main>
  );
}

export default Dashboard;
