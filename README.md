# 🌿 LankaTrails - Sri Lanka Tour & Travel Guide

A fully functional mobile travel guide application for Sri Lanka, built with React Native (Expo) for the SENG 31323 - Mobile Computing Technology assignment.

---

## 📱 About the App

LankaTrails is a localized travel companion app designed to help tourists explore the beauty of Sri Lanka. Users can browse attractions, navigate with GPS, save favorites, and discover hidden gems across the island.

---

## ✨ Features

### Core Features (Track B)

- 🏛️ Browse attractions filtered by category (Historical, Nature, Hotels)
- 🔍 Search attractions by name or location
- 📄 Detailed page for each attraction with full description and rating
- ❤️ Favorites bookmarking system with AsyncStorage persistence

### Advanced Features

- 🗺️ GPS Navigation — opens Google Maps for directions
- 📍 Distance Calculator — Haversine formula to calculate distance from user's location
- 📱 Onboarding Screen — beautiful welcome slides on first launch
- 🔔 Location Permission handling with expo-location

### Additional Features

- 🏠 Home Screen with Hero section, Stats, Featured Attractions
- 🔍 Search with input validation
- ⚠️ Error handling and empty states
- 🔄 Pull-to-refresh on Favorites
- ℹ️ About Screen
- Bottom Tab Navigation

---

## 🛠️ Framework & Technology

| Technology | Details                          |
| ---------- | -------------------------------- |
| Framework  | React Native with Expo SDK 54    |
| Language   | TypeScript                       |
| Navigation | Expo Router (File-based routing) |
| Storage    | AsyncStorage                     |
| Location   | expo-location                    |
| Maps       | Google Maps via Linking API      |

---

## 📦 Dependencies

```json
{
  "expo": "~54.0.0",
  "expo-router": "~4.0.0",
  "expo-location": "~18.0.0",
  "expo-linking": "~7.0.0",
  "expo-status-bar": "~2.0.0",
  "@react-native-async-storage/async-storage": "2.1.0",
  "react": "18.3.2",
  "react-native": "0.76.9"
}
```

---

## 📁 Project Structure

LankaTrails/

├── app/

│   ├── (tabs)/

│   │   ├── _layout.tsx      # Bottom Tab Navigation

│   │   ├── index.tsx        # Home Screen

│   │   ├── attractions.tsx  # Attractions List + Filter + Search

│   │   └── favorites.tsx    # Favorites Screen

│   ├── _layout.tsx          # Root Layout

│   ├── details.tsx          # Attraction Detail + GPS + Distance

│   ├── about.tsx            # About Screen

│   ├── onboarding.tsx       # Onboarding Slides

│   └── index.tsx            # Redirect to Onboarding

├── components/

│   └── Footer.tsx

├── constants/

│   └── colors.js

├── data/

│   └── attractions.js       # Sri Lanka attractions data

└── assets/

└── images/              # Local attraction images

---

## 🚀 How to Run

### Prerequisites

- Node.js (v20+)
- npm
- Expo Go app installed on Android/iOS device

### Steps

1. Clone the repository

```bash
git clone https://github.com/Nnavodya/LankaTrails.git
cd LankaTrails
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npx expo start --tunnel
```

4. Scan the QR code with **Expo Go** app on your device

---

## 📋 Assignment Details

| Field      | Details                                  |
| ---------- | ---------------------------------------- |
| Course     | SENG 31323 - Mobile Computing Technology |
| Track      | Track B: Local Tour & Travel Guide       |
| University | University of Kelaniya, Sri Lanka        |
| Degree     | BSc Honours in Software Engineering      |
| Deadline   | June 26, 2026                            |

---

## 👩‍💻 Developer

**Nethmi Navodya**
University of Kelaniya — Faculty of Science
Bachelor of Science Honours in Software Engineering

---

_© 2026 LankaTrails. Built with ❤️ for Sri Lanka 🇱🇰_
