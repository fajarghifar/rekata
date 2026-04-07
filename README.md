<div align="center">
  <h1 align="center">rekata<span style="color: #0ea5e9;">.</span></h1>
  <h3>Meaningful conversations, one card at a time.</h3>
</div>

<br />

**Rekata** is a beautifully crafted, privacy-first web application designed to spark deep, meaningful conversations among close friends, partners, and family members.

In a world full of digital distractions, Rekata provides a deck of curated "Deep Talk" questions to break the ice and dive into topics that actually matter—all wrapped in a premium, glassmorphism-inspired interface.

![Dashboard Preview](public/images/screenshot.png)

## ✨ Features

- **Cards That Matter:** Contains exactly 100 uniquely curated questions covering family themes, future goals, friendships, and personal perspectives.
- **Zero-Backend Privacy:** Runs entirely in your device's browser using the native LocalStorage API. No server connections, no mandatory accounts, and absolutely zero tracking.
- **Fair Play Engine:** Features a built-in Round-Robin algorithm that ensures every player gets equal turns to speak, eliminating awkward silences.
- **Liquid UI/UX:** Built with a clean, dynamic layout that ensures smooth, native-app-like interactions on any mobile device without frustrating scroll leaks.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and a package manager (like npm or Yarn) installed on your machine.

### Installation

1. Clone the repository and navigate into the directory:
   ```bash
   git clone https://github.com/fajarghifar/rekata.git
   cd rekata
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided localhost URL (typically `http://localhost:5173`) in your web browser to start playing!

## 🛠️ Stack Architecture

Rekata is built from the ground up with modern web technologies, focusing tightly on performance and aesthetics:

- **React 19 & Vite** for lightning-fast compilation and state management.
- **Tailwind CSS v4** for utility-first, modern glassmorphism styling.
- **TypeScript** for strict type-safety across custom hooks and game logic.
- **Lucide React** for crisp, scalable vector icons.

## 🎨 Make It Yours (Customization)

Want to add inside jokes or your own personal questions to play with your friends? You don't need to dive into complex code!

Simply locate the card database file at `src/data/questions.json` and add or modify the JSON objects. The game engine will automatically detect and shuffle your new cards:

```json
[
  {
    "id": 101,
    "text": "What is our most embarrassing collective memory?",
    "category": "Friendship",
    "icon": "Users",
    "color": "amber"
  }
]
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/fajarghifar/rekata/issues) if you want to contribute to the codebase or expand the bank of questions.

## 📜 License

Distributed under the MIT License. Feel free to fork, modify, and build upon this project to create your own unique conversational games!

---
<div align="center">
  <i>Crafted with passion to bring people closer.</i><br>
  Built by <a href="https://github.com/fajarghifar">Fajar Ghifar</a>
</div>
