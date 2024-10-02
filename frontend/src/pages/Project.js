import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import AddProjectForm from "../components/AddProjectForm";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./css/Project.css";

const backend_link = process.env.REACT_APP_BACKEND_URL || "";

export default function Project() {
  const { isAdmin, checkAdminStatus } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editValues, setEditValues] = useState({
    status: "",
    name: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  const generateYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let year = currentYear + 1; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const years = generateYears(2020);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_link}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  const confirmEdit = async () => {
    if (editingProject) {
      try {
        const updatedProject = {
          status: editValues.status,
          name: editValues.name,
          startYear: editValues.startYear,
          endYear: editValues.endYear,
          description: editValues.description,
        };
        const response = await axios.put(
          `${backend_link}/api/projects/${editingProject}`,
          updatedProject
        );
        setProjects((prevData) =>
          prevData.map((item) =>
            item._id === editingProject ? response.data : item
          )
        );
        setEditingProject(null);
      } catch (error) {
        console.error("Error updating project:", error);
      }
    }
  };

  const handleProjectAdded = (newProject) => {
    setProjects((prevData) => [...prevData, newProject]);
  };

  const handleRemoveProject = async (id) => {
    try {
      await axios.delete(`${backend_link}/api/projects/${id}`);
      setProjects((prevData) =>
        prevData.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Error removing project:", error);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project._id);
    setEditValues({
      status: project.status,
      name: project.name,
      startYear: project.startYear,
      endYear: project.endYear,
      description: project.description,
    });
  };

  return (
    <>
      <Navbar />
      {isAdmin && (
        <AddProjectForm
          backend_link={backend_link}
          onProjectAdded={handleProjectAdded}
        />
      )}
      <div className="project-container">
        <h2>Current Projects</h2>
        <div className="cards-wrapper">
          {projects
            .filter((item) => item.status === "current")
            .map((item) => (
              <div key={item._id} className="card-wrapper">
                <ProjectCard
                  image={`data:image/jpeg;base64,${item.image}`}
                  startYear={item.startYear}
                  endYear={item.endYear}
                  name={item.name}
                  description={item.description}
                />
                {isAdmin && (
                  <div className="card-options">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveProject(item._id)}
                    >
                      Remove
                    </button>
                    <div className="edit-btn">
                      {editingProject === item._id && (
                        <div className="edit-menu">
                          <select
                            value={editValues.status}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                            required
                          >
                            <option value="current">Current</option>
                            <option value="previous">Previous</option>
                          </select>
                          <input
                            type="text"
                            value={editValues.name}
                            placeholder="New Name"
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                          <select
                            id="start-select"
                            value={editValues.startYear}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                startYear: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select new start year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            id="end-select"
                            value={editValues.endYear}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                endYear: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select new end year</option>
                            <option value="present">Present</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <textarea
                            value={editValues.description}
                            placeholder="New Description"
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          />
                          <button className="confirm-btn" onClick={confirmEdit}>
                            Confirm
                          </button>
                        </div>
                      )}
                      {editingProject !== item._id && (
                        <button
                          className="edit-btn"
                          onClick={() => handleEditProject(item)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="project-container">
        <h2>Previous Projects</h2>
        <div className="cards-wrapper">
          {projects
            .filter((item) => item.status === "previous")
            .map((item) => (
              <div key={item._id} className="card-wrapper">
                <ProjectCard
                  image={`data:image/jpeg;base64,${item.image}`}
                  startYear={item.startYear}
                  endYear={item.endYear}
                  name={item.name}
                  description={item.description}
                />
                {isAdmin && (
                  <div className="card-options">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveProject(item._id)}
                    >
                      Remove
                    </button>
                    <div className="edit-btn">
                      {editingProject === item._id && (
                        <div className="edit-menu">
                          <select
                            value={editValues.status}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                            required
                          >
                            <option value="current">Current</option>
                            <option value="previous">Previous</option>
                          </select>
                          <input
                            type="text"
                            value={editValues.name}
                            placeholder="New Name"
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                          <select
                            id="start-select"
                            value={editValues.startYear}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                startYear: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select new start year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            id="end-select"
                            value={editValues.endYear}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                endYear: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select new end year</option>
                            <option value="present">Present</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <textarea
                            value={editValues.description}
                            placeholder="New Description"
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          />
                          <button className="confirm-btn" onClick={confirmEdit}>
                            Confirm
                          </button>
                        </div>
                      )}
                      {editingProject !== item._id && (
                        <button
                          className="edit-btn"
                          onClick={() => handleEditProject(item)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
