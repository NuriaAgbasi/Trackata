import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [teamPassword, setTeamPassword] = useState("");
  const history = useNavigate();

  const handleCreateTeam = () => {
    // Simulated team creation
    // Here you could save team details to localStorage or send to a backend API
    alert(`Team ${teamName} created successfully!`);
    history.push("/home");
  };

  return (
    <div>
      <h1>Create Team</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateTeam();
        }}
      >
        <label>Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <br />
        <label>Team Password:</label>
        <input
          type="password"
          value={teamPassword}
          onChange={(e) => setTeamPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default CreateTeam;
