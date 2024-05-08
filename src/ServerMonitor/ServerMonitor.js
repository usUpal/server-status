import React, { useState, useEffect } from "react";
import axios from "axios";

const ServerMonitor = () => {
  const [serverStatus, setServerStatus] = useState({});
  const [countdown, setCountdown] = useState(30 * 60); // Countdown starts at 15 minutes

  const fetchServerStatus = () => {
    axios.get("https://server-status-hkdrdssh1-usupals-projects.vercel.app/checkServerStatus").then((response) => {
      setServerStatus(response.data);
      setCountdown(30 * 60); // Reset countdown
    });
  };

  useEffect(() => {
    const fetchInterval = setInterval(fetchServerStatus, 30 * 60 * 1000); // Check every 15 minutes

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Decrease countdown every second

    return () => {
      clearInterval(fetchInterval); // Clear fetch interval
      clearInterval(countdownInterval); // Clear countdown interval
    };
  }, []);

  const countdownMinutes = Math.floor(countdown / 60);
  const countdownSeconds = countdown % 60;

  return (
    
    <div style={{ margin: "20px", padding: "10px", fontFamily: "Arial, sans-serif" }}>
    <h1>KEOS Monitor</h1>
      <div style={{ marginBottom: "10px" }}>
        Refreshing in {countdownMinutes}:{countdownSeconds < 10 ? `0${countdownSeconds}` : countdownSeconds}...
      </div>
      <button 
        onClick={fetchServerStatus} 
        style={{ marginBottom: "20px", padding: "10px", fontSize: "16px", color: "white", backgroundColor: "blue", border: "none"}}
      >
        Refresh
      </button>
      <ol>
        {Object.entries(serverStatus).map(([server, status]) => (
          <li key={server} style={{ marginBottom: "10px" }}>
            <a 
              href={`${server}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ marginRight: "10px" }}
            >
              {server}
            </a>
            is
            <span style={{ color: status === "up" ? "green" : "red", marginLeft: "10px" }}>
              {status}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ServerMonitor;
