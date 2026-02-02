Tarannum Perween - Robotics Portfolio

A dynamic, single-page personal research portfolio for a Robotics Engineer, built with React (Vite) and Tailwind CSS. It features an animated perception-graph background, interactive project demos, and a responsive timeline of research and experience.

🚀 Quick Start

Prerequisites

Node.js 18+ installed on your machine.

A code editor (VS Code recommended).

Local Development

Clone the repository (or download the source code):

git clone [https://github.com/tarannum-perween/robotics-portfolio.git](https://github.com/tarannum-perween/robotics-portfolio.git)
cd robotics-portfolio



Install Dependencies:

npm install



Start Development Server:

npm run dev



Visit: http://localhost:5173

📁 Project Structure

/
├── public/                   # Static assets (images, GIFs, PDFs)
│   ├── profile.jpg           # Profile picture
│   ├── gesture-guided.gif    # Project demos
│   └── ...
├── src/
│   ├── App.jsx               # Main portfolio code (Content resides here)
│   ├── index.css             # Tailwind CSS directives
│   └── main.jsx              # React entry point
├── package.json              # Project dependencies & scripts
└── vite.config.js            # Vite configuration



✏️ Updating Content

Unlike static site generators that use separate Markdown files, this portfolio is a focused Single Page Application. Content is managed directly within the component state for maximum flexibility.

Experience & Education

To add a new role, open src/App.jsx and locate the Experience or Education component. Add a new object to the data array:

{
  role: "New Position",
  company: "Organization Name",
  period: "Dates",
  description: "Description of your work...",
  tags: ["Skill 1", "Skill 2"]
}



Projects

To add a new project, locate the Projects component in src/App.jsx and add to the projects array:

{
  title: "New Robot Project",
  tech: ["ROS2", "Python"],
  desc: "Project description...",
  color: "border-sky-500", // Tailwind border color class
  demo: "/path-to-gif-in-public-folder.gif",
  link: "[https://github.com/your-repo](https://github.com/your-repo)"
}



🚀 Deployment

GitHub Pages (Automated)

This project is configured for easy deployment to GitHub Pages using the gh-pages package.

Update package.json:
Ensure the homepage field matches your GitHub URL:

"homepage": "[https://tarannum-perween.github.io/robotics-portfolio](https://tarannum-perween.github.io/robotics-portfolio)",



Deploy:
Run the deployment script in your terminal:

npm run deploy



This command builds the project and pushes the dist folder to a gh-pages branch on your repository.

Access:
Your portfolio will be live at https://tarannum-perween.github.io/robotics-portfolio.

🛠️ Technologies

Framework: React (Vite)

Styling: Tailwind CSS

Icons: Lucide React

Animation: Custom HTML5 Canvas (Motion Planning Background), CSS Keyframes

Deployment: GitHub Pages

📧 Contact

Email: perwe003@umn.edu

LinkedIn: Profile

GitHub: tarannum-perween

YouTube: Channel

Website: tarannum-perween.github.io/robotics-portfolio
