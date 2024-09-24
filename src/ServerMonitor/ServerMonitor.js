import React, { useState, useEffect } from "react";
import axios from "axios";

const ServerMonitor = () => {
  const [serverStatus, setServerStatus] = useState({});
  const [countdown, setCountdown] = useState(30 * 60); // Countdown starts at 30 minutes

  const fetchServerStatus = () => {
    axios
      .get("https://server-status-api.vercel.app/checkServerStatus")
      .then((response) => {
        setServerStatus(response.data);
      });
  };

  const handleRefresh = () => {
    setCountdown(30 * 60); // Fetch server status on manual refresh
  };

  useEffect(() => {
    // Fetch server status on initial mount
    fetchServerStatus();

    // Set interval to fetch server status every 30 minutes
    const fetchInterval = setInterval(fetchServerStatus, 30 * 60 * 1000);

    // Countdown interval to decrease countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear intervals on component unmount
    return () => {
      clearInterval(fetchInterval);
      clearInterval(countdownInterval);
    };
  }, []); // Empty dependency array ensures the effect runs only on mount

  const countdownMinutes = Math.floor(countdown / 60);
  const countdownSeconds = countdown % 60;

  return (
    <>
      <h1>to run this, contact: +8801705933999(whatsapp)- UDYAN SAHA UPAL </h1>
    </>
    // <div
    //   style={{
    //     margin: "20px",
    //     padding: "10px",
    //     fontFamily: "Arial, sans-serif",
    //   }}
    // >
    //   <h1>KEOS Monitor</h1>
    //   <div style={{ marginBottom: "10px" }}>
    //     Refreshing in {countdownMinutes}:
    //     {countdownSeconds < 10 ? `0${countdownSeconds}` : countdownSeconds}...
    //   </div>
    //   <button
    //     onClick={() => {
    //       handleRefresh();
    //       fetchServerStatus(); // Call fetchServerStatus directly here
    //     }}
    //     style={{
    //       marginBottom: "20px",
    //       padding: "10px",
    //       fontSize: "16px",
    //       color: "white",
    //       backgroundColor: "blue",
    //       border: "none",
    //       transition: "background-color 0.3s",
    //       cursor: "pointer",
    //     }}
    //     // Add hover effect
    //     onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e90ff")}
    //     onMouseLeave={(e) => (e.target.style.backgroundColor = "blue")}
    //   >
    //     Refresh
    //   </button>
    //   <ol>
    //     {Object.entries(serverStatus).map(([server, status]) => (
    //       <li key={server} style={{ marginBottom: "10px" }}>
    //         <a
    //           href={`${server}`}
    //           target='_blank'
    //           rel='noopener noreferrer'
    //           style={{ marginRight: "10px" }}
    //         >
    //           {server}
    //         </a>
    //         is
    //         <span
    //           style={{
    //             color: status === "up" ? "green" : "red",
    //             marginLeft: "10px",
    //           }}
    //         >
    //           {status}
    //         </span>
    //       </li>
    //     ))}
    //   </ol>
    // </div>
  );
};

export default ServerMonitor;
