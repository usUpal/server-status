const express = require("express");
const axios = require("axios");
const chalk = require("ansi-colors");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());

app.get("/checkServerStatus", async (req, res) => {
  console.log(
    chalk.blue(`GET /checkServerStatus ${chalk.gray(new Date().toISOString())}`)
  );
  const serverStatus = {};

  // List of servers to check
  const servers = [
    "https://workflow.foodrabbit.store",
    "https://www.google.com",
    "https://onboarding.foodrabbit.store",
    "https://backoffice.foodrabbit.store",
    "https://kyc.foodrabbit.store",
    "https://api.foodrabbit.store/health",
    "https://foodrabbit.store",
    "https://scanner.keoscx.com",
    "https://eventos.keoscx.com",
    "https://keosgpt.keoscx.com",
    "https://chatbot-train.keoscx.com/api/v1/health",
    "https://ballerine-api.foodrabbit.store/api/v1/health"
  ];

  await Promise.all(
    servers.map(async (server) => {
      try {
        await axios.get(server);
        serverStatus[server] = "up";
      } catch (error) {
        serverStatus[server] = "down";
      }
    })
  );

  res.send(serverStatus);
});

app.listen(port, () => {
  console.log(`Server monitoring app listening at http://localhost:${port}`);
});
