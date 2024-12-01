import React, { useState, useEffect } from "react";
import "./WorkoutDetails.scss";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav/SideNav";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import axios from "axios";
function WorkoutDetails() {
  const params = useParams();
  const [exerciseData, setExerciseData] = useState({});
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { id } = params;

  const getExerciseData = async (exerciseId) => {
    const data = await axios(`${baseUrl}/excercises/${exerciseId}`);
    setExerciseData(data.data);
  };

  const getDetailsInKeyValuePairs = () => {
    return [
      { name: "Category", value: exerciseData.category },
      { name: "Difficulty Level", value: exerciseData.difficulty_level },
      { name: "Equipment", value: exerciseData.equipment },
      { name: "Body Region", value: exerciseData.body_region },
      {
        name: "Continous Alternating Arm",
        value: exerciseData.continuous_alternating_arms,
      },
      { name: "Foot Elevation", value: exerciseData.foot_elevation },
      { name: "grip", value: exerciseData.grip },
      { name: "Prime Move Muscle", value: exerciseData.prime_move_muscle },
      { name: "Target Muscle Group", value: exerciseData.target_muscle_group },
    ];
  };
  useEffect(() => {
    getExerciseData(id);
  }, [id]);
  console.log(exerciseData);
  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="exercise-details">
        <div className="exercise-details__title">
          <h1>{exerciseData.exercise_name}</h1>
        </div>
        <div className="exercise-details__wrapper">
          <VideoPlayer url={exerciseData?.video_url || ""} />
          <div className="exercise-details__info">
            <h3 className="exercise-details__heading">Exercise Details</h3>
            <div className="exercise-details__list">
              {getDetailsInKeyValuePairs().map(({ name, value }, index) => (
                <div className="exercise-details__item" key={index}>
                  <span className="exercise-details__item-name">{name}</span>
                  <span className="exercise-details__item-seperator">:</span>
                  <span className="exercise-details__item-data">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WorkoutDetails;
