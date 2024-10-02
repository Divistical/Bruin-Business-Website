import { useState, useMemo } from "react";
import axios from "axios";

const AddProjectForm = ({ backend_link, onProjectAdded }) => {
  const [name, setName] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("current");

  const generateYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let year = currentYear+1; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const years = useMemo(() => generateYears(2020), []);

  const endYearOptions = useMemo(() => {
    if (!startYear) return [];
    return years.filter(year => year >= parseInt(startYear));
  }, [startYear, years]);

  const handleStartYearChange = (e) => {
    const newStartYear = e.target.value;
    setStartYear(newStartYear);
    // Reset end year if it's less than the new start year
    if (endYear && endYear !== "present" && parseInt(endYear) < parseInt(newStartYear)) {
      setEndYear("");
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!name || !startYear || !endYear || !description) {
      console.error("Name, duration, and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("status", selectedStatus);
    formData.append("name", name);
    formData.append("startYear", startYear);
    formData.append("endYear", endYear);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${backend_link}/api/projects`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onProjectAdded(response.data);
      setName("");
      setStartYear("");
      setEndYear("");
      setDescription("");
      setImage(null);
      setSelectedStatus(selectedStatus);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="add-project">
      <form className="project-form" onSubmit={handleAddProject}>
        <div className="form-group">
          <label>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            required
          >
            <option value="current">Current</option>
            <option value="previous">Previous</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="start-select">Start Year</label>
          <select
            id="start-select"
            value={startYear}
            onChange={handleStartYearChange}
            required
          >
            <option value="">Select start year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="end-select">End Year</label>
          <select
            id="end-select"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            required
            disabled={!startYear}
          >
            <option value="">Select end year</option>
            <option value="present">Present</option>
            {endYearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            id="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the project"
            rows="5"
            cols="50"
          />
        </div>

        <button className="submit-button" type="submit">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;
