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

## Project StructureDataTransfer-Pro/ ├── server/              # NestJS backend API │   ├── src/ │   │   ├── modules/ │   │   │   ├── auth/      # Authentication module │   │   │   ├── transfer/  # File transfer module │   │   ├── app.module.ts │   │   ├── main.ts │   ├── package.json │   ├── tsconfig.json │   ├── .env ├── mobile/              # React Native mobile app │   ├── assets/          # App icons and splash images │   ├── screens/         # React Native screens │   ├── components/      # Reusable components │   ├── lib/ │   │   ├── api/         # API utilities │   │   ├── i18n/        # Localization files │   ├── app.json │   ├── package.json │   ├── .env ├── client/              # Next.js web app │   ├── pages/           # Next.js pages │   ├── package.json │   ├── .env.local ├── README.md## Prerequisites
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
   cd DataTransfer-ProInstall dependencies for each component:Server:cd server
npm installMobile:cd ../mobile
npm install --legacy-peer-depsClient:cd ../client
npm installSet up environment variables:Create .env files in the server and mobile folders, and .env.local in the client folder. See Environment Variables for details.Install Termux dependencies (if using Termux):pkg install nodejs
pkg install tsuRunning the ApplicationServer:cd server
npm run start:devThe server will run on http://192.168.0.101:3000.Mobile:cd mobile
npx expo start --tunnelUse the Expo Go app to scan the QR code for testing on your mobile device.Client:cd client
npm run devThe web app will run on http://192.168.0.101:3000.API EndpointsAuthenticationPOST /auth/login: Generate a JWT tokenBody: { "id": "user-id", "email": "user@example.com" }Response: { "access_token": "jwt-token" }File TransferPOST /transfer/upload: Upload a file to DropboxBody: Form-data with file keyResponse: { "link": "dropbox-shared-link" }GET /transfer/status/:id: Get file transfer statusResponse: { "status": "uploaded", "url": "dropbox-shared-link" }Environment VariablesServer (.env):PORT=3000
MONGO_URI=mongodb+srv://<your-atlas-user>:<your-atlas-password>@cluster0.mongodb.net/datatransfer
DROPBOX_CLIENT_ID=your_dropbox_app_key
DROPBOX_CLIENT_SECRET=your_dropbox_app_secret
DROPBOX_ACCESS_TOKEN=your_dropbox_access_token
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://192.168.0.101:3000Mobile (.env):API_URL=http://192.168.0.101:3000
DROPBOX_CLIENT_ID=your_dropbox_app_key
DROPBOX_CLIENT_SECRET=your_dropbox_app_secret
DROPBOX_REDIRECT_URI=exp://192.168.0.101:19000/--/auth/callbackClient (.env.local):NEXT_PUBLIC_API_URL=http://192.168.0.101:3000
NEXT_PUBLIC_DROPBOX_CLIENT_ID=your_dropbox_app_keyTestingServer:cd server
npm run testMobile:cd mobile
npm run testAPI Testing:curl http://192.168.0.101:3000/transfer/status/test-idContributingFork the repository.Create a new branch (git checkout -b feature/your-feature).Commit your changes (git commit -m "Add your feature").Push to the branch (git push origin feature/your-feature).Create a Pull Request.LicenseThis project is licensed under the MIT License. See the LICENSE file for details.---

### **কীভাবে README.md ফাইল তৈরি করবেন**
1. **রুট ফোল্ডারে যান**:
   ```bash
   cd ~/DataTransfer-ProREADME.md ফাইল তৈরি করুন:nano README.mdউপরের কনটেন্ট পেস্ট করুন:উপরের মার্কডাউন কোড কপি করে পেস্ট করুন।সেভ করুন: Ctrl+O, Enter, Ctrl+X।ফাইলটি চেক করুন:cat README.mdGitHub-এ পুশ করুন (যদি প্রয়োজন হয়):যদি আপনার প্রকল্পটি GitHub-এ হোস্ট করা হয়:git add README.md
git commit -m "Add README.md"
git push origin mainকাস্টমাইজেশন (যদি প্রয়োজন হয়)প্রকল্পের নাম বা বর্ণনা: যদি আপনার প্রকল্পের নাম বা বর্ণনা ভিন্ন হয়, তবে README.md ফাইলে আপডেট করুন।লোগো বা ছবি: যদি আপনি কোনো লোগো বা স্ক্রিনশট যোগ করতে চান, তবে মার্কডাউনে ছবির লিঙ্ক যোগ করুন। উদাহরণ:![App Screenshot](screenshots/mobile-app.png)এবং screenshots ফোল্ডারে ছবি রাখুন।লাইসেন্স: আপনার প্রকল্পের লাইসেন্স পরিবর্তন করতে চাইলে LICENSE ফাইল তৈরি করুন এবং README.md আপডেট করুন।GitHub URL: যদি আপনার প্রকল্প GitHub-এ হোস্ট করা থাকে, তবে git clone কমান্ডে আপনার রিপোজিটরি URL ব্যবহার করুন।অতিরিক্ত নির্দেশনাServer ত্রুটি সমাধান:আপনার পূর্ববর্তী ত্রুটি (src/app.module.ts এবং Express নেমস্পেস) সমাধানের জন্য আমার আগের উত্তরে দেওয়া নির্দেশনা অনুসরণ করেছেন। নিশ্চিত করুন যে:src/modules/auth ফোল্ডারে ফাইলগুলো তৈরি হয়েছে।@types/express ইনস্টল করা হয়েছে:npm install --save-dev @types/expressসার্ভার চালান:cd ~/DataTransfer-Pro/server
npm run start:devMobile ফোল্ডারের Ngrok ত্রুটি:যদি npx expo start --tunnel এখনও ত্রুটি দেয়:cd ~/DataTransfer-Pro/mobile
npm install --legacy-peer-deps
npx expo startExpo Go অ্যাপ দিয়ে QR কোড স্ক্যান করুন।Client ফোল্ডার:নিশ্চিত করুন যে client ফোল্ডার সঠিকভাবে সেটআপ করা আছে:cd ~/DataTransfer-Pro/client
npm install
npm run devপরীক্ষা করুন:সার্ভার:curl http://192.168.0.101:3000/transfer/status/test-idমোবাইল এবং ক্লায়েন্ট অ্যাপ টেস্ট করুন।
