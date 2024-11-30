import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import BmiStatusCard from "../../components/BmiStatusCard/BmiStatusCard";
import axios from "axios";
import { USER_ID } from "../../shared/constants";
import "./Dashboard.scss";
import { toast } from "react-toastify";
function Dashboard() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem(USER_ID);

  const getUserData = async (id) => {
    try {
      const data = await axios.get(`${baseUrl}/user-data/${id}`);
      console.log(data.data);
      setUserData(data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getUserData(userId);
  }, [userId]);

  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="dashboard-wrapper">
        <BmiStatusCard
          bmiValue={userData?.bmi}
          bmiStatus={userData?.bmi_status}
        />
      </section>
    </main>
  );
}

export default Dashboard;
