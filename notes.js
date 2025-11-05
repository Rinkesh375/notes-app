/* ------------------------------------------------------------
🌐 Understanding CORS (Cross-Origin Resource Sharing)
------------------------------------------------------------

🧩 What is CORS?
------------------------------------------------------------
✅ CORS stands for Cross-Origin Resource Sharing.
- It’s a security feature built into browsers.
- It controls how a web page from one origin (domain/port)
  can request resources from another origin.

💡 Example:
  Frontend → http://localhost:5173
  Backend  → http://localhost:4000
  By default, browsers block these "cross-origin" requests.

🧠 CORS helps browsers ensure that only trusted origins
   can communicate with your server API.
------------------------------------------------------------

⚙️ How it Works
------------------------------------------------------------
1️⃣ When frontend sends a request to a different origin,
    the browser first sends an OPTIONS request (preflight check).
2️⃣ The server must respond with specific headers, like:
    - Access-Control-Allow-Origin
    - Access-Control-Allow-Methods
    - Access-Control-Allow-Headers
3️⃣ If allowed → browser proceeds with the actual request.
4️⃣ If not → browser blocks the request (CORS error).
------------------------------------------------------------

🛠️ Common Express.js Setup
------------------------------------------------------------
const cors = require("cors");
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://myapp.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies and authorization headers (like JWT tokens)
  allowedHeaders: ["Content-Type", "Authorization"],
}));

💡 'origin' → Defines which domains can access your backend.
💡 'methods' → Specifies allowed HTTP verbs.
💡 'credentials' → Needed if using cookies or sessions.
------------------------------------------------------------

🧠 Why We Need CORS
------------------------------------------------------------
🚫 Prevent malicious sites from secretly reading data
   from your backend by faking a request.
🔒 Ensures backend only responds to trusted origins.
🤝 Useful for frontend-backend projects running on
   different ports during development.
------------------------------------------------------------

🧾 Example Flow
------------------------------------------------------------
Request:   http://localhost:5173 → http://localhost:4000/api/data
Browser:   "Wait, this is cross-origin! Let’s check..."
Preflight: Sends OPTIONS request
Server:    Responds with Access-Control-Allow-* headers
Browser:   "Okay, approved!" → Sends the actual GET/POST
------------------------------------------------------------

🧩 Summary:
------------------------------------------------------------
🔹 CORS = Browser’s safety gate for cross-origin requests
🔹 Express CORS middleware = Lets you open the right gates
🔹 'origin', 'methods', 'headers', 'credentials' = Main keys
🔹 Use dynamic CORS in production for multiple domains

💡 Analogy:
CORS is like a security guard checking ID cards (origins)
before letting the frontend talk to your backend server.
------------------------------------------------------------ */

/* ------------------------------------------------------------
# 🧩 allowedHeaders in CORS
# ------------------------------------------------------------

# ✅ What It Means:
# "allowedHeaders" tells the server which HTTP headers 
# the frontend (browser) is allowed to send in a request.

# ------------------------------------------------------------
# 💡 Example:
# allowedHeaders: ["Content-Type", "Authorization"]

# → "Content-Type" allows sending data formats (like JSON)
# → "Authorization" allows sending tokens (like JWT or Bearer)

# ------------------------------------------------------------
# 🧠 Why It’s Needed:
# When the frontend sends a request with custom headers 
# (e.g., Authorization token), the browser first checks 
# with the server (via a preflight OPTIONS request).
#
# The server must respond confirming that those headers 
# are allowed — otherwise the browser will block the request.

# ------------------------------------------------------------
# 🚫 If Not Included:
# - Your token or JSON body may never reach the server.
# - You might see CORS errors like:
#   "Request header field Authorization is not allowed by Access-Control-Allow-Headers."

# ------------------------------------------------------------
# ✅ Best Practice:
# Always include at least:
# ["Content-Type", "Authorization"]
#
# Add others if your frontend sends them 
# (e.g., ["Content-Type", "Authorization", "X-Custom-Header"])

# ------------------------------------------------------------ */

