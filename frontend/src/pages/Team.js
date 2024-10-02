import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MemberCard from "../components/MemberCard";
import AddMemberForm from "../components/AddMemberForm"; // Import the new component
import { AuthContext } from "../AuthContext";
import "./css/Team.css";
import axios from "axios";

const backend_link = process.env.REACT_APP_BACKEND_URL || "";

export default function Team() {
  const { isAdmin, checkAdminStatus } = useContext(AuthContext);
  const [currentTeam, setCurrentTeam] = useState("executives");
  const [teamData, setTeamData] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    role: "",
    linkedin: "",
  });

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

  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve token from cookies
    console.log("Token found in cookies:", document.cookie); // Check if token exists
    checkAdminStatus(token); // Verify if the token is properly being decoded
    console.log(isAdmin)
  }, []);

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
          linkedin: editValues.linkedin,
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

  const handleMemberAdded = (newMember) => {
    setTeamData((prevData) => [...prevData, newMember]);
  };

  return (
    <>
      <Navbar />
      <div className="team-buttons">
        <button onClick={() => setCurrentTeam("executives")}>Executives</button>
        <button onClick={() => setCurrentTeam("managers")}>
          Project Managers
        </button>
        <button onClick={() => setCurrentTeam("interns")}>Interns</button>

        <select
          className="team-dropdown"
          value={currentTeam}
          onChange={(e) => setCurrentTeam(e.target.value)}
        >
          <option value="executives">Executives</option>
          <option value="managers">Project Managers</option>
          <option value="interns">Interns</option>
        </select>
      </div>
      <div className="card-container">
        {teamData
          .filter((item) => item.team === currentTeam)
          .map((item) => (
            <div key={item._id} className="card-wrapper">
              <MemberCard
                image={`data:image/jpeg;base64,${item.image}`}
                position={item.position}
                name={item.name}
                linkedin={item.linkedin}
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
                        <input
                          type="text"
                          value={editValues.linkedin}
                          placeholder="New Link"
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              linkedin: e.target.value,
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
        <AddMemberForm
          backend_link={backend_link}
          onMemberAdded={handleMemberAdded}
        />
      )}
      <Footer />
    </>
  );
}
