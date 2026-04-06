# OpenClaw Local Agent with Ollama

## Overview

This project demonstrates how to run the **OpenClaw AI Agent** locally using a **local Large Language Model (LLM)** via Ollama.
A simple custom tool `get_system_time` is implemented and registered so the agent can call it when asked.

The system allows the agent to interact with external tools and return real-time information such as the current system time.

---

## Tech Stack

* **OpenClaw** – Agent framework
* **Ollama** – Local LLM runtime
* **Qwen2.5 (0.5B)** – Lightweight local model
* **Node.js (v22+)**
* **PNPM** – Package manager
* **Python** – Tool implementation

---

## System Architecture

```
User Prompt
     │
     ▼
OpenClaw Agent
     │
     ▼
OpenClaw Gateway
     │
     ▼
Ollama Local LLM
     │
     ▼
Tool Execution (get_system_time)
     │
     ▼
Final Response to User
```

---

## Prerequisites

Ensure the following are installed:

* Linux / macOS system
* Node.js **v22+**
* npm
* Python 3
* Git

---

## 1. Install Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Verify installation:

```bash
ollama --version
```

---

## 2. Install a Local Model

Install a lightweight model compatible with lower RAM systems:

```bash
ollama pull qwen2.5:0.5b
```

Test the model:

```bash
ollama run qwen2.5:0.5b
```

Exit the chat with:

```
/bye
```

Verify Ollama server:

```bash
curl http://localhost:11434
```

Expected output:

```
Ollama is running
```

---

## 3. Clone the OpenClaw Repository

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

---

## 4. Install Node Version Manager (NVM)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
```

Install Node 22:

```bash
nvm install 22
nvm use 22
```

Verify:

```bash
node -v
```

---

## 5. Install PNPM

```bash
sudo npm install -g pnpm
```

Verify:

```bash
pnpm -v
```

---

## 6. Install Project Dependencies

Inside the OpenClaw project:

```bash
pnpm add -Dw tsdown
pnpm install
```

---

## 7. Setup OpenClaw

Initialize the project:

```bash
node scripts/run-node.mjs setup
```

Start the gateway:

```bash
node scripts/run-node.mjs gateway
```

The gateway will start on:

```
ws://127.0.0.1:18789
```

---

## 8. Configure Ollama Model

Set the local model:

```bash
node scripts/run-node.mjs models set ollama/qwen2.5:0.5b
```

Check configuration:

```bash
node scripts/run-node.mjs models status
```

---

## 9. Configure Authentication

Run:

```bash
node scripts/run-node.mjs models auth add
```

Provide the following values:

| Prompt         | Value         |
| -------------- | ------------- |
| Token provider | custom        |
| Provider id    | ollama        |
| Token method   | paste token   |
| Profile id     | ollama:manual |
| Token expires  | No            |
| Token          | local         |

---

## 10. Run the Agent

Open a new terminal and run:

```bash
node scripts/run-node.mjs agent --session-id demo --message "hello"
```

Expected output:

```
Hello. I'm Ayushi, an assistant for the OpenClaw platform.
```

---

# Implementing a Custom Tool

## Tool: `get_system_time`

This tool returns the current system time.

### Python Implementation

Create:

```
tools/get_system_time.py
```

```python
from datetime import datetime

def get_system_time():
    now = datetime.now()
    return now.strftime("%Y-%m-%d %H:%M:%S")
```

---

## Tool Description

Create:

```
tools/get_system_time.json
```

```json
{
  "name": "get_system_time",
  "description": "Returns the current system time",
  "parameters": {}
}
```

---

# Demonstration

Run the agent:

```bash
node scripts/run-node.mjs agent --session-id demo --message "What is the current time?"
```

### Agent Workflow

1. User asks for current time
2. Agent detects need for tool
3. Agent calls `get_system_time`
4. Tool returns system time
5. Agent formats the final response

### Example Output

```
Tool: get_system_time
Result: 2026-03-10 16:15:32

Assistant:
The current system time is 2026-03-10 16:15:32.
```

---

# Project Structure

```
openclaw-local-agent
│
├── README.md
├── tools
│   ├── get_system_time.py
│   └── get_system_time.json
│
└── openclaw
    └── (cloned OpenClaw repository)
```

---

# Conclusion

This project demonstrates:

* Running OpenClaw locally
* Integrating a local LLM with Ollama
* Implementing and registering custom tools
* Enabling the agent to call tools dynamically

This setup allows building powerful local AI agents capable of interacting with system tools and external services.
