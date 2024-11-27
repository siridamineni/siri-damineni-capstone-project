import React, { useState, useEffect } from "react";
import "./WorkoutDetails.scss";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import axios from "axios";
function WorkoutDetails() {
  const params = useParams();
  const [excerciseData, setExcerciseData] = useState({});
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { id } = params;

  const getExcerciseData = async (excerciseId) => {
    const data = await axios(`${baseUrl}/excercises/${excerciseId}`);
    setExcerciseData(data.data);
  };
  useEffect(() => {
    getExcerciseData(id);
  }, [id]);

  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="wrapper">
        <VideoPlayer url={excerciseData?.video_url || ""} />
      </section>
    </main>
  );
}

export default WorkoutDetails;
