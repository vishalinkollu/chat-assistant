# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

///////////////////////////////////////////////////////////////////////////////////
# 📱 React Native Chat Assistant

A cross‑platform **Chat Assistant** built using **React Native (Expo)** that runs on **Mobile (iOS/Android) and Web** from a single codebase. The project demonstrates **Redux Toolkit + Redux Thunk**, **mock backend APIs**, **polling for long‑running jobs**, and a **modern chat UI**.

This project was built as part of a technical assignment and intentionally goes beyond the basic requirements with improved UX and robust error handling.

---

## ✨ Features

### Core Chat Experience

* User messages displayed on the **right** in chat bubbles
* Assistant responses displayed on the **left**
* Modern input with **arrow send button**
* **Send message on Enter key** (Web & Mobile keyboards)
* Auto‑scroll to the latest message


### Response Types

* **Text responses** (instant, no polling)
* **Image generation** (async job + polling)
* **Data processing** (async job + polling with progress)

### Advanced UX

* Animated typing indicator (`● ● ●`)
* Progress updates for long‑running jobs
* Structured data rendered as **styled cards/tables**
* Graceful fallback: *“No answers found”*
* Clickable suggestion chips (tap to resend as user input)

### Error Handling

* Simulated network failures
* Polling retries (up to 3 attempts)
* Safe failure messages shown in chat
* Unknown questions logged for analytics/debugging

---

## 🏗 Tech Stack

* **React Native + Expo** (mobile & web)
* **Redux Toolkit** (state management)
* **Redux Thunk** (async logic & polling)
* **Expo Vector Icons**
* **Mock Backend API** (no real server required)

---

## 📂 Project Structure

```
chat-assistant/
├── app/
│   ├── _layout.js
│   └── index.js
│
├── src/
│   ├── api/
│   │   └── mockApi.js
│   │
│   ├── store/
│   │   └── store.js
│   │
│   ├── features/
│   │   └── chat/
│   │       ├── chatSlice.js
│   │       └── chatThunks.js
│   │
│   ├── components/
│   │   ├── ChatBubble.js
│   │   ├── ChatInput.js
│   │   └── MessageList.js
│   │
│   └── screens/
│       └── ChatScreen.js
│
├── package.json
└── README.md
```

---

## 🔌 Mock API Design

### `postChat(message)`

* Determines intent based on message text
* Returns one of:

  * **Text response** (knowledge questions)
  * **Image job** (`jobId` + polling required)
  * **Data job** (`jobId` + polling required)
  * **Fallback**: No answers found + suggestions

### `pollJob(jobId)`

* Simulates progress (25%, 50%, 75%, 100%)
* Randomized failures for realism
* Returns final image URL or processed data object

---

## 🔄 Polling Strategy

* Poll every ~2 seconds using Redux Thunks
* Stop polling on:

  * Job completion
  * Failure after 3 retries
* UI updated on each progress tick

---

## 🧪 Sample Interactions

### Example 1: Knowledge Question

**User:** Explain Redux Thunk

**Assistant:**
Redux Thunk allows you to write async logic that interacts with the Redux store. It lets actions return functions instead of plain objects.

---

### Example 2: Image Generation

**User:** Generate an image of a sunset

**Assistant:**
Generating image…

→ (after polling) Image displayed

---

### Example 3: Data Processing

**User:** Process sample data

**Assistant:**

```
Records Processed: 1200
Success Rate: 98.4%
Average Latency: 183ms
Processed At: 2025‑12‑18
```

---

### Example 4: Unknown Question

**User:** Who won the FIFA World Cup in 1998?

**Assistant:**
No answers found for this question.

Suggestions:

* Explain Redux Thunk
* What is Redux?
* Generate an image of a sunset

---

## ⚠️ Known Limitations

* Polling jobs are **not persisted** across app restarts
* Mock API uses **intent‑based matching**, not real AI
* Active jobs are tracked implicitly in thunks

These tradeoffs were made intentionally to keep the demo lightweight and focused.

---

## 🚀 Possible Improvements

* Persist jobs and messages using AsyncStorage
* Resume polling after app reload
* Dark mode support
* Message timestamps and delivery status
* Progress bars for long‑running jobs

---

## ▶️ Running the Project

```bash
npm install
npx expo start
```

Runs on:

* iOS Simulator / Android Emulator
* Web (via Expo)

---

## ✅ Summary

This project demonstrates:

* Clean architecture
* Real‑world async patterns
* Robust error handling
* Polished user experience


