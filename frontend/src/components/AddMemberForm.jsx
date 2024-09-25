import { useState } from "react";
import axios from "axios";

const AddMemberForm = ({ backend_link, onMemberAdded }) => {
  const [name, setName] = useState("");
  const [linkedin, setLinkedin] = useState("")
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("executives");

  const handleAddMember = async (e) => {
    e.preventDefault(); 
    if (!name || !position || !selectedTeam) {
      console.error("Name, position, and team are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("team", selectedTeam);
    if (image) {
      formData.append("image", image);
    }

    if (linkedin.includes("linkedin.com")) {
        formData.append("linkedin", linkedin);
    }

    try {
      const response = await axios.post(`${backend_link}/api/members`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      onMemberAdded(response.data);
      setName("");
      setPosition("");
      setImage(null);
      setSelectedTeam(selectedTeam); 
      setLinkedin("")
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <div className="add-member">
      <form onSubmit={handleAddMember}>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          required
        >
          <option value="executives">Executives</option>
          <option value="managers">Project Managers</option>
          <option value="interns">Interns</option>
        </select>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="Link to LinkedIn Profile"
        />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMemberForm;
