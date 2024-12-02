import { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../../components/SideNav/SideNav";
import SelectDropdown from "../../components/SelectDropdown/SelectDropdown";
import "./ExploreWorkouts.scss";
import ExcerciseCard from "../../components/ExcerciseCard/ExcerciseCard";
import { useNavigate } from "react-router-dom";
function ExploreWorkouts() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [intensity, setIntensity] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [intensityOptions, setIntensityOptions] = useState([]);
  const [excerciseData, setExcerciseData] = useState([]);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleIntensityChange = (e) => {
    setIntensity(e.target.value);
  };
  const getAllCategories = async () => {
    const data = await axios.get(`${baseUrl}/categories`);
    setCategoryOptions(data.data);
  };

  const getAllIntensities = async () => {
    const data = await axios.get(`${baseUrl}/intensities`);
    setIntensityOptions(data.data);
  };

  const handleRedirectToDetails = (id) => {
    navigate(`/explore-workouts/${id}`);
  };
  const getAllExcercises = async (selectedCategory, selectedIntensity) => {
    let data = [];
    if (selectedCategory && selectedIntensity) {
      data = await axios.get(
        `${baseUrl}/excercises?category=${selectedCategory}&intensity=${selectedIntensity}`
      );
    } else if (selectedCategory) {
      data = await axios.get(
        `${baseUrl}/excercises?category=${selectedCategory}`
      );
    } else if (selectedIntensity) {
      data = await axios.get(
        `${baseUrl}/excercises?intensity=${selectedIntensity}`
      );
    } else {
      data = await axios.get(`${baseUrl}/excercises`);
    }
    const excercises = AddThumbnailToExcerciseData(data.data);
    setExcerciseData(excercises);
  };

  function getVideoIdFromUrl(url) {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?[^\/]*)?/;
    const match = url.match(regex);
    return match && match[1];
  }

  function getYouTubeThumbnail(videoUrl) {
    const videoId = getVideoIdFromUrl(videoUrl); // Function to extract video ID
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return thumbnailUrl;
  }

  const AddThumbnailToExcerciseData = (data) => {
    if (data) {
      const resultData = data?.map((item) => ({
        id: item.id,
        name: item.exercise_name,
        bodyRegion: item.body_region,
        equipment: item.equipment,
        videoUrl: item.video_url,
        thumbnailUrl: getYouTubeThumbnail(item.video_url),
      }));
      return resultData;
    }
  };

  useEffect(() => {
    getAllExcercises(category, intensity);
  }, [category, intensity]);

  useEffect(() => {
    getAllCategories();
    getAllIntensities();
  }, []);

  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="wrapper">
        <div className="excercise__container">
          <div className="excercise__filter-container">
            <SelectDropdown
              title={"Select Category"}
              value={category}
              handleSelectChange={handleCategoryChange}
              options={categoryOptions}
            />
            <SelectDropdown
              title={"Select Intensity"}
              value={intensity}
              handleSelectChange={handleIntensityChange}
              options={intensityOptions}
            />
          </div>
          <div className="excercise__card-container">
            {excerciseData?.map(
              ({ id, name, bodyRegion, equipment, thumbnailUrl }) => {
                return (
                  <div key={id} onClick={() => handleRedirectToDetails(id)}>
                    <ExcerciseCard
                      thumbnailUrl={thumbnailUrl}
                      name={name}
                      bodyRegion={bodyRegion}
                      equipment={equipment}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ExploreWorkouts;
