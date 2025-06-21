import React, { useState, useEffect, useRef } from 'react';
import {
  Briefcase,
  GitPullRequest,
  BookOpen,
  Award,
  MessageSquare,
  Users,
  Code,
  Laptop,
  Mail,
  Linkedin,
  Github,
  Phone,
  ArrowRight, // Used for bullet points and links
  Loader2, // For the spinner icon
  User // <--- Added User icon import
} from 'lucide-react';
import Chart from 'chart.js/auto';

const App = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const experienceChartRef = useRef(null);
  const skillsChartRef = useRef(null);
  const chartInstanceExperience = useRef(null);
  const chartInstanceSkills = useRef(null);

  const resumeData = {
    contact: {
      phone: "+91 9310451799",
      email: "matasha093@gmail.com",
      location: "New Delhi, 110089. India",
      linkedin: "www.linkedin.com/in/natasha-robinson-29abb517a",
      github: "https://github.com/Natasha-cyber777"
    },
    // Split the summary into two parts for the cards
    summaryPart1: "Results-driven Full Stack Software Engineer specializing in AI-powered Blockchain and FinTech solutions. As the Lead Developer of the Mango personal finance assistant and architect of the cutting-edge Nexus Router, I design and build intelligent, real-time applications using Python (FastAPI), React.js, Web3.py, and Generative AI (LLMs).",
    summaryPart2: "Proven ability to optimize complex decentralized financial processes through data-driven insights and create highly scalable, user-centric digital products. Eager to contribute to innovative projects at the intersection of finance and technology.",
    skills: {
      techStack: [
        { name: "React.js", proficiency: 90 },
        { name: "JavaScript", proficiency: 95 },
        { name: "Firebase", proficiency: 85 },
        { name: "Python", proficiency: 90 },
        { name: "HTML", proficiency: 95 },
        { name: "CSS", proficiency: 90 },
        { name: "MySQL", proficiency: 75 },
        { name: "Git", proficiency: 85 },
        { name: "Power Automate", proficiency: 70 },
        { name: "FastAPI", proficiency: 80 },
        { name: "Web3.py", proficiency: 80 },
        { name: "Streamlit", proficiency: 75 },
        { name: "Google Gemini API", proficiency: 85 },
        { name: "LLMs", proficiency: 85 },
        { name: "httpx", proficiency: 70 },
        { name: "asyncio", proficiency: 70 },
        { name: "Pydantic", proficiency: 70 }
      ],
      frontend: ["JavaScript", "HTML", "CSS", "React.js", "Streamlit"],
      backend: ["Firebase", "PHP", "Python", "FastAPI", "Web3.py"],
      blockchainWeb3: ["EVM-compatible Blockchains", "Decentralized Finance (DeFi)", "Gas Optimization"],
      tools: ["WordPress", "Power Automate"],
      programmingLanguages: ["Java", "Python"],
      database: ["MySQL"],
      concepts: ["Robotic Process Automation", "Machine Learning"],
      generativeAI: ["LLM Integration", "Prompt Engineering"]
    },
    experience: [
      {
        title: "Web3 Developer | Blockchain Developer",
        company: "Nexus - Intelligent Cross-Chain Transaction Optimizer",
        dates: "June 2025 - Present",
        description: [
          "Engineered an AI-powered FastAPI backend for real-time, cross-chain transaction optimization across major EVM networks.",
          "Integrated Web3.py and CoinGecko API for live gas/token data, enabling precise USD cost estimations.",
          "Utilized Google Gemini API to provide transparent, natural language explanations for routing recommendations.",
          "Built an intuitive Streamlit dashboard for visualizing real-time blockchain metrics and recommendations."
        ]
      },
      {
        title: "FinTech Software Developer",
        company: "Mango - A Personal Finance Assistant (MVP)",
        dates: "January 2025 - June 2025",
        description: [
          "Spearheaded the complete product lifecycle from concept to launch for Mango, a personal finance web application.",
          "Engineered a robust full-stack MVP using cutting-edge React.js, JavaScript, and Firebase.",
          "Successfully delivered a market-ready solution that establishes a scalable foundation."
        ],
        link: "https://mango-bcf17.web.app/"
      },
      {
        title: "Web App Developer",
        company: "Nutrition Trends - Dual CRM",
        dates: "March 2025 - May 2025",
        description: [
          "Developed and deployed a robust dual CRM web application tailored for dieticians and their clients.",
          "Engineered highly responsive and intuitive interfaces that optimized data exchange and communication.",
          "Leveraged React, Firebase and JavaScript to create a scalable platform that enhances service delivery and client engagement."
        ],
        link: "https://nutrition-trends.web.app/"
      },
      {
        title: "Robotic Process Automation Intern",
        company: "PrishiTech Solutions Pvt. Ltd.",
        dates: "Jun 2023 - Jul 2023",
        description: [
          "Focused on improving company productivity by implementing robotic process automation.",
          "Utilized Power Automate to automate repetitive procedures.",
          "Gained valuable knowledge of a formal office workplace."
        ]
      }
    ],
    projects: [
      {
        name: "AI for Climate Change",
        role: "Data Team Volunteer",
        description: "Volunteered at United Nations Online Volunteer platform as part of the data team for the project.",
        type: "Volunteer"
      },
      {
        name: "Web Developer Intern",
        company: "Dischh Marketing",
        description: "Worked as a web developer intern at Dischh Marketing.",
        type: "Internship"
      },
      {
        name: "Loan Default Prediction Using Machine Learning",
        type: "Research Paper",
        description: "Research paper published at the 2024 ICRITO Conference by IEEE, paper ID-1121."
      }
    ],
    education: [
      {
        institution: "Amity University",
        dates: "2021-2024",
        degree: "Bachelor's Degree in Computer Applications",
        grade: "8.78 (CGPA)"
      },
      {
        institution: "Holy Child School",
        dates: "2018-2020",
        degree: "High School Diploma",
        grade: "86.25% (XII), 92.8% (X)"
      }
    ],
    certifications: [
      {
        name: "Blockchain And Its Applications",
        issuer: "Swayam, NPTEL Course",
        year: "2024"
      },
      {
        name: "UI/UX",
        issuer: "Amity University",
        year: "2022"
      },
      {
        name: "French Language",
        issuer: "Internshala, Amity University",
        year: "2021-2024"
      }
    ],
    languages: [
      { name: "English", proficiency: "Proficient (C2)" },
      { name: "French", proficiency: "Basic (A2)" }
    ],
    softSkills: [
      "Team Work", "Adaptability", "Problem Solving",
      "Communication Skills", "Leadership", "Creative Thinking", "Time Management"
    ]
  };

  const calculateDurationInMonths = (dates) => {
    const [start, end] = dates.split(' - ').map(s => s.trim());
    if (!start) return 0;

    const parseDate = (dateStr) => {
      if (dateStr.toLowerCase() === 'present') {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
      }
      const [monthStr, yearStr] = dateStr.split(' ');
      const monthNum = new Date(Date.parse(monthStr + " 1, 2000")).getMonth(); // Get month number from name
      return new Date(parseInt(yearStr), monthNum, 1);
    };

    const startDate = parseDate(start);
    const endDate = parseDate(end);

    const diffYears = endDate.getFullYear() - startDate.getFullYear();
    const diffMonths = endDate.getMonth() - startDate.getMonth();
    return diffYears * 12 + diffMonths + 1;
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    // Cleanup function for the timer
    return () => clearTimeout(timer);
  }, []); // Run only once on mount for the loading screen

  useEffect(() => {
    if (!isLoading) { // Only initialize charts once loading is complete
      if (chartInstanceExperience.current) {
        chartInstanceExperience.current.destroy();
      }
      if (chartInstanceSkills.current) {
          chartInstanceSkills.current.destroy();
      }

      const experienceDurations = resumeData.experience.map(exp => calculateDurationInMonths(exp.dates));
      const experienceLabels = resumeData.experience.map(exp => {
          const title = exp.title.length > 20 ? exp.title.substring(0, 17) + '...' : exp.title;
          const company = exp.company.length > 20 ? exp.company.substring(0, 17) + '...' : exp.company;
          return `${title} at ${company}`;
      });

      chartInstanceExperience.current = new Chart(experienceChartRef.current, {
          type: 'bar',
          data: {
              labels: experienceLabels.map(label => {
                  const words = label.split(' ');
                  let lines = [];
                  let currentLine = '';
                  words.forEach(word => {
                      if ((currentLine + word).length <= 16) {
                          currentLine += (currentLine ? ' ' : '') + word;
                      } else {
                          lines.push(currentLine);
                          currentLine = word;
                      }
                  });
                  lines.push(currentLine);
                  return lines;
              }),
              datasets: [{
                  label: 'Duration (Months)',
                  data: experienceDurations,
                  backgroundColor: '#B19468', // Medium Beige/Tan Accent
                  borderColor: '#8A714C', // Darker Beige/Tan
                  borderWidth: 1,
                  borderRadius: 4
              }]
          },
          options: {
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                  legend: {
                      display: false
                  },
                  tooltip: {
                      callbacks: {
                          title: function(context) {
                              return resumeData.experience[context[0].dataIndex].title + ' at ' + resumeData.experience[context[0].dataIndex].company;
                          },
                          label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                  label += ': ';
                              }
                              label += context.parsed.x + ' months';
                              return label;
                          }
                      }
                  },
                  title: {
                      display: true,
                      text: 'Professional Experience Durations',
                      font: {
                          size: 16,
                          weight: 'bold'
                      },
                      color: '#2D395E' // Dark Blue/Navy Text
                  }
              },
              scales: {
                  x: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: 'Months',
                          color: '#B19468' // Medium Beige/Tan
                      },
                      ticks: {
                          color: '#B19468' // Medium Beige/Tan
                      },
                      grid: {
                          color: 'rgba(45, 57, 94, 0.1)' // Soft grid lines from Dark Blue/Navy
                      }
                  },
                  y: {
                      ticks: {
                          color: '#B19468' // Medium Beige/Tan
                      },
                      grid: {
                          color: 'rgba(45, 57, 94, 0.1)' // Soft grid lines from Dark Blue/Navy
                      }
                  }
              }
          }
      });

      const skillLabels = resumeData.skills.techStack.map(skill => skill.name);
      const skillProficiencyData = resumeData.skills.techStack.map(skill => skill.proficiency);

      chartInstanceSkills.current = new Chart(skillsChartRef.current, {
          type: 'radar',
          data: {
              labels: skillLabels.map(label => {
                  const words = label.split(' ');
                  let lines = [];
                  let currentLine = '';
                  words.forEach(word => {
                      if ((currentLine + word).length <= 16) {
                          currentLine += (currentLine ? ' ' : '') + word;
                      } else {
                          lines.push(currentLine);
                          currentLine = word;
                      }
                  });
                  lines.push(currentLine);
                  return lines;
              }),
              datasets: [{
                  label: 'Proficiency',
                  data: skillProficiencyData,
                  backgroundColor: 'rgba(219, 205, 175, 0.3)', // Light Beige with transparency
                  borderColor: '#DBCDAF', // Light Beige
                  borderWidth: 2,
                  pointBackgroundColor: '#B19468', // Medium Beige/Tan points
                  pointBorderColor: '#EDE7DB', // Cream/Off-white border
                  pointHoverBackgroundColor: '#EDE7DB',
                  pointHoverBorderColor: '#B19468'
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                  legend: {
                      display: false
                  },
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                  label += ': ';
                              }
                              label += context.parsed.r + '%';
                              return label;
                          }
                      }
                  },
                  title: {
                      display: true,
                      text: 'Technical Skill Proficiency',
                      font: {
                          size: 16,
                          weight: 'bold'
                      },
                      color: '#2D395E' // Dark Blue/Navy Text
                  }
              },
              scales: {
                  r: {
                      beginAtZero: true,
                      min: 0,
                      max: 100,
                      pointLabels: {
                          color: '#B19468', // Medium Beige/Tan
                          font: {
                              size: 10
                          }
                      },
                      grid: {
                          color: 'rgba(45, 57, 94, 0.2)' // Soft grid lines from Dark Blue/Navy
                      },
                      angleLines: {
                          color: 'rgba(45, 57, 94, 0.3)' // Soft angle lines from Dark Blue/Navy
                      },
                      ticks: {
                          display: false
                      }
                  }
              }
          }
      });
    }


    return () => {
      if (chartInstanceExperience.current) {
        chartInstanceExperience.current.destroy();
      }
      if (chartInstanceSkills.current) {
        chartInstanceSkills.current.destroy();
      }
    };
  }, [isLoading, resumeData]); // Rerun effect when isLoading changes

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`w-full md:w-auto px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-colors duration-300 ${
        activeSection === id ? 'bg-[#B19468] text-white shadow-md' : 'text-[#EDE7DB] hover:bg-[#DBCDAF] hover:text-[#2D395E]' // Nav text light, hover bg light beige, hover text dark navy
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  const ListItemWithIcon = ({ children }) => (
    <li className="flex items-start space-x-2">
      <ArrowRight className="flex-shrink-0 w-4 h-4 text-[#B19468] mt-1" /> {/* Medium Beige/Tan icon */}
      <span className="text-[#2D395E]">{children}</span> {/* Dark Blue/Navy text */}
    </li>
  );

  const ExperienceItem = ({ title, company, dates, description, link }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="card p-6 mb-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl font-bold text-[#2D395E] flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span>{title} <span className="font-medium text-[#B19468] block sm:inline">at {company}</span></span> {/* Medium Beige/Tan text */}
          <span className="text-sm font-normal text-[#666666] mt-1 sm:mt-0">{dates}</span> {/* Muted Text */}
        </h3>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <ul className="list-none text-[#2D395E] space-y-1 mb-3 pl-0">
            {description.map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <ArrowRight className="flex-shrink-0 w-4 h-4 text-[#B19468] mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#B19468] hover:underline font-medium"> {/* Medium Beige/Tan links */}
              View Project <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          )}
        </div>
      </div>
    );
  };

  const ProjectItem = ({ name, type, description, link }) => {
    return (
      <div className="card p-6">
        <h3 className="text-xl font-bold text-[#2D395E] mb-2">{name} {type && <span className="text-sm font-medium text-[#B19468]">({type})</span>}</h3> {/* Medium Beige/Tan */}
        <p className="text-[#2D395E] mb-3">{description}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#B19468] hover:underline font-medium">
            View Details <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#EDE7DB] text-[#2D395E] font-roboto overflow-x-hidden">
      <style>{`
        /* Chosen Palette: Classic Blue Pantone Color Palette */
        /* Cream/Off-white: #EDE7DB */
        /* Light Beige: #DBCDAF */
        /* Medium Beige/Tan: #B19468 */
        /* Dark Blue/Navy: #2D395E */

        /* Main Background & Cards: #EDE7DB */
        /* Header & Footer Backgrounds: #2D395E */
        /* Summary Section Background: #2D395E */
        /* Skills & Contact Sections Backgrounds: #DBCDAF */
        /* Other Sections Backgrounds: #EDE7DB */

        /* Primary Text: #2D395E (on light backgrounds) */
        /* Primary Text (on dark backgrounds): #EDE7DB */
        /* Secondary Text: #B19468 (on light backgrounds) */
        /* Secondary Text (on dark backgrounds): #DBCDAF */
        /* Muted Text: #666666 (fallback for palette gaps), #888888 */
        /* Accent Color (Headings, Initials, Chart Bars, Active Nav): #B19468 */
        /* Link/Interactive Accent: #B19468, hover #DBCDAF */
        /* Bullet Icons: ArrowRight (#B19468) */

        .font-roboto { font-family: 'Roboto', sans-serif; }
        .card {
            background-color: #EDE7DB; /* Cream/Off-white for cards */
            border-radius: 0.75rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.06);
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 300px; /* Reduced max-width for charts on small screens */
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            max-height: 400px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 350px;
                max-width: 600px; /* Wider for larger screens */
            }
        }
        /* Specific mobile adjustments for text wrapping and sizing */
        @media (max-width: 640px) {
            .text-lg.leading-relaxed { /* Adjusted for general text */
                font-size: 0.95rem; /* Smaller body text on very small screens */
            }
            .text-xl.font-bold.flex-col.sm\:flex-row { /* Adjusted for general headings */
                font-size: 1.1rem; /* Smaller experience titles on mobile */
            }
            .list-none.space-y-1.pl-0 li span { /* Adjusted for list item text */
                font-size: 0.85rem; /* Smaller list items on mobile */
            }
            .text-xl.font-semibold { /* Adjusted for general subheadings */
                font-size: 1.05rem; /* Smaller subheading on mobile */
            }
            .px-4.py-2.rounded-md.flex.items-center.justify-center.space-x-2 span { /* Adjusted for nav item text */
                font-size: 0.8rem; /* Smaller nav item text on mobile */
            }
            /* Adjust chart font sizes for very small screens if needed, although Chart.js scales dynamically */
            .chart-container canvas {
                font-size: 0.75rem; /* Example: smaller chart labels */
            }
        }
        /* Loading screen specific styles */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #EDE7DB; /* Cream/Off-white from palette */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000; /* Ensure it's on top */
            transition: opacity 0.5s ease-out; /* Smooth transition */
        }
        .loading-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-top: 4px solid #2D395E; /* Dark Blue/Navy for spinner */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .loading-text {
            margin-top: 1rem;
            font-size: 1.25rem;
            font-weight: bold;
            color: #2D395E; /* Dark Blue/Navy for text */
        }
      `}</style>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your resume...</p>
        </div>
      )}

      {!isLoading && (
        <>
          <header className="fixed w-full bg-[#2D395E] shadow-lg z-50"> {/* Dark Blue/Navy for header */}
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
              {/* Replaced H1 text with logo image */}
              <img src="images/logo.png" alt="Natasha Robinson Logo" className="h-10 w-auto object-contain" />
              <div className="hidden md:flex space-x-4">
                <NavItem id="summary" label="Summary" icon={User} />
                <NavItem id="skills" label="Skills" icon={Code} />
                <NavItem id="experience" label="Experience" icon={Briefcase} />
                <NavItem id="projects" label="Projects" icon={GitPullRequest} />
                <NavItem id="education" label="Education" icon={BookOpen} />
                <NavItem id="contact" label="Contact" icon={Mail} />
              </div>
              <button id="mobile-menu-button" className="md:hidden text-[#EDE7DB] focus:outline-none" onClick={() => {
                document.getElementById('mobile-nav').classList.toggle('hidden');
              }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </nav>
            <div id="mobile-nav" className="hidden md:hidden bg-[#2D395E] shadow-lg py-2"> {/* Dark Blue/Navy for mobile nav */}
                <div className="flex flex-col space-y-2 px-4">
                    <NavItem id="summary" label="Summary" icon={User} />
                    <NavItem id="skills" label="Skills" icon={Code} />
                    <NavItem id="experience" label="Experience" icon={Briefcase} />
                    <NavItem id="projects" label="Projects" icon={GitPullRequest} />
                    <NavItem id="education" label="Education" icon={BookOpen} />
                    <NavItem id="contact" label="Contact" icon={Mail} />
                </div>
            </div>
          </header>

          <main className="pt-20">
            <section id="summary" className="py-24 bg-[#2D395E]"> {/* Dark Blue/Navy for Summary Section */}
              <div className="container mx-auto px-4 text-center"> {/* Centered content */}
                <div className="flex flex-col items-center space-y-8"> {/* Adjusted layout for clarity */}
                  {/* Profile Circle with Logo */}
                  <div className="flex-shrink-0">
                    {/* Replaced initial circle with logo image, using the provided path */}
                    <img src="images/logo.png" alt="Natasha Robinson Logo" className="w-40 h-40 rounded-full object-cover shadow-xl p-2 bg-[#EDE7DB]" /> {/* Added padding and background for visibility */}
                  </div>
                  
                  {/* Name and Title */}
                  <div className="w-full"> {/* Full width for text alignment, now text-center on parent */}
                    <h2 className="text-4xl font-extrabold mb-2 text-[#EDE7DB]">Natasha Robinson</h2> {/* Cream/Off-white text */}
                    <p className="text-xl font-semibold text-[#DBCDAF] mb-4">FinTech Software Engineer (Blockchain/Crypto Focus) / AI/ML Applications Engineer</p> {/* Light Beige text */}
                  </div>
                </div>

                {/* Summary Paragraph Card 1 */}
                <div className="card bg-[#EDE7DB] p-6 shadow-lg rounded-lg mt-8 mx-auto max-w-4xl text-left"> {/* Cream/Off-white card, centered, max width, text-left inside */}
                  <p className="text-lg text-[#2D395E] leading-relaxed">{resumeData.summaryPart1}</p> {/* Dark Blue/Navy text */}
                </div>

                {/* Summary Paragraph Card 2 */}
                <div className="card bg-[#EDE7DB] p-6 shadow-lg rounded-lg mt-4 mx-auto max-w-4xl text-left"> {/* Cream/Off-white card, centered, max width, text-left inside */}
                  <p className="text-lg text-[#2D395E] leading-relaxed">{resumeData.summaryPart2}</p> {/* Dark Blue/Navy text */}
                </div>
              </div>
            </section>

            <section id="skills" className="py-12 bg-[#DBCDAF]"> {/* Light Beige background */}
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#2D395E]">My Skills</h2> {/* Dark Blue/Navy Text */}
                <p className="text-center text-[#B19468] mb-8 max-w-2xl mx-auto">This section highlights my technical and soft skills, providing a comprehensive overview of my capabilities as a developer and team member. The charts below offer a quick visual summary of my key technical proficiencies.</p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Tech Stack Proficiency Card */}
                    <div className="card p-6">
                        <h3 className="text-2xl font-bold text-[#B19468] mb-4 flex items-center"><Laptop className="w-6 h-6 mr-2" /> Tech Stack Proficiency</h3> {/* Medium Beige/Tan heading */}
                        <div className="chart-container"> {/* Now using updated max-width from style block */}
                            <canvas ref={skillsChartRef}></canvas>
                        </div>
                    </div> 
                    {/* Key Development Areas Card */}
                    <div className="card p-6">
                        <h3 className="text-2xl font-bold text-[#B19468] mb-4 flex items-center"><Code className="w-6 h-6 mr-2" /> Key Development Areas</h3> {/* Medium Beige/Tan heading */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-lg text-[#2D395E] mb-2">Frontend</h4>
                                <ul className="list-none space-y-1 pl-0">
                                    {resumeData.skills.frontend.map((skill, i) => <ListItemWithIcon key={i}>{skill}</ListItemWithIcon>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-[#2D395E] mb-2">Backend</h4>
                                <ul className="list-none space-y-1 pl-0">
                                    {resumeData.skills.backend.map((skill, i) => <ListItemWithIcon key={i}>{skill}</ListItemWithIcon>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-[#2D395E] mb-2">Blockchain/Web3</h4>
                                <ul className="list-none space-y-1 pl-0">
                                    {resumeData.skills.blockchainWeb3.map((skill, i) => <ListItemWithIcon key={i}>{skill}</ListItemWithIcon>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-[#2D395E] mb-2">Tools</h4>
                                <ul className="list-none space-y-1 pl-0">
                                    {resumeData.skills.tools.map((skill, i) => <ListItemWithIcon key={i}>{skill}</ListItemWithIcon>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-[#2D395E] mb-2">Programming Languages</h4>
                                <ul className="list-none space-y-1 pl-0">
                                    {resumeData.skills.programmingLanguages.map((lang, i) => <ListItemWithIcon key={i}>{lang}</ListItemWithIcon>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-[#2D395E] mb-2">Database</h4>
                                <ul className="list-none space-y-1 pl-0">
                                    <ListItemWithIcon>{resumeData.skills.database}</ListItemWithIcon>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-[#2D395E] mb-2">Concepts</h4>
                                <ul className="list-none space-y-1 pl-0">
                                    {resumeData.skills.concepts.map((concept, i) => <ListItemWithIcon key={i}>{concept}</ListItemWithIcon>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-[#2D395E] mb-2">Generative AI</h4>
                                <ul className="list-none space-y-1 pl-0">
                                    {resumeData.skills.generativeAI.map((concept, i) => <ListItemWithIcon key={i}>{concept}</ListItemWithIcon>)}
                                </ul>
                            </div>
                        </div>
                    </div> 
                </div> 
            <div className="card p-6 mt-8">
                <h3 className="text-2xl font-bold text-[#B19468] mb-4 flex items-center"><Users className="w-6 h-6 mr-2" /> Soft Skills</h3> {/* Medium Beige/Tan heading */}
                <div className="flex flex-wrap gap-3">
                    {resumeData.softSkills.map((skill, i) => (
                        <span key={i} className="bg-[#EDE7DB] text-[#2D395E] px-4 py-2 rounded-full text-sm font-medium border border-[#DBCDAF]"> {/* Cream/Off-white bg, Dark Blue/Navy text, Light Beige border */}
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            </div> {/* Closing container div for skills */}
          </section>

          <section id="experience" className="py-12 bg-[#EDE7DB]"> {/* Cream/Off-white */}
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-[#2D395E]">Professional Experience</h2> {/* Dark Blue/Navy Text */}
              <p className="text-center text-[#B19468] mb-8 max-w-2xl mx-auto">Explore my professional journey, highlighting key roles and responsibilities that have shaped my expertise. Each entry details my contributions and the impact I've made in various web development and automation projects.</p>
              <div className="chart-container sm:max-w-md mb-8"> {/* Added sm:max-w-md */}
                  <canvas ref={experienceChartRef}></canvas>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {resumeData.experience.map((exp, i) => (
                  <ExperienceItem key={i} {...exp} />
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="py-12 bg-[#DBCDAF]"> {/* Light Beige background */}
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-[#2D395E]">Projects & Volunteer Work</h2> {/* Dark Blue/Navy Text */}
              <p className="text-center text-[#B19468] mb-8 max-w-2xl mx-auto">This section showcases notable projects and contributions, including my entrepreneurial ventures and academic work. Click on any project to discover more about its scope and my role.</p>

              <h3 className="text-2xl font-bold text-[#B19468] mb-4 flex items-center"><GitPullRequest className="w-6 h-6 mr-2" /> Key Projects</h3> {/* Medium Beige/Tan heading */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {resumeData.projects.map((proj, i) => (
                  <ProjectItem key={i} {...proj} />
                ))}
              </div>
            </div>
          </section>

          <section id="education" className="py-12 bg-[#EDE7DB]"> {/* Cream/Off-white */}
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-[#2D395E]">Education & Certifications</h2> {/* Dark Blue/Navy Text */}
              <p className="text-center text-[#B19468] mb-8 max-w-2xl mx-auto">My academic background and continuous learning efforts are detailed here, showcasing my foundational knowledge and commitment to staying current in the tech landscape.</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-6">
                  <h3 className="text-2xl font-bold text-[#B19468] mb-4 flex items-center"><BookOpen className="w-6 h-6 mr-2" /> Education</h3> {/* Medium Beige/Tan heading */}
                  <ul className="list-none space-y-4 pl-0">
                    {resumeData.education.map((edu, i) => (
                      <li key={i}>
                        <p className="font-semibold text-lg text-[#2D395E]">{edu.degree}</p>
                        <p className="text-[#B19468]">{edu.institution} | {edu.dates}</p>
                        <p className="text-[#666666] text-sm">Grade: {edu.grade}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6">
                  <h3 className="text-2xl font-bold text-[#B19468] mb-4 flex items-center"><Award className="w-6 h-6 mr-2" /> Certifications</h3> {/* Medium Beige/Tan heading */}
                  <ul className="list-none space-y-4 pl-0">
                    {resumeData.certifications.map((cert, i) => (
                      <li key={i}>
                        <p className="font-semibold text-lg text-[#2D395E]">{cert.name}</p>
                        <p className="text-[#B19468]">{cert.issuer} | {cert.year}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card p-6 mt-8">
                  <h3 className="text-2xl font-bold text-[#B19468] mb-4 flex items-center"><MessageSquare className="w-6 h-6 mr-2" /> Languages</h3> {/* Medium Beige/Tan heading */}
                  <div className="flex flex-wrap gap-4">
                      {resumeData.languages.map((lang, i) => (
                          <div key={i} className="text-[#B19468]">
                              <span className="font-semibold text-[#2D395E]">{lang.name}:</span> {lang.proficiency}
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          </section>

          <section id="contact" className="py-12 bg-[#DBCDAF]"> {/* Light Beige background */}
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4 text-[#2D395E]">Get in Touch</h2> {/* Dark Blue/Navy Text */}
              <p className="text-lg text-[#B19468] max-w-2xl mx-auto mb-8">I'm open to new opportunities and collaborations. Feel free to reach out via the following channels:</p>
              <div className="flex flex-wrap justify-center gap-6 text-xl">
                <a href={`tel:${resumeData.contact.phone}`} className="flex items-center text-[#2D395E] hover:text-[#B19468] transition-colors">
                  <Phone className="w-6 h-6 mr-2" /> {resumeData.contact.phone}
                </a>
                <a href={`mailto:${resumeData.contact.email}`} className="flex items-center text-[#2D395E] hover:text-[#B19468] transition-colors">
                  <Mail className="w-6 h-6 mr-2" /> {resumeData.contact.email}
                </a>
                <a href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#B19468] hover:text-[#DBCDAF] transition-colors"> {/* Medium Beige/Tan links, hover Light Beige */}
                  <Linkedin className="w-6 h-6 mr-2" /> LinkedIn Profile
                </a>
                <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#B19468] hover:text-[#DBCDAF] transition-colors">
                  <Github className="w-6 h-6 mr-2" /> GitHub Profile
                </a>
              </div>
              <p className="mt-6 text-[#666666]">{resumeData.contact.location}</p> {/* Muted Text */}
            </div>
          </section>
          </main>
          <footer className="bg-[#2D395E] py-6 text-center text-[#EDE7DB] text-sm">
            <p>&copy; 2025 Natasha Robinson. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
