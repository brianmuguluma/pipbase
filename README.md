# Pipbase

![Angular](https://img.shields.io/badge/Angular-18-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Ionic](https://img.shields.io/badge/Ionic-8-3880FF)
![Firebase](https://img.shields.io/badge/Firebase-Cloud-orange)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-GCP-4285F4)
![Capacitor](https://img.shields.io/badge/Capacitor-6-119EFF)

<img width="3420" height="1812" alt="screenshot" src="https://github.com/user-attachments/assets/dd7f3650-f74d-4bbb-a1ca-09d677c818fe" />

A full-stack platform for automating financial trading workflows through a suite of interconnected web, mobile and cloud-based applications.

> **Note:** This repository contains the frontend applications for Pipbase. The backend automation engine is maintained as a separate private repository and communicates with the frontend using Firebase, REST APIs and real-time messaging technologies.

---

## Overview

Pipbase was designed to provide traders with a single platform for configuring, monitoring and controlling automated trading strategies from anywhere.

The frontend is organised as a monorepo containing multiple applications, each serving a distinct purpose within the platform.

## Why?

Pipbase was created to simplify the management of automated trading by providing users with a single platform for configuring, monitoring and interacting with remotely hosted trading infrastructure. Rather than requiring users to manage virtual machines directly, the platform provides intuitive web and mobile interfaces that communicate with cloud services and automation infrastructure in real time.

## Applications

### Landing Website

The public-facing marketing website introducing the platform, its features and user onboarding.

### Dashboard

The primary application used by customers to configure trading preferences, monitor activity and interact with automation services in real time.

### Administration Console

Administrative interface used to manage platform data, users and operational tasks.

### Mobile Application

Hybrid Android and iOS application built with Ionic, allowing users to monitor and interact with their trading infrastructure while away from their desktop.

---

## Architecture

The frontend applications communicate with cloud services and backend infrastructure using Firebase services, REST APIs and real-time messaging technologies.

```text
                 Landing Website
                        │
                        ▼
      Dashboard • Admin Console • Mobile App
                        │
                        ▼
                   Firebase Services
                        │
              REST APIs / Real-Time Messaging
                        │
                        ▼
      Trading Automation Infrastructure
      (Maintained in a separate repository)
```

This separation allows the frontend applications and automation infrastructure to evolve independently while maintaining real-time communication between users and their remotely hosted automation services.

---

## Technology Stack

### Frontend

* Angular
* TypeScript
* JavaScript
* Ionic
* HTML5
* CSS3
* Tailwind CSS

### Backend Integration

* Firebase Authentication
* Firestore
* Cloud Functions
* REST APIs
* Real-Time Messaging

### Infrastructure

* Google Cloud Platform

---

## Key Features

* Modular Angular architecture
* Multi-application monorepo
* Responsive web interfaces
* Hybrid mobile applications
* Authentication and role-based access
* Real-time communication
* REST API integration
* Cloud-hosted backend integration

---

## Repository Structure

```text
projects/
├── dashboard/     Customer dashboard
├── console/       Administration console
├── landing/       Public website
└── mobile/        Hybrid Android & iOS application

functions/         Firebase Cloud Functions
```

---

## Screenshots

<img width="1103" height="735" alt="mobile" src="https://github.com/user-attachments/assets/4c2e22cf-37f0-4e20-92d0-7abfad5e9b9a" />

<img width="3420" height="1812" alt="dashboard" src="https://github.com/user-attachments/assets/f7d405b3-ca77-4466-8875-b8b4a81e8904" />

<img width="3420" height="1812" alt="console" src="https://github.com/user-attachments/assets/b43e08bd-ff46-4413-ae33-992de9d839e4" />


---

## Running Locally

This repository requires external configuration before it can be run locally.

Configuration values such as Firebase project settings, real-time messaging credentials and other environment-specific values have been intentionally omitted from the public repository.

An environment.example.ts file has been included to demonstrate the expected configuration structure.

---

## About This Repository

This repository has been published as part of my software development portfolio to demonstrate application architecture, Angular development practices and full-stack application design.

Certain proprietary components, including the trading automation engine and business-specific automation logic, are maintained separately and are not included in this repository.

## What I Learned

Pipbase was my largest software engineering project to date and significantly expanded my experience in designing modular Angular applications, structuring multi-application workspaces, integrating real-time communication technologies and building software spanning web, mobile and cloud infrastructure. It also strengthened my understanding of application architecture, deployment and maintaining larger TypeScript codebases.
