import { FaFigma, FaGithub, FaHtml5, FaNodeJs } from "react-icons/fa";
import {
  RiFirebaseFill,
  RiReactjsLine,
  RiTailwindCssFill,
} from "react-icons/ri";
import { SiCss3, SiExpress, SiMongodb, SiNextdotjs } from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";
// Default portfolio data structure
export const defaultPortfolioData = {
  personal: {
    name: "A S M Maghferat Takmim",
    title: "Frontend Developer",
    titles: ["Frontend Developer", "UI/UX Enthusiast", "React Specialist"],
    bio: "I craft beautiful, responsive, and user-friendly interfaces that deliver exceptional user experiences.",
    experience: "0+ Years",
    profileImage: "/src/assets/Takmim (2).jpg",
    resume: "/src/assets/My_Resume.pdf",
    logo: "/src/assets/logo.png",
  },
  contact: {
    email: "takmimm@gmail.com",
    phone: "+880 1824096141",
    location: "Alangkar, Chittagong, Bangladesh",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/asm-maghferat-takmim89/",
    github: "https://github.com/Takmim00",
    instagram: "https://www.instagram.com/takmim_00/",
    twitter: "https://x.com/MTakmim58515",
    discord:
      "https://discord.com/channels/778521112262344714/778521112262344717",
    facebook: "https://www.facebook.com/takmim00",
  },
  about: {
    description:
      "I'm a junior web developer passionate about building beautiful and functional websites. I specialize in full-stack development and have experience with HTML, CSS, Tailwind CSS, JavaScript, React JS, Node JS, Express JS, MongoDB, and GitHub. I love solving problems and learning new skills. Currently, I'm eager to collaborate and grow in the web development field.",
    image: "/src/assets/coding.jpg",
  },
  skills: [
    {
      id: 1,
      name: "HTML5",
      icon: "FaHtml5",
      level: 100,
      category: "frontend",
      description: "Semantic markup and accessibility",
      color: "#E34F26",
    },
    {
      id: 2,
      name: "CSS3",
      icon: "SiCss3",
      level: 100,
      category: "frontend",
      description: "Advanced layouts and animations",
      color: "#1572B6",
    },
    {
      id: 3,
      name: "JavaScript",
      icon: "TbBrandJavascript",
      level: 100,
      category: "frontend",
      description: "ES6+ and modern patterns",
      color: "#F7DF1E",
    },
    {
      id: 5,
      name: "React",
      icon: "RiReactjsLine",
      level: 100,
      category: "frontend",
      description: "Component architecture and hooks",
      color: "#61DAFB",
    },
    {
      id: 6,
      name: "Next.js",
      icon: "SiNextdotjs",
      level: 100,
      category: "frontend",
      description: "Server-side rendering",
      color: "#ffffff",
    },
    {
      id: 8,
      name: "Tailwind",
      icon: "RiTailwindCssFill",
      level: 100,
      category: "frontend",
      description: "Utility-first CSS",
      color: "#06B6D4",
    },
    {
      id: 9,
      name: "Node.js",
      icon: "FaNodeJs",
      level: 100,
      category: "backend",
      description: "Server-side JavaScript",
      color: "#339933",
    },
    {
      id: 10,
      name: "Express",
      icon: "SiExpress",
      level: 100,
      category: "backend",
      description: "Web application framework",
      color: "#FFFFFF",
    },
    {
      id: 11,
      name: "MongoDB",
      icon: "SiMongodb",
      level: 100,
      category: "backend",
      description: "NoSQL database",
      color: "#47A248",
    },
    {
      id: 12,
      name: "Firebase",
      icon: "RiFirebaseFill",
      level: 100,
      category: "backend",
      description: "Backend as a service",
      color: "#FFCA28",
    },
    {
      id: 14,
      name: "GitHub",
      icon: "FaGithub",
      level: 100,
      category: "tools",
      description: "Version control and collaboration",
      color: "#FFFFFF",
    },
    {
      id: 15,
      name: "Figma",
      icon: "FaFigma",
      level: 100,
      category: "tools",
      description: "UI/UX design and prototyping",
      color: "#F24E1E",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Study Hive",
      bifDescription:
        "A platform connecting tutors and students for seamless learning experiences.",
      description:
        "Study Hive is a user-friendly platform designed to connect tutors and students. Tutors can apply to offer courses, and students can book these approved courses. The admin can manage user roles, approve or reject courses, and control the platform's functionality. Students can also write, update, and delete notes, as well as view materials provided by tutors for approved sessions.",
      image: "https://i.ibb.co/JbMJ9Vd/Screenshot-2025-02-05-215501.png",
      liveLink: "https://study-hive-9b382.web.app",
      clientRepo: "https://github.com/Takmim00/Study-Hive",
      serverRepo: "https://github.com/Takmim00/study-Hive-Server",
      category: "Education",
      technology: [
        "React.js",
        "TailwindCSS",
        "Firebase",
        "Stripe",
        "React Query",
        "Axios",
        "React Router",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
    },
    {
      id: 2,
      title: "Chill Gamer",
      bifDescription:
        "A modern platform for gamers to explore and share game reviews.",
      description:
        'Chill Gamer is a modern and user-friendly game review application designed to provide gamers with a platform to explore, share, and manage game reviews effortlessly. The project focuses on creating a seamless experience with key features such as user authentication to secure personalized profiles and review management to enable users to write, edit, and delete their reviews. The application emphasizes simplicity and functionality, ensuring a "chill" and enjoyable experience for its users.',
      image: "https://i.ibb.co/HgMG44p/gamex.png",
      liveLink: "https://chill-gamer-8a201.web.app/",
      clientRepo: "https://github.com/Takmim00/Chill-gamer-client",
      serverRepo: "https://github.com/Takmim00/Chill-gamer-server",
      category: "Entertainment",
      technology: [
        "React",
        "TailwindCSS",
        "Firebase",
        "Axios",
        "React Router",
        "SweetAlert2",
        "DaisyUI",
        "React Icons",
        "React Toastify",
        "React Tooltip",
      ],
    },
    {
      id: 3,
      title: "Car Rental",
      bifDescription:
        "A seamless platform for renting vehicles with advanced booking features.",
      description:
        "The purpose of the car rental website is to provide a seamless and user-friendly platform for individuals and businesses to rent vehicles conveniently. It aims to streamline the car rental process by offering features such as advanced search options, secure user authentication, and an efficient booking system. Users can browse a wide selection of vehicles, check availability, and make bookings online.",
      image: "https://i.ibb.co/GWY3xp8/car-rental.png",
      liveLink: "https://car-rental-8afd6.web.app/",
      clientRepo: "https://github.com/Takmim00/Car-rental-client",
      serverRepo: "https://github.com/Takmim00/Car-rental-server",
      category: "Business",
      technology: [
        "React.js",
        "TailwindCSS",
        "Firebase",
        "Axios",
        "React Router",
        "Cloudinary",
        "SweetAlert2",
        "React Hook Form",
        "React Icons",
        "Chart.js",
      ],
    },
    {
      id: 4,
      title: "Smart Med Appointments",
      bifDescription:
        "An AI-powered healthcare platform for appointments, emergency support, and medical assistance.",
      description:
        "Smart Med Appointments is an AI-based healthcare web application designed to make medical services more accessible and efficient. The platform allows patients to book doctor appointments based on specialty and availability, request ambulance support with real-time tracking, donate and request blood, and share reviews about doctors. Integrated with Gemini AI, it also provides intelligent health-related queries and doctor recommendations through conversational AI.",
      image: "https://i.ibb.co.com/jYM0Zrd/smart-med.png",
      liveLink: "https://smart-med-appointments.vercel.app/",
      clientRepo:
        "https://github.com/ahanaf607307/smart-med-appointments-healthcare-nextjs",
      category: "Healthcare",
      technology: [
        "Next.js",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "MongoDB (Mongoose)",
        "NextAuth",
        "JWT",
        "Axios",
        "Gemini AI",
      ],
    },
  ],
  footer: {
    copyright: "Copyright © 2025 - All right reserved by ACME Industries Ltd",
    links: [
      { label: "About me", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Projects", href: "#project" },
    ],
  },
};

// LocalStorage key
const STORAGE_KEY = "portfolio_data";

// Get portfolio data from localStorage or return default
export const getPortfolioData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading portfolio data:", error);
  }
  return defaultPortfolioData;
};

// Save portfolio data to localStorage
export const savePortfolioData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return false;
  }
};

// Reset to default data
export const resetPortfolioData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error resetting portfolio data:", error);
    return false;
  }
};

// Update specific section
export const updatePortfolioSection = (section, data) => {
  try {
    const currentData = getPortfolioData();
    const updatedData = {
      ...currentData,
      [section]: data,
    };
    return savePortfolioData(updatedData);
  } catch (error) {
    console.error("Error updating portfolio section:", error);
    return false;
  }
};