/*
# ------------------------------------------------------------
# 🐳 How to Make Docker Ignore node_modules
# ------------------------------------------------------------

# ✅ Step 1: Create a ".dockerignore" file in your project root
# ------------------------------------------------------------
# This file works just like .gitignore but for Docker.
# It tells Docker which files/folders NOT to copy into the image.

# Example: .dockerignore
# ------------------------------------------------------------
node_modules
npm-debug.log
Dockerfile
.dockerignore
.env
.git
.gitignore

# ------------------------------------------------------------
# 🧠 Why Ignore node_modules:
# ------------------------------------------------------------
# - "node_modules" can be huge (hundreds of MB)
# - You don’t want to copy local dependencies into the container
# - Instead, Docker will install them fresh during image build
#   using:  RUN npm install  (inside the Dockerfile)

# ------------------------------------------------------------
# 💡 Typical Dockerfile Structure:
# ------------------------------------------------------------
FROM node:18-alpine

WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

RUN npm install

# Now copy the rest of the project files (excluding node_modules)
COPY . .

CMD ["npm", "run", "dev"]

# ------------------------------------------------------------
# ✅ Summary:
# ------------------------------------------------------------
# - Create `.dockerignore` file
# - Add `node_modules` inside it
# - Docker will skip copying that folder
# - Dependencies will be installed freshly in the image
# ------------------------------------------------------------


*/

/*

# ------------------------------------------------------------
# 🐳 .dockerignore for Vue / Next / Vite Frontend
# ------------------------------------------------------------
# ✅ Purpose:
# Prevent Docker from copying unnecessary, large, or secret files
# into the image during build — keeps image smaller & faster.
# ------------------------------------------------------------

# 🧩 Dependency folders (very large, not needed)
node_modules
bower_components

# ⚙️ Build output (will be generated inside the container)
dist
.build
.next
out

# 🧠 Config & Local environment files
.env
.env.*        # ignore all environment files like .env.local, .env.production etc.
!*.env.example # ❗ keep sample env for reference

# 🧾 Logs and debug files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 🧰 System & IDE files
.DS_Store
Thumbs.db
.vscode
.idea
*.swp

# 🧑‍💻 Git-related
.git
.gitignore

# 🏗️ Docker-related
Dockerfile
.dockerignore

# ------------------------------------------------------------
# 💡 Explanation:
# - node_modules → Dependencies are installed fresh during build
# - dist/.next → Output folder, rebuilt in image
# - .env* → Keep secrets out of container
# - !.env.example → Still include the sample env
# - .git → No need for repo history inside container
# ------------------------------------------------------------

# ✅ Bonus Tip:
# If your build uses package manager cache (like pnpm / yarn),
# you can also ignore:
# .pnpm-store
# .yarn
# ------------------------------------------------------------

*/


/* ------------------------------------------------------------
 🧱 Passing env variable while creating image
 ------------------------------------------------------------
# 🧩 Use this command to build the Docker image with all env vars

docker build \
  --build-arg VITE_SERVER_URL="http://localhost:4000" \
  --build-arg VITE_RAZORPAY_KEY_ID="rzp_test_123456" \
  --build-arg VITE_GA_ID="G-123ABC" \
  --build-arg VITE_GTM_ID="GTM-XYZ123" \
  --build-arg VITE_CLIENT_SECRET="secret_456xyz" \
  -t my-vue-app .

# 📦 Explanation:
# --build-arg → passes environment variables at build-time
# -t my-vue-app → names the built image
# . → means build context is the current directory
------------------------------------------------------------ */









/*
############################################################
# 🐳 DOCKER BUILD WITH .ENV-STAGE FILE
############################################################

# 🧱 Command:
#   docker build $(grep -v '^#' .env-stage | xargs -I {} echo --build-arg {}) -t my-vite-app .
#
# → This command builds a Docker image named `my-vite-app` 
#   using build-time arguments from a `.env-stage` file.

------------------------------------------------------------
# 🧩 BREAKDOWN:
# 🔹 docker build
#     → Command to build a Docker image from a Dockerfile.
#
# 🔹 $(grep -v '^#' .env-stage | xargs -I {} echo --build-arg {})
#     → Reads all non-comment lines from `.env-stage`.
#     → Prepends `--build-arg` to each line so Docker receives them as build arguments.
#     → Example: VITE_SERVER_URL=https://stage.example.com becomes
#       --build-arg VITE_SERVER_URL=https://stage.example.com
#
# 🔹 -t my-vite-app
#     → Tags the image with the name `my-vite-app`.
#
# 🔹 .
#     → The build context (current directory), which includes your Dockerfile and app files.

------------------------------------------------------------
# 🧠 WHAT IT DOES:
#   - Passes all environment variables in `.env-stage` as build arguments.
#   - Docker matches each `--build-arg` to the corresponding `ARG` in the Dockerfile.
#   - Variables are available at **build-time** inside the Dockerfile.
#   - Order of variables in `.env-stage` does NOT matter; matching is by name.

------------------------------------------------------------
# 🧾 IN SIMPLE WORDS:
#   You’re giving Docker all your build-time environment variables
#   from a file, so you don’t have to manually type each `--build-arg`.

------------------------------------------------------------
# 💡 TIP:
#   - Lines starting with `#` in `.env-stage` are ignored.
#   - Extra variables in `.env-stage` not declared as `ARG` in Dockerfile are ignored.
#   - If you want the variables to persist in the container, also use `ENV` in Dockerfile.
############################################################
*/

