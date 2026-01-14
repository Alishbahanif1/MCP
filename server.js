// server.js
import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const app = express();
app.use(express.json());

// Define your tools
const tools = {
  add_numbers: {
    description: "Add two numbers",
    inputSchema: {
      type: "object",
      properties: {
        a: { type: "number" },
        b: { type: "number" },
      },
      required: ["a", "b"],
    },
    async handler(input) {
      const { a, b } = input;
      return {
        content: [
          { type: "text", text: `The sum of ${a} and ${b} is ${a + b}` },
        ],
      };
    },
  },
};

// Create MCP server
const server = new Server(
  { name: "add-numbers-mcp", version: "1.0.0" },
  { tools }
);

// HTTP route
app.post("/add_numbers", async (req, res) => {
  const result = await tools.add_numbers.handler(req.body);
  res.json(result);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`HTTP MCP server running on port ${port}`));