import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Eye, 
  Map, 
  Navigation, 
  Code, 
  Layers, 
  Terminal, 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  FileText,
  BookOpen,
  Bot,
  Activity,
  Trophy,
  Users,
  Star,
  User,
  Youtube
} from 'lucide-react';

/**
 * UTILITIES
 */
const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * CUSTOM ASSETS
 * SVG for the Sliding Blue Robot (Matches uploaded image)
 */
const SlidingRobot = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    {/* Body/Head */}
    <rect x="4" y="8" width="16" height="12" rx="4" ry="4" />
    
    {/* Eyes (Vertical pills) */}
    <line x1="9" y1="12" x2="9" y2="16" />
    <line x1="15" y1="12" x2="15" y2="16" />
    
    {/* Antenna (L-shape) */}
    <path d="M12 8V4h3" />
    
    {/* Ear Nubs */}
    <line x1="2" y1="14" x2="4" y2="14" />
    <line x1="20" y1="14" x2="22" y2="14" />
  </svg>
);

/**
 * ANIMATED BACKGROUND COMPONENT
 * Simulates a Probabilistic Roadmap (PRM) / Graph-based SLAM
 */
const MotionPlanningBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];

    const particleCount = 70;
    const connectionDistance = 160;
    const mouseDistance = 220;

    let mouse = { x: null, y: null };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseDistance) {
            const force = (mouseDistance - distance) / mouseDistance;
            this.vx += (dx / distance) * force * 0.5;
            this.vy += (dy / distance) * force * 0.5;
          }
        }
      }

      draw() {
        ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14, 165, 233, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => { mouse.x = e.x; mouse.y = e.y; };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20" />;
};

/**
 * NAV BAR
 */
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Research', href: '#research' }, 
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Bot className="h-8 w-8 text-sky-500" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-sky-400 hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

/**
 * HERO SECTION
 */
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Profile Picture */}
        <div className="mb-10 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl">
                <img 
                    src="profile.jpg" 
                    alt="Tarannum Perween" 
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/400x400/0f172a/38bdf8?text=Tarannum";
                    }}
                />
            </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/30 border border-sky-700/50 text-sky-400 text-sm font-medium mb-8 animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          System Online: Minneapolis, MN
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Tarannum</span> Perween
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-6 font-light">
          Robotics Engineer | First year Master's student @UMN
        </p>

        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Specializing in <span className="text-sky-300">Perception</span>, <span className="text-emerald-300">Motion Planning</span>, and <span className="text-purple-300">Reinforcement Learning</span>. 
          Building intelligent systems that perceive, plan, and act in dynamic environments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="https://drive.google.com/file/d/1GQntm1snfH-0Pv5PlgzSrMENA8K0BaSX/view?usp=sharing" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-sky-400 hover:bg-sky-500 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            Resume
          </a>
          <div className="flex gap-4">
             <a href="https://github.com/tarannum-perween" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all">
                <Github size={24} />
             </a>
             <a href="https://linkedin.com/in/tarannum03" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all">
                <Linkedin size={24} />
             </a>
             <a href="https://www.youtube.com/@tarannumperween2302" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all">
                <Youtube size={24} />
             </a>
             <a href="mailto:perwe003@umn.edu" className="p-3 bg-slate-800 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-all">
                <Mail size={24} />
             </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
          <ChevronDown size={24} />
        </div>
      </div>
    </section>
  );
};

/**
 * SUMMARY SECTION
 * Modern "Mission Profile" Dashboard
 */
