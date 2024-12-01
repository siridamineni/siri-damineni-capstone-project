import { useEffect, useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import BmiStatusCard from "../../components/BmiStatusCard/BmiStatusCard";
import UserDataTable from "../../components/UserDataTable/UserDataTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_ID } from "../../shared/constants";
import "./Dashboard.scss";
import { toast } from "react-toastify";
import ExercisePieChart from "../../components/PieChart/ExercisePieChart";
function Dashboard() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userTableData, setUserTableData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [pieChartData, setPieChartData] = useState([]);
  const userId = localStorage.getItem(USER_ID);

  const getUserData = async (id) => {
    try {
      const data = await axios.get(`${baseUrl}/user-data/${id}`);
      setUserData(data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getAllUserDataById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/all-user-data/${id}`);
      const rows = [
        "Id",
        "Excercise Name",
        "Category",
        "Body Region",
        "Repeation Count",
      ];
      const columns = response.data.map((item) => {
        return {
          id: item.id,
          excerciseName: item.exercise_name,
          category: item.category,
          bodyRegion: item.body_region,
          repeatCount: item.rep_count,
        };
      });
      setUserTableData({ rows, columns });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getExerciseCountByBodyRegion = async (id) => {
    try {
      const result = await axios.get(
        `${baseUrl}/ex-count-by-body-region/${id}`
      );
      const data = result?.data.map((item) => ({
        name: item.body_region,
        value: item.exercise_count,
      }));
      setPieChartData(data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  const deleteUserDataById = async (id) => {
    try {
      const result = await axios.delete(`${baseUrl}/user-details/${id}`);
      setIsDeleted(true);
      toast.success("Selected User Data deleted Successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleDeleteUser = (id) => {
    deleteUserDataById(id);
  };

  const handleEditUserData = (id) => {
    navigate(`/daily-tracker/${id}`);
  };
  useEffect(() => {
    getUserData(userId);
    getAllUserDataById(userId);
  }, [userId, isDeleted]);

  useEffect(() => {
    getExerciseCountByBodyRegion(userId);
  }, [userId]);

  return (
    <main className="main-wrapper">
      <SideNav />
      <section className="dashboard-wrapper">
        <div className="stats__container">
          <BmiStatusCard
            bmiValue={userData?.bmi}
            bmiStatus={userData?.bmi_status}
          />
          <ExercisePieChart data={pieChartData} />
        </div>
        <UserDataTable
          rows={userTableData.rows}
          columns={userTableData.columns}
          handleDelete={handleDeleteUser}
          handleEdit={handleEditUserData}
        />
      </section>
    </main>
  );
}

export default Dashboard;
