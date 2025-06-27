https://minarulvortexvi.github.io/datatransfer-pro/

# DataTransfer-Pro

DataTransfer-Pro is a full-stack file transfer application that allows users to upload, manage, and share files securely using Dropbox for storage and MongoDB for data management. The project consists of three main components:
- **Server**: A NestJS-based backend API for handling file uploads, authentication, and data storage.
- **Mobile**: A React Native mobile app built with Expo for file transfer and QR code scanning.
- **Client**: A Next.js web application for file uploads and management via a browser.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- Upload and share files securely via Dropbox.
- QR code scanning for quick file transfers (mobile app).
- User authentication using JWT.
- Responsive web interface for file management.
- Multi-language support (English and Bengali) using `react-i18next`.
- Real-time file transfer status tracking.

## Technologies
- **Backend (Server)**:
  - NestJS
  - MongoDB (Mongoose)
  - Dropbox API
  - JWT for authentication
- **Mobile**:
  - React Native
  - Expo
  - Axios for API calls
  - Expo Document Picker, File System, and Camera
- **Frontend (Client)**:
  - Next.js
  - React
  - Axios for API calls
- **Other**:
  - TypeScript
  - Jest for testing
  - Ngrok for tunneling (mobile development)

## Project Structure
## Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **MongoDB Atlas**: For database storage
- **Dropbox Developer Account**: For file storage
- **Termux** (optional): For running on Android
- **Expo Go**: Mobile app for testing the React Native app
- **Ngrok**: For tunneling during mobile development

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/DataTransfer-Pro.git
   cd DataTransfer-Pro
   cd server
npm run start:devcd mobile
npx expo start --tunnelcd client
npm run devPORT=3000
MONGO_URI=mongodb+srv://<your-atlas-user>:<your-atlas-password>@cluster0.mongodb.net/datatransfer
DROPBOX_CLIENT_ID=your_dropbox_app_key
DROPBOX_CLIENT_SECRET=your_dropbox_app_secret
DROPBOX_ACCESS_TOKEN=your_dropbox_access_token
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://192.168.0.101:3000API_URL=http://192.168.0.101:3000
DROPBOX_CLIENT_ID=your_dropbox_app_key
DROPBOX_CLIENT_SECRET=your_dropbox_app_secret
DROPBOX_REDIRECT_URI=exp://192.168.0.101:19000/--/auth/callbackNEXT_PUBLIC_API_URL=http://192.168.0.101:3000
NEXT_PUBLIC_DROPBOX_CLIENT_ID=your_dropbox_app_keycd server
npm run test---

### **কীভাবে README.md ফাইল তৈরি করবেন**
1. **রুট ফোল্ডারে যান**:
   ```bash
   cd ~/DataTransfer-Procd mobile
npm run testnano README.mdcat README.mdgit add README.md
git commit -m "Add README.md"
git push origin main![App Screenshot](screenshots/mobile-app.png)npm install --save-dev @types/expresscd ~/DataTransfer-Pro/server
npm run start:devcd ~/DataTransfer-Pro/mobile
npm install --legacy-peer-deps
npx expo startcd ~/DataTransfer-Pro/client
npm install
npm run devcurl http://192.168.0.101:3000/transfer/status/test-id
