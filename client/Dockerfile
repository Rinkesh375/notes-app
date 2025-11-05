#  ------------------------------------------------------------
#  🐳 Dockerfile — Multi-Stage Build for Frontend App (Vite / Vue / React)
#  ------------------------------------------------------------

#  📦 STAGE 1: Build Stage
#  ------------------------------------------------------------

# 🧩 Use lightweight Node.js image (Alpine = minimal size)
FROM node:22-alpine AS builder    

# 📁 Set working directory inside the container
WORKDIR /app

# 📦 Copy dependency files and install dependencies
COPY package*.json ./
RUN npm install

# 📂 Copy all project files into the container
COPY . .

# ⚙️ Declare build-time arguments (passed via `--build-arg`)
ARG VITE_SERVER_URL
ARG VITE_RAZORPAY_KEY_ID
ARG VITE_GA_ID

# 🌍 Set environment variables inside container
# (These are embedded at build-time and available during `npm run build`)
ENV VITE_SERVER_URL=$VITE_SERVER_URL
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID
ENV VITE_GA_ID=$VITE_GA_ID

# 🏗️ Run production build (generates static files in /dist)
RUN npm run build

# ------------------------------------------------------------
#  🚀 STAGE 2: Production Stage
#  ------------------------------------------------------------

# 🧩 Use fresh Node image for running the built app
FROM node:22-alpine AS production

# 📁 Create a clean working directory
WORKDIR /app

# 🌐 Install "serve" globally — a lightweight static file server
RUN npm i -g serve

# ENV PATH="/usr/local/bin:$PATH"

# 📂 Copy built files from the previous stage (builder → production)
COPY --from=builder /app/dist ./dist

# 🔓 Expose port 3000 (the port the app will run on)
EXPOSE 3000

# ▶️ Start the app using "serve" to serve static files from /dist
CMD ["serve", "-s", "dist", "-l", "3000"]

# ------------------------------------------------------------
#  🧠 Summary:
#  ------------------------------------------------------------
#  1️⃣ builder stage → builds optimized static files
#  2️⃣ production stage → serves those files using "serve"
#  ------------------------------------------------------------ 



# 🧩 Use this command to build the Docker image with all env vars
# docker build \
#     --build-arg VITE_SERVER_URL="http://localhost:4000" \
#     --build-arg VITE_RAZORPAY_KEY_ID="rzp_test_123456" \
#     --build-arg VITE_GA_ID="G-123ABC" \
#     -t my-vue-app .

# 📦 Explanation:
# --build-arg → passes environment variables at build-time
# -t my-vue-app → names the built image
# . → means build context is the current directory    
