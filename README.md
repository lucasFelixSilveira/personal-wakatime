<div align="center">
  <h1>Temporal Language Statistics</h1>
  <h3>Made by Lucas Silveira • Powered by WakaTime & GitHub</h3>
</div>

<br>
<hr>
<br>

## 📖 Overview

This project provides a simple API that generates visual statistics of your programming activity:

* `/timer` → Uses **WakaTime** data to show time spent per language
* `/amount` → Uses **GitHub** data to show language distribution (pie chart)

Both endpoints return **images**, perfect for embedding directly into your `README.md`.

---

## ⚙️ Requirements

### 1. WakaTime (for `/timer`)

You must:

* Install the WakaTime extension in your IDE (VS Code, JetBrains, etc.)
* Connect it to your WakaTime account

### 2. GitHub (for `/amount`)

* A GitHub account
* (Optional but recommended) a **GitHub Token** to avoid rate limits

---

## 🧠 How `/timer` Works (WakaTime)

The `/timer` route generates a visual summary of your **coding time per language**.

### Step-by-step

1. Go to your WakaTime dashboard
2. Navigate to the **Share / Embeddable** section
3. Generate a **Languages JSON share**
4. Copy:

   * Your **username**
   * Your **share key**

---

### 📌 Usage

```md
<img width="500px" src="https://your-api.com/timer?username=YOUR_USERNAME&key=YOUR_KEY" />
```

---

### ✅ Example

```md
<img width="500px" src="https://personal-wakatime.vercel.app/timer?username=lucasFelixSilveira&key=YOUR_KEY" />
```

---

## 🥧 How `/amount` Works (GitHub)

The `/amount` route analyzes your **GitHub repositories** and generates a **pie chart** of your most used languages.

### 🔍 What it does

* Fetches all your repositories
* Collects language data from each repo
* Aggregates usage (in bytes)
* Selects the **Top 6 languages**
* Recalculates percentages **only among these 6**
* Renders a **pie chart + legend (WakaTime style)**

---

## 📌 Usage

```md
<img width="500px" src="https://your-api.com/amount?username=YOUR_GITHUB_USERNAME" />
```

---

### ✅ Example

```md
<img width="500px" src="https://your-api.com/amount?username=torvalds" />
```

---

## 🔐 GitHub Token (Recommended)

To avoid rate limits:

### Create a `.env` file:

```env
GITHUB_TOKEN=your_token_here
```

### Then load it in your project:

```js
require("dotenv").config();
```

---

### Why use a token?

* Without token → 60 requests/hour
* With token → 5000 requests/hour

---

## 🚀 Running the API

```bash
npm install
node index.js
```

Server will start on:

```txt
http://localhost:8080
```

---

## 📦 Available Routes

### `/timer`

WakaTime-based time tracking

| Param    | Description             |
| -------- | ----------------------- |
| username | Your WakaTime username  |
| key      | Your WakaTime share key |

---

### `/amount`

GitHub language distribution

| Param    | Description          |
| -------- | -------------------- |
| username | Your GitHub username |

---

## 💡 Notes

* `/amount` only considers the **Top 6 languages**
* Percentages are recalculated for clarity
* Colors follow GitHub's language color scheme
* Output is optimized for README usage

---

## ❤️ Final Words

If you found this useful, consider exploring more projects or improving this one further.

You can extend it with:

* caching
* animations
* combined charts
* public API deployment

<br>

Enjoy 🚀
