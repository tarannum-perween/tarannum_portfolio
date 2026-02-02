# 🤖 Tarannum Perween – Robotics Portfolio

A dynamic, single-page **research and engineering portfolio** built with **React (Vite)** and **Tailwind CSS**.  
This site showcases robotics, perception, and autonomous systems projects through an animated motion-planning background, interactive demos, and a responsive timeline of research and experience.

---

## 🚀 Live Demo

🔗 **Portfolio:**  
https://tarannum-perween.github.io/robotics-portfolio

---

## ✨ Features

- Animated **perception / motion-planning canvas background**
- Interactive **project cards with demo GIFs**
- Responsive **research & experience timeline**
- Mobile-friendly, fast, and lightweight
- Easy content updates directly from source code

---

## 🛠️ Tech Stack

- **Framework:** React (Vite)  
- **Styling:** Tailwind CSS  
- **Icons:** Lucide React  
- **Animation:** HTML5 Canvas + CSS Keyframes  
- **Deployment:** GitHub Pages  

---

## 📦 Prerequisites

Make sure you have:

- **Node.js 18+**
- **npm**
- A code editor (VS Code recommended)

---

## ⚡ Quick Start

### Clone the Repository

```bash
git clone https://github.com/tarannum-perween/robotics-portfolio.git
cd robotics-portfolio
Install Dependencies
npm install
Run Development Server
npm run dev
Open in your browser:

http://localhost:5173
📁 Project Structure
/
├── public/                   # Static assets (images, GIFs, PDFs)
│   ├── profile.jpg          # Profile picture
│   ├── gesture-guided.gif  # Project demos
│   └── ...
├── src/
│   ├── App.jsx             # Main portfolio logic & content
│   ├── index.css          # Tailwind CSS directives
│   └── main.jsx          # React entry point
├── package.json           # Dependencies & scripts
└── vite.config.js        # Vite configuration
✏️ Updating Content
This portfolio is a single-page React app, not a static Markdown site.
All content lives inside src/App.jsx for full flexibility.

Experience & Education
Find the Experience or Education data array and add a new entry:

{
  role: "New Position",
  company: "Organization Name",
  period: "Dates",
  description: "Description of your work...",
  tags: ["Skill 1", "Skill 2"]
}
Projects
Find the projects array and add a new project:

{
  title: "New Robot Project",
  tech: ["ROS2", "Python"],
  desc: "Project description...",
  color: "border-sky-500",
  demo: "/demo.gif", // Place file in /public
  link: "https://github.com/your-repo"
}
🚀 Deployment (GitHub Pages)
This project uses the gh-pages package for automated deployment.

1. Update package.json
Make sure your homepage field matches your repo:

"homepage": "https://tarannum-perween.github.io/robotics-portfolio"
2. Deploy
npm run deploy
This will:

Build the project

Push the dist/ folder to the gh-pages branch

Publish your site automatically

---

## 🌐 Access

🔗 **Live Site:**  
https://tarannum-perween.github.io/robotics-portfolio

---

## 📬 Contact

- **Email:** [perwe003@umn.edu](mailto:perwe003@umn.edu)  
- **LinkedIn:** [https://www.linkedin.com](https://www.linkedin.com)  
- **GitHub:** [https://github.com/tarannum-perween](https://github.com/tarannum-perween)  
- **YouTube:** [https://www.youtube.com](https://www.youtube.com)  
- **Website:** [https://tarannum-perween.github.io/robotics-portfolio](https://tarannum-perween.github.io/robotics-portfolio)

