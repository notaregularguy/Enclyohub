# 🌐 Enclyohub

[Enclyohub](https://enclyohub.onrender.com/) is a modern, browser-based platform to create and manage wiki communities with Markdown support. It allows users to organize content, edit pages, preview Markdown in real-time, and generate a downloadable static HTML site — all without needing a backend server.  

Enclyohub makes creating structured knowledge communities easy, visually appealing, and fully functional directly from your browser.

---

## ✨ Key Features

### 1. Community Settings
- Create a unique community by specifying:
  - **Name**
  - **Genre**
  - **Description**
- All data is stored locally using `localStorage`, allowing you to return and continue editing your community at any time.

### 2. Wiki Page Management
- Add multiple pages to your community with:
  - **Title**
  - **Markdown Content**
- Edit existing pages or delete pages when no longer needed.
- Rename pages directly using a modal interface to maintain organization.

### 3. Markdown Editor with Live Preview
- Write content using Markdown syntax for headings, lists, code blocks, quotes, emphasis, and more.
- Toggle between **Edit** and **Preview** tabs for real-time formatting feedback.
- Preview styled with a clean and readable layout, showing exactly how your generated site will appear.

### 4. Static Site Generation
- Generate a complete, self-contained HTML file of your wiki community.
- Includes all pages and your community information (name, genre, description).
- Download and share your generated site instantly.

### 5. Responsive Design
- Fully responsive interface that works on desktops, tablets, and mobile devices.
- Clean, modern UI with soft shadows, rounded corners, and gradient accents for a polished look.

---

## 🚀 How It Works

Enclyohub runs completely in the browser using **HTML, CSS, and JavaScript**, with **Marked.js** for Markdown parsing.  
All user data is stored locally in the browser’s `localStorage`, meaning there is **no server required**. This ensures that your content is private and accessible anytime from the same browser.

---

## 📝 Detailed Usage

### Creating Your Community
1. Enter your **Community Name**, **Genre**, and **Description** in the community settings section.
2. Click **Save Community**. Your data is now stored in your browser and will persist across sessions.

### Adding Wiki Pages
1. Enter a **Page Title**.
2. Write content in the **Markdown editor**.
3. Toggle between **Edit** and **Preview** tabs to see a live preview of your formatted content.
4. Click **Save Page** to store it locally.

### Managing Pages
- **Edit Page:** Click the **Edit** button on any page card to modify content.
- **Rename Page:** Click the **Rename** button, enter a new title, and confirm.
- **Delete Page:** Remove pages permanently with the **Delete** button.

### Generating Your Community Site
1. Once you have created pages and saved your community information, click **Generate Community Site**.
2. A downloadable `.html` file will be created, containing all your wiki pages and community details.
3. Open the file in any browser or host it online.

---

## 🔧 Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Markdown Parsing:** [Marked.js](https://marked.js.org/)
- **Storage:** Browser `localStorage`
- **UI Design:** Responsive layouts, gradients, shadows, rounded corners, and modern typography

---

## 💡 Key Design Considerations

- **Privacy:** All data remains on the user’s browser until manually exported.
- **Ease of Use:** Simple interface with intuitive controls for managing pages.
- **Portability:** Generated `.html` files are self-contained and can be hosted anywhere without additional setup.
- **Real-time Feedback:** Markdown live preview ensures content appears exactly as it will in the generated site.

---

## 🎯 Benefits

- Perfect for small communities, personal wikis, and knowledge sharing.
- Allows users to focus on content creation without worrying about backend setup or hosting.
- Provides a complete “site generator” experience directly in the browser.
- Minimal learning curve: Markdown is widely known and easy to use.

---

## ⚙️ Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for loading Marked.js library)

### Installation
1. Clone the repository:

```bash
git clone https://github.com/yourusername/enclyohub.git
```

2. Open `index.html` in your browser:

```bash
open index.html
```

3. Start creating your community wiki immediately.

> No additional setup or server is required.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🌟 Conclusion

Enclyohub is a lightweight yet powerful platform that allows anyone to create structured, visually appealing wiki communities entirely in their browser. Whether you want to maintain personal notes, build a collaborative knowledge base, or share a small community wiki, Enclyohub provides all the tools you need in a simple, elegant interface.

> Create, manage, and generate your wiki communities effortlessly — all in one browser.  
> Start building with Enclyohub today: [https://enclyohub.onrender.com/](https://enclyohub.onrender.com/)