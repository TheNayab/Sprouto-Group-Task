import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import Cookies from "js-cookie";

const Track = () => {
  const [tasks, setTasks] = useState([]);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [inProgressPercentage, setInProgressPercentage] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const authToken = Cookies.get("token");

  // Fetch all tasks
  const getAllTask = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/tasks`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.data.success) {
        setTasks(response.data.tasks);
        calculateProgress(response.data.tasks); // Calculate progress after fetching tasks
      }
    } catch (error: any) {
      console.log("Error fetching tasks: ", error);
    }
  };

  // Calculate progress for completed, in progress, and pending tasks
  const calculateProgress = (tasks: any) => {
    const totalTasks = tasks.length;

    if (totalTasks === 0) {
      setCompletedPercentage(0);
      setInProgressPercentage(0);
      setPendingCount(0);
      return;
    }

    const completedTasks = tasks.filter(
      (task: any) => task.status === "Completed"
    ).length;
    const inProgressTasks = tasks.filter(
      (task: any) => task.status === "In Progress"
    ).length;
    const pendingTasks = tasks.filter(
      (task: any) => task.status === "Pending"
    ).length;

    // Calculate percentages
    setCompletedPercentage(Math.round((completedTasks / totalTasks) * 100));
    setInProgressPercentage(Math.round((inProgressTasks / totalTasks) * 100));
    setPendingCount(pendingTasks);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <div className="mb-3 bg-blue-100 w-full flex justify-between">
      {/* Goals Achieved Section */}
      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 flex space-x-6 w-[40%] h-[200px] justify-center items-center border border-white/40">
        <div className="w-[140px] h-[140px]">
          <CircularProgressbar
            value={completedPercentage}
            text={`${completedPercentage}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#FF5C5C",
              trailColor: "#F0F0F0",
              textColor: "#333",
            })}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">
              COMPLETED TASKS
            </h2>
          </div>
        </div>
      </div>

      {/* Vacancies Section */}
      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 flex space-x-6 w-[29%] h-[200px] justify-center items-center border border-white/40">
        <div className="w-[120px] h-[120px] bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {pendingCount}
        </div>
        <p className="text-gray-600 text-sm ml-4 mt-2">PENDING TASKS</p>
      </div>

      {/* Doing Section */}
      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 flex space-x-6 w-[29%] h-[200px] justify-center items-center border border-white/40">
        <div className="w-[120px] h-[120px]">
          <CircularProgressbar
            value={inProgressPercentage}
            text={`${inProgressPercentage}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#FF5C5C",
              trailColor: "#F0F0F0",
              textColor: "#333",
            })}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">DOING TASKS</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
