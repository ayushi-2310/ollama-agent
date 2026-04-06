import { spawn } from "node:child_process";

const message = "Use the get_system_time tool and tell me the current time";

const agent = spawn("node", [
  "scripts/run-node.mjs",
  "agent",
  "--session-id",
  "demo",
  "--message",
  message
]);

agent.stdout.on("data", (data) => {
  console.log(data.toString());
});

agent.stderr.on("data", (data) => {
  console.error(data.toString());
});
