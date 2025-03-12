import React, { useEffect, useState } from "react";
import Track from "./Track";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { FiSearch, FiPlus } from "react-icons/fi";
import Nav from "./Nav";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();

  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [tasks, setTasks] = useState<any>([]); // All tasks
  const [filteredTasks, setFilteredTasks] = useState<any>([]); // Filtered tasks for display
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");
  const [tasktitle, setTasktitle] = useState("");
  const [updatedesc, setUpdatedesc] = useState("");
  const [editingTask, setEditingTask] = useState<any>(null); // Track the task being edited
  const [searchQuery, setSearchQuery] = useState(""); // Search query

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
        setTasks(response.data.tasks); // Set all tasks
        setFilteredTasks(response.data.tasks); // Initially, display all tasks
      }
    } catch (error: any) {
      console.log("Error fetching tasks: ", error);
      toast.error("Failed to fetch tasks");
    }
  };

  // Search tasks by status
  const searchTasks = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/search?status=${query}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        setFilteredTasks(response.data.tasks); // Update filtered tasks
      } else if (response.data == null) {
        getAllTask(); // Update filtered tasks
      } else {
        toast.error("Failed to search tasks");
      }
    } catch (error: any) {
      console.log("Error searching tasks: ", error);
      toast.error("Failed to search tasks");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      // If search query is empty, show all tasks
      setFilteredTasks(tasks);
    } else {
      // Call search API when query is not empty
      searchTasks(query);
    }
  };

  // Create a new task
  const createTask = async () => {
    try {
      if (!tasktitle || !description) {
        toast.error("Task title and description are required");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/api/v1/createtasks`,
        {
          tasktitle,
          description,
          status: "Pending", // Default status for new tasks
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("New Task created successfully");
        await getAllTask(); // Refresh tasks list
        setTasktitle("");
        setDescription("");
        setModal(false);
      } else {
        toast.error(response.data.message || "An unexpected error occurred");
      }
    } catch (error: any) {
      console.log("Error creating task: ", error);
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // Update a task
  const updateTask = async (id: any) => {
    try {
      if (!tasktitle || !updatedesc) {
        toast.error("Task title and description are required");
        return;
      }

      setLoading(true);
      const response = await axios.put(
        `http://localhost:4000/api/v1/updatetask/${id}`,
        {
          tasktitle,
          description: updatedesc,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Task updated successfully");
        await getAllTask(); // Refresh tasks list
        setTasktitle("");
        setUpdatedesc("");
        setDropdownIndex(null); // Close the dropdown
        setEditingTask(null); // Reset editing task
      } else {
        toast.error(response.data.message || "An unexpected error occurred");
      }
    } catch (error: any) {
      console.log("Error updating task: ", error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id: any) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/api/v1/deletetask/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Task deleted successfully");
        await getAllTask(); // Refresh tasks list
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error: any) {
      console.log("Error deleting task: ", error);
      toast.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  // Update task status
  const updateStatus = async (id: any, newStatus: string) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:4000/api/v1/status/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Task status updated successfully");
        await getAllTask(); // Refresh tasks list
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error: any) {
      console.log("Error updating task status: ", error);
      toast.error("Failed to update task status");
    } finally {
      setLoading(false);
    }
  };

  // Set editing task data when dropdown is opened
  const handleEditClick = (index: number, task: any) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
    setEditingTask(task);
    setTasktitle(task.tasktitle);
    setUpdatedesc(task.description);
  };

  useEffect(() => {
    if (!authToken) {
      navigate("/authentication");
    } else {
      getAllTask();
    }
  }, []);

  if (!authToken) {
    return null;
  }

  return (
    <div className="bg-blue-100 min-h-screen w-screen">
      <Nav />
      <div className="p-6">
        <Track />
        <div className="flex justify-between items-center mt-5 mb-5">
          <div className="w-[90%] h-10 bg-white rounded-2xl text-blue-500 border-2 border-blue-400 active:border-blue-400 flex justify-between">
            <input
              type="text"
              placeholder="Search your tasks"
              className="w-[90%] bg-white rounded-3xl h-full border-none focus:outline-none focus:ring-0 ml-2"
              value={searchQuery}
              onChange={handleSearchChange} // Handle search input change
            />
            <FiSearch className="w-5 h-10 mr-2" />
          </div>
          <button
            onClick={() => setModal(true)}
            className="px-4 py-2 w-28 text-white bg-blue-600 rounded-3xl shadow-md flex items-center justify-center space-x-2"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>

        {/* Modal for Adding Task */}
        {modal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add New Task</h2>
              <input
                type="text"
                placeholder="Task Name"
                className="w-full p-2 border rounded-lg mb-4 bg-white"
                value={tasktitle}
                onChange={(e) => setTasktitle(e.target.value)}
              />
              <textarea
                placeholder="Task Description"
                className="w-full p-2 border rounded-lg mb-4 bg-white "
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setModal(false)}
                  className="px-4 py-2 text-blue-600 bg-white rounded-3xl shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={createTask}
                  className="px-4 py-2 text-white bg-blue-600 rounded-3xl shadow-md"
                >
                  {loading ? <ClipLoader size={20} color="#fff" /> : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <ClipLoader size={50} color="#ffffff" />
          </div>
        )}

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg w-full">
          <table className="w-full text-gray-700 border-collapse">
            <thead className="bg-blue-200">
              <tr className="bg-blue-300">
                <th className="p-4 text-center w-1/4">Name</th>
                <th className="p-4 text-center w-1/4">Description</th>
                <th className="p-4 text-center w-1/4">Status</th>
                <th className="p-4 text-center w-1/4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks && // Use filteredTasks instead of tasks
                filteredTasks.map((task: any, index: any) => (
                  <React.Fragment key={index}>
                    <tr
                      className={`border-b hover:bg-blue-50 transition ${
                        index % 2 === 0 ? "bg-white" : "bg-blue-100"
                      }`}
                    >
                      <td className="text-center text-blue-600 cursor-pointer w-1/5">
                        {task.tasktitle}
                      </td>
                      <td className="text-center w-1/5">{task.description}</td>
                      <td className="text-center w-1/5">
                        <select
                          className="p-1 border rounded-lg bg-blue-100"
                          value={task.status}
                          onChange={(e) =>
                            updateStatus(task._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="text-center relative w-1/5">
                        <button
                          className="text-blue-500 cursor-pointer h-[40px]"
                          onClick={() => handleEditClick(index, task)}
                        >
                          ▼
                        </button>
                      </td>
                    </tr>
                    {dropdownIndex === index && (
                      <tr className="bg-blue-50">
                        <td colSpan={4} className="p-4 border-t">
                          <div className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex space-x-4">
                              <div className="flex-1">
                                <label className="block text-gray-700">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border bg-blue-100 rounded-lg"
                                  value={tasktitle}
                                  onChange={(e) => setTasktitle(e.target.value)}
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-gray-700">
                                  Description
                                </label>
                                <textarea
                                  className="w-full p-2 border bg-blue-100 rounded-lg"
                                  rows={1}
                                  value={updatedesc}
                                  onChange={(e) =>
                                    setUpdatedesc(e.target.value)
                                  }
                                ></textarea>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                              <button
                                onClick={() => updateTask(task._id)}
                                className="px-4 py-2 w-28 text-blue-600 bg-white rounded-3xl shadow-md flex items-center justify-center space-x-2"
                              >
                                <HiPencilAlt className="w-5 h-5" />
                                <span>Update</span>
                              </button>
                              <button
                                onClick={() => deleteTask(task._id)}
                                className="px-4 py-2 w-28 text-white bg-blue-600 rounded-3xl shadow-md flex items-center justify-center space-x-2"
                              >
                                <HiTrash className="w-5 h-5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer aria-label={undefined} />
    </div>
  );
};

export default Tasks;
