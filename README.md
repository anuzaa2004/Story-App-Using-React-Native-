# 📖 Story Reader App  

A **React Native (Expo)** app that plays an audio story while **automatically scrolling** through the text.  
It also comes with a **dynamic scrolling speed controller (slider)** and an **flashlight toggle** (limited in Expo).  

## Features
-  **Audio Narration** – Play / Pause story audio using `expo-av`.  
-  **Auto-Scrolling Story Text** – Smooth text scrolling in sync with audio.  
-  **Dynamic Scrolling Speed** – Adjust speed using a slider in real time.  
-  **Flashlight Toggle** – Limited support in Expo Go (requires hidden camera hack).  
-  **Keeps Screen Awake** – Prevents screen from sleeping during playback (`expo-keep-awake`).  

## Tech Stack
- [Expo](https://expo.dev/)  
- [React Native](https://reactnative.dev/)  
- [`expo-av`](https://docs.expo.dev/versions/latest/sdk/av/) – Audio playback  
- [`expo-keep-awake`](https://docs.expo.dev/versions/latest/sdk/keep-awake/) – Keep screen awake  
- [`expo-camera`](https://docs.expo.dev/versions/latest/sdk/camera/) – (optional) flashlight toggle  

## Installation & Setup

### Install Dependencies

` npm install `

### Run the App

`npx expo start`

## Usage

- 1. Tap Play → Audio narration starts + text auto-scrolls.
- 2. Adjust slider → Change scrolling speed dynamically.
- 3. Tap Pause → Audio stops + scrolling pauses.
- 4. Toggle Flashlight (if enabled) → Requires hidden Camera trick in Expo.