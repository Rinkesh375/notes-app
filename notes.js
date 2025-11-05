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

