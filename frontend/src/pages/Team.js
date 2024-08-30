import { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MemberCard from "../components/MemberCard";
import { AuthContext } from "../AuthContext";
import "./css/Team.css";
import axios from "axios";

const backend_link = process.env.REACT_APP_BACKEND_URL || "";

export default function Team() {
  const { isAdmin } = useContext(AuthContext);
  const [currentTeam, setCurrentTeam] = useState("executives");
  const [teamData, setTeamData] = useState([]);
  const [editingMember, setEditingMember] = useState(null); 
  const [editValues, setEditValues] = useState({ name: "", role: "" });
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("executives");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_link}/api/members`);
        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setEditingMember(null);
  }, [currentTeam]);

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

    try {
      const response = await axios.post(`${backend_link}/api/members`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setTeamData((prevData) => [...prevData, response.data]);
      setName("");
      setPosition("");
      setImage(null);
      setSelectedTeam("executives"); 
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleRemoveMember = async (id) => {
    try {
      await axios.delete(`${backend_link}/api/members/${id}`);
      setTeamData((prevData) => prevData.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member._id);
    setEditValues({
      name: member.name,
      role: member.position,
    });
  };

  const confirmEdit = async () => {
    if (editingMember) {
      try {
        const updatedMember = {
          name: editValues.name,
          position: editValues.role,
        };
        const response = await axios.put(
          `${backend_link}/api/members/${editingMember}`,
          updatedMember
        );
        setTeamData((prevData) =>
          prevData.map((item) =>
            item._id === editingMember ? response.data : item
          )
        );
        setEditingMember(null);
      } catch (error) {
        console.error("Error updating member:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="team-buttons">
        <button onClick={() => setCurrentTeam("executives")}>Executives</button>
        <button onClick={() => setCurrentTeam("managers")}>Project Managers</button>
        <button onClick={() => setCurrentTeam("interns")}>Interns</button>
      </div>
      <div className="card-container">
        {teamData.filter(item => item.team === currentTeam).map((item) => (
          <div key={item._id} className="card-wrapper">
            <MemberCard
              image={`data:image/jpeg;base64,${item.image}`}
              position={item.position}
              name={item.name}
            />
            {isAdmin && (
              <div className="card-options">
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveMember(item._id)}
                >
                  Remove
                </button>
                <div className="edit-btn">
                  {editingMember === item._id && (
                    <div className="edit-menu">
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
                      <input
                        type="text"
                        value={editValues.role}
                        placeholder="New Role"
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }))
                        }
                      />
                      <button className="confirm-btn" onClick={confirmEdit}>
                        Confirm
                      </button>
                    </div>
                  )}
                  {editingMember !== item._id && (
                    <button
                      className="edit-btn"
                      onClick={() => handleEditMember(item)}
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
      {isAdmin && (
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
            <button type="submit">Add Member</button>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}