/*
############################################################
# 🐳 DOCKER RUN WITH ENV-FILE
############################################################

# 🧱 Command:
#   docker run -it --env-file ./.env.stage my-vite-app
#
# → This command runs a container from the `my-vite-app` image,
#   loading environment variables from the `.env.stage` file.

------------------------------------------------------------
# 🧩 BREAKDOWN:
# 🔹 docker run
#     → Command to create and start a Docker container.
#
# 🔹 -it
#     → -i → Interactive mode: keeps STDIN open.
#     → -t → Allocates a TTY (terminal) for interactive use.
#
# 🔹 --env-file ./.env.stage
#     → Loads all environment variables from `.env.stage` into the container.
#     → Example: VITE_SERVER_URL=https://stage.example.com
#
# 🔹 my-vite-app
#     → The name of the Docker image to run.

------------------------------------------------------------
# 🧠 WHAT IT DOES:
#   - Starts a container interactively.
#   - Makes all variables from `.env.stage` available **at runtime**.
#   - No need to manually set `-e VAR=value` for each variable.

------------------------------------------------------------
# 🧾 IN SIMPLE WORDS:
#   You’re giving your running container all the environment variables
#   from a file, so your app has the correct configuration without manual typing.

------------------------------------------------------------
# 💡 TIP:
#   - To detach the container and run in background:
#       docker run -d --env-file ./.env.stage my-vite-app
#   - To override a variable at runtime:
#       docker run -it -e VITE_SERVER_URL=https://override.com --env-file ./.env.stage my-vite-app
############################################################
*/




/*
############################################################
# 🐳 CHECK ENVIRONMENT VARIABLES IN DOCKER CONTAINER
############################################################

------------------------------------------------------------
# 🧱 Commands:

# 1️⃣ List all environment variables inside a running container:
#   docker exec -it <container_name_or_id> env

# 2️⃣ List all environment variables (or a specific one) inside a container:
#   docker exec -it <container_name_or_id> printenv
#   Example: printenv VITE_SERVER_URL

------------------------------------------------------------
# 🧩 BREAKDOWN:

# 🔹 docker exec
#     → Run a command in a running container.

# 🔹 -it
#     → -i → Keep STDIN open (interactive mode)
#     → -t → Allocate a TTY (terminal), so output is readable

# 🔹 <container_name_or_id>
#     → Replace with your container's name or ID (check using `docker ps`)

# 🔹 env
#     → Prints all environment variables inside the container.

# 🔹 printenv
#     → Prints all environment variables.
#     → If a variable name is provided, prints only that variable's value.

------------------------------------------------------------
# 🧠 WHAT IT DOES:

# - Both commands allow you to inspect environment variables of a running container.
# - `env` is also useful for temporarily running commands with modified variables.
# - `printenv` is simpler if you want to **check a specific variable**.

------------------------------------------------------------
# 🧾 IN SIMPLE WORDS:

#   You're opening the container and asking it:
#   "Hey, tell me all the variables you know about!" 
#   or "Give me the value of this one variable."

------------------------------------------------------------
# 💡 TIP:

# - To see container names/IDs:
#     docker ps
# - To check a specific variable:
#     docker exec -it <container_name_or_id> printenv VITE_SERVER_URL
# - For interactive shell access (and more checks):
#     docker exec -it <container_name_or_id> /bin/sh
############################################################
*/