const Summary = () => {
  return (
    <section className="py-10 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Glow effect behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-emerald-500/10 blur-3xl -z-10 rounded-full opacity-20 transform scale-75"></div>
        
        <div className="relative group">
           {/* ROBOT ANIMATION STYLES */}
           <style>{`
             @keyframes patrol {
               0% { left: 0; top: 0; transform: translate(-50%, -85%); }
               45% { left: 100%; top: 0; transform: translate(-50%, -85%); }
               50% { left: 100%; top: 0; transform: translate(-50%, -85%) scaleX(-1); }
               95% { left: 0; top: 0; transform: translate(-50%, -85%) scaleX(-1); }
               100% { left: 0; top: 0; transform: translate(-50%, -85%) scaleX(1); }
             }
           `}</style>

           {/* RUNNING ROBOT CONTAINER */}
           <div className="absolute inset-0 pointer-events-none z-20">
             <div 
               className="absolute bg-slate-900/0 p-1 flex items-center justify-center text-sky-400"
               style={{
                 width: '42px',
                 height: '42px',
                 animation: 'patrol 10s linear infinite'
               }}
             >
               <SlidingRobot 
                 className="w-full h-full drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
               />
             </div>
           </div>

           {/* Main Card */}
           <div className="relative bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
             
             {/* Decorative elements */}
             <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Cpu className="text-sky-500 w-32 h-32 rotate-12" />
             </div>

             <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1 space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono tracking-widest uppercase">
                    <Activity size={12} />
                    Mission Profile
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white">
                     Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Agility</span>
                  </h3>
                  
                  <p className="text-slate-300 text-lg leading-relaxed">
                     I engineer autonomous systems that thrive in the <span className="text-white font-medium">unpredictable</span>. 
                     By fusing <span className="text-sky-400">visual perception</span> with <span className="text-emerald-400">robust planning algorithms</span>, 
                     I create robots capable of navigating complex terrains and interacting seamlessly with humans. 
                     My goal is to translate theoretical constraints into real-world <span className="text-purple-400">motion</span>.
                  </p>
               </div>
               
               {/* Stats Vertical Stack with Tech Look */}
               <div className="w-full md:w-auto flex flex-row md:flex-col gap-4 relative z-10">
                  
                  <div className="group flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all hover:border-sky-500/30 min-w-[200px]">
                     <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400 group-hover:scale-110 transition-transform">
                        <Briefcase size={20} />
                     </div>
                     <div>
                        <div className="text-2xl font-bold text-white">3+</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">Years R&D</div>
                     </div>
                  </div>

                  <div className="group flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all hover:border-emerald-500/30 min-w-[200px]">
                     <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                     </div>
                     <div>
                        <div className="text-2xl font-bold text-white">3</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">Papers</div>
                     </div>
                  </div>

               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * EDUCATION SECTION
 */
const Education = () => {
  const schools = [
    {
      degree: "M.S. in Robotics Engineering",
      school: "University of Minnesota - Twin Cities",
      year: "May 2027 (Expected)",
      details: "GPA: 3.89 / 4.00",
      focus: "Relevant Coursework: Machine Learning, Deep Learning, Intelligent Robotic Systems, Computer Vision, Software Engineering I",
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />
    },
    {
      degree: "B.Tech in Mechanical Engineering",
      school: "National Institute of Technology, Hamirpur",
      year: "May 2022",
      details: "GPA: 3.5 / 4.00",
      focus: "Foundation in Mechanics, Dynamics, and Control Systems",
      icon: <Award className="w-6 h-6 text-sky-400" />
    }
  ];

  return (
    <section id="education" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
          Education
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {schools.map((edu, index) => (
            <div key={index} className="group relative bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                {edu.icon}
              </div>
              <div className="text-sky-500 text-sm font-semibold mb-2">{edu.year}</div>
              <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
              <div className="text-slate-300 font-medium mb-2">{edu.school}</div>
              <div className="text-emerald-400 font-mono text-sm mb-4">{edu.details}</div>
              <p className="text-slate-500 text-sm border-l-2 border-slate-700 pl-3">
                {edu.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * EXPERIENCE SECTION
 */
const Experience = () => {
  const jobs = [
    {
      role: "Pre-doctoral Research Fellow",
      company: "TCS Research and Innovation",
      period: "Jun 2022 - May 2025",
      advisor: { name: "Dr. Titas Bera", link: "https://ieeexplore.ieee.org/author/37086181482" },
      description: "Designed a terrain-adaptive quadruped leg system in SOLIDWORKS to improve stability on uneven terrains. Engineered a scale-invariant neural network-based reward framework (SIRF) for reinforcement learning, validating performance using DDPG in OpenAI Gym.",
      tags: ["Reinforcement Learning", "Quadruped", "SolidWorks"]
    },
    {
      role: "Undergraduate Researcher",
      company: "Indian Institute of Technology, Delhi",
      period: "Mar 2022 - Jun 2022",
      advisor: { name: "Dr. Subir Kumar Saha", link: "https://sksaha.com/" },
      description: "Modeled a bipedal robot and developed ROS URDFs for push recovery simulation. Implemented RViz-based visualization pipelines to validate robust stability strategies.",
      tags: ["ROS1", "Gazebo", "URDF", "Biped"],
      link: "https://www.researchgate.net/publication/370210956_Development_of_URDF_of_a_Biped_Robot?channel=doi&linkId=64457131d749e4340e317fb0&showFulltext=true"
    },
    {
      role: "Undergraduate Researcher",
      company: "Indian Institute of Technology, Patna",
      period: "May 2021 - Aug 2021",
      advisor: { name: "Dr. Atul Thakur", link: "https://www.iitp.ac.in/~athakur/#profile-header" },
      description: "Investigated bio-inspired gait patterns for a lizard-like robot in V-REP. Enhanced climbing stability by implementing moment-based gait modifications, increasing wall hold time from <10s to >60s.",
      tags: ["V-REP", "Gait Analysis", "Python"],
      link: "https://www.youtube.com/watch?v=uF6rrBJzwWI"
    }
  ];

  return (
    <section id="experience" className="py-20 relative z-10 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
          Experience
        </h2>
        <div className="space-y-10">
          {jobs.map((job, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-slate-800 hover:border-emerald-500 transition-colors duration-300 group">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-slate-600 group-hover:border-emerald-500 transition-colors"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{job.role}</h3>
                <span className="text-slate-400 font-mono text-sm bg-slate-800/50 px-2 py-1 rounded border border-slate-700">{job.period}</span>
              </div>
              
              <div className="flex flex-col gap-1 mb-3">
                 <div className="text-lg text-slate-300 font-medium">{job.company}</div>
                 
                 {job.advisor && (
                   <div className="text-sm text-slate-400 flex items-center gap-2">
                     <span className="text-slate-500">Advisor:</span>
                     <a href={job.advisor.link} target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 group/advisor">
                        <User size={12} className="text-sky-500" />
                        {job.advisor.name}
                        <ExternalLink size={10} className="opacity-0 group-hover/advisor:opacity-100 transition-opacity" />
                     </a>
                   </div>
                 )}

                 {job.link && (
                    <a href={job.link} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-1">
                      <ExternalLink size={14} /> View Project
                    </a>
                 )}
              </div>

              <p className="text-slate-400 leading-relaxed max-w-4xl mb-4">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="text-xs text-emerald-500/80 bg-emerald-950/30 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * RESEARCH SECTION
 */
const Research = () => {
  const papers = [
    {
      title: "Inferring Reward Functions From State Transitions: A Deep Learning Approach",
      conference: "IEEE SMC 2024",
      tags: ["Deep Learning", "Reward Shaping"],
      icon: <Layers size={20} />,
      link: "https://ieeexplore.ieee.org/document/10832068"
    },
    {
      title: "Push Recovery of a Biped in Different Stance Scenarios",
      conference: "ASME JMR 2024",
      tags: ["Biped Locomotion", "Control"],
      icon: <Bot size={20} />,
      link: "https://doi.org/10.1115/1.4066443"
    },
    {
      title: "Modeling-based Approach for Crouch Gait",
      conference: "IEEE EMBC 2024",
      tags: ["Biomechanics", "Gait Analysis"],
      icon: <Briefcase size={20} />,
      link: "https://ieeexplore.ieee.org/document/10782914"
    },
    {
      title: "Development of URDF of a Biped Robot",
      conference: "IPROMM 2022",
      tags: ["Simulation", "URDF"],
      icon: <Code size={20} />,
      link: "https://www.researchgate.net/publication/370210956_Development_of_URDF_of_a_Biped_Robot"
    }
  ];

  return (
    <section id="research" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
          Research & Publications
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {papers.map((paper, index) => (
            <div key={index} className="bg-slate-900/80 border border-slate-800 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300 hover:bg-slate-900 flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 mt-1">
                  {paper.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-bold mb-1">
                    <BookOpen size={14} />
                    {paper.conference}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">{paper.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map(tag => (
                      <span key={tag} className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {paper.link && (
                <div className="mt-auto pt-4 border-t border-slate-800/50 pl-[52px]">
                   <a 
                     href={paper.link} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                   >
                      <ExternalLink size={14} className="group-hover:text-purple-400 transition-colors" /> 
                      Read Paper
                   </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * SKILLS SECTION
 */
const Skills = () => {
  const skillCategories = [
    {
      title: "Robotics & Planning",
      icon: <Map className="text-emerald-400" />,
      skills: ["ROS / ROS2", "MoveIt", "Nav2", "DDS", "URDF", "RViz", "Gazebo", "Trajectory Optimization"]
    },
    {
      title: "Languages",
      icon: <Code className="text-sky-400" />,
      skills: ["C++", "Python", "MATLAB", "SQL"]
    },
    {
      title: "Libraries & AI",
      icon: <Cpu className="text-purple-400" />,
      skills: ["PyTorch", "TensorFlow", "OpenCV", "Keras", "Scikit-learn", "NumPy", "MediaPipe", "OpenAI Gym"]
    },
    {
      title: "Tools & Sim",
      icon: <Terminal className="text-orange-400" />,
      skills: ["Isaac Sim", "MuJoCo", "V-REP", "OpenSim", "Hugging Face", "COLMAP", "Linux", "Git"]
    }
  ];

  return (
    <section id="skills" className="py-20 relative z-10 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-colors duration-300 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-900 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="font-bold text-slate-200">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                    <span className="text-slate-400 text-sm hover:text-white transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * PROJECTS SECTION
 */
const Projects = () => {
  const projects = [
    {
      title: "Task Level Motion Planning (Multi-Arm)",
      tech: ["ROS1", "MoveIt", "Python", "MTC"],
      desc: "Developed a framework for multi-arm robot manipulation using MoveIt Task Constructor (MTC). Focused on complex pick-and-place and collaborative structure-building tasks.",
      color: "border-sky-500",
      // Updated URL for GIF-like behavior: Autoplay, Mute, No Controls, Loop
      demo: "https://www.youtube.com/embed/kEZwV0-wEZ0?autoplay=1&mute=1&controls=0&loop=1&playlist=kEZwV0-wEZ0&rel=0&modestbranding=1&showinfo=0",
      link: "https://github.com/tarannum-perween/Final_year_project"
    },
    {
      title: "Gesture-Guided Assistive Robot",
      tech: ["ROS2", "Computer Vision", "Keypoints"],
      desc: "Built a one-shot gesture recognition pipeline using pose keypoints. Enabled real-time closed-loop human-robot interaction with 80% classification accuracy.",
      color: "border-emerald-500",
      demo: "gesture-guided.gif",
      link: "https://github.com/tarannum-perween/Gesture-Guided-Assistive-Robot-Using-One-Shot-Gesture-Recognition"
    },
    {
      title: "Vision-Based 3D Perception Pipeline (Monocular)",
      tech: ["Python", "SfM", "RANSAC", "SIFT"],
      desc: "Developed a monocular Structure-from-Motion pipeline. Used SIFT features and multi-view triangulation to generate 3D point clouds from a single calibrated camera.",
      color: "border-purple-500",
      demo: "POINT_CLOUD.png",
      link: "https://github.com/tarannum-perween/CSCI5561_FinalProject"
    },
    {
      title: "Traffic Sign Recognition",
      tech: ["CNN", "Deep Learning", "OpenCV"],
      desc: "Trained a high-accuracy (96%) Convolutional Neural Network for traffic sign classification. Implemented data augmentation and preprocessing for robust real-world inference.",
      color: "border-orange-500",
      demo: "traffic_sign_classification.webp",
      link: "https://github.com/tarannum-perween/Traffic_sign_recognition"
    },
    {
      title: "Obstacle Avoidance Robot",
      tech: ["Arduino", "LiDAR", "Path Planning"],
      desc: "Built an autonomous mobile robot with ultrasonic and LiDAR sensors. Complemented with custom path-planning algorithms for smooth navigation in cluttered environments.",
      color: "border-pink-500",
      // Corrected relative path format and added fallback logic in render
      demo: "Obs_avoid.jpg",
      link: "https://placehold.co/600x340/0f172a/ec4899?text=Obstacle+Avoidance+Demo"
    },
    {
      title: "Line Following Drone",
      tech: ["CoppeliaSim", "Lua", "Computer Vision"],
      desc: "Developed a line-following drone simulation in CoppeliaSim (V-REP). Integrated line detection algorithms to enable autonomous navigation along a designated path.",
      color: "border-cyan-500",
      demo: "Line_Following_Drone_project_using_CoppeliaSim.gif",
      link: "https://github.com/tarannum-perween/Line-Following-Drone"
    },
    {
      title: "Writing Robot Simulation",
      tech: ["CoppeliaSim", "Lua", "Kinematics"],
      desc: "Created a robotic writing system using the ABB IRB 140 arm. Programmed precise kinematics and trajectory planning for accurate writing tasks on a virtual table.",
      color: "border-indigo-500",
      demo: "Writing_robot_simulation.gif",
      link: "https://github.com/tarannum-perween/Writing-Robot-Simulation"
    },
    {
      title: "Defensive Bot for Robowar",
      tech: ["Robotics Hardware", "Strategy", "C++"],
      desc: "Designed and constructed a competitive robotic defense system for NIMBUS 2019. Focused on defensive maneuvers in dynamic environments, securing 3rd place.",
      color: "border-rose-500",
      demo: "https://placehold.co/600x340/0f172a/f43f5e?text=Robowar+Defense+Bot",
      link: null
    }
  ];

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
          Key Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className={`group bg-slate-900 border-t-4 ${project.color} border-x border-b border-slate-800 rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl hover:shadow-slate-900/50 flex flex-col`}>
              
              {/* Demo GIF/Video Container */}
              <div className="relative h-48 overflow-hidden border-b border-slate-800 bg-slate-950">
                {project.demo.includes('youtube.com') ? (
                  <div className="w-full h-full pointer-events-none"> {/* Block interaction to simulate GIF */}
                    <iframe 
                      src={project.demo} 
                      className="w-full h-full scale-[1.35]" /* Slight zoom to hide YouTube UI edges */
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Loading placeholder */}
                    <img 
                      src={project.demo} 
                      alt={`${project.title} Demo`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        e.target.onerror = null; 
                        // Updated fallback text to be more helpful
                        e.target.src = `https://placehold.co/600x340/0f172a/64748b?text=Add+${project.demo}+to+Public+Folder`;
                      }}
                    />
                    {/* Gradient Overlay for better text readability if titles overlap */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                  </>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Layers className="text-slate-500 group-hover:text-white transition-colors" />
                  <div className="flex gap-2">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer">
                        <ExternalLink size={18} className="text-slate-500 hover:text-white cursor-pointer" />
                      </a>
                    ) : (
                      <ExternalLink size={18} className="text-slate-500 cursor-not-allowed opacity-50" />
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * EXTRACURRICULARS SECTION
 */
const Achievements = () => {
  const list = [
    { 
      text: "Secure 3rd Place in Robowar 2k19, held at NIT Hamirpur.", 
      icon: <Trophy className="text-yellow-500" size={24} /> 
    },
    { 
      text: "Achieved a commendable 37th place in a coding challenge hosted by Coding Ninjas", 
      icon: <Code className="text-sky-500" size={24} /> 
    },
    { 
      text: "Ranked among the top 100 participants in the National Engineering Olympiad 2.0 in May 2020.", 
      icon: <Award className="text-emerald-500" size={24} /> 
    },
    { 
      text: "Technical Head of Institute’s Robotics Society Robosoc", 
      icon: <Users className="text-purple-500" size={24} /> 
    }
  ];

  return (
    <section id="achievements" className="py-20 relative z-10 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
          Extracurriculars & Achievements
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((item, index) => (
            <div key={index} className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex items-start gap-4 hover:border-yellow-500/30 transition-colors duration-300">
              <div className="p-3 bg-slate-900 rounded-lg shrink-0">
                {item.icon}
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * FOOTER
 */
const Footer = () => {
  return (
    <footer id="contact" className="py-12 border-t border-slate-800 bg-slate-950 relative z-10 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Let's Connect</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Based in Minneapolis, MN. I’m always open to collaborations or thoughtful discussions - whether about Robotics, research, or anything beyond.
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <a href="mailto:perwe003@umn.edu" className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Mail size={24} />
          </a>
          <a href="https://linkedin.com/in/tarannum03" target="_blank" rel="noreferrer" className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/tarannum-perween" target="_blank" rel="noreferrer" className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Github size={24} />
          </a>
        </div>
        <div className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Tarannum Perween.
        </div>
      </div>
    </footer>
  );
};

/**
 * MAIN APP COMPONENT
 */
const App = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-sky-500/30 font-sans">
      <MotionPlanningBackground />
      <NavBar />
      <main>
        <Hero />
        <Summary />
        <Education />
        <Experience />
        <Research />
        <Skills />
        <Projects />
        <Achievements />
      </main>
      <Footer />
    </div>
  );
};

export default App;
