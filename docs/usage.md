# DataTransfer.dev Usage Guide

## Overview
DataTransfer.dev allows users to transfer files securely using Dropbox.

## Authentication
- Sign in via `/auth/dropbox` using OAuth 2.0.
- Required scopes: `files.content.write`, `files.content.read`, `sharing.write`.

## File Transfer
- Upload files via `/transfer` or mobile app.
- A shared link is generated and can be accessed via QR code or `/transfer/receive/{transferId}`.
- Clicking the shared link prompts Dropbox login and auto-downloads the file.

## Mobile App
- Authenticate with Dropbox.
- Upload files or access shared links to receive files.
