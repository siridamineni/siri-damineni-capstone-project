import React from "react";
import "./WorkoutDetails.scss";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav";

function WorkoutDetails() {
  const params = useParams();
  const { id } = params;

  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="wrapper"></section>
    </main>
  );
}

export default WorkoutDetails;
