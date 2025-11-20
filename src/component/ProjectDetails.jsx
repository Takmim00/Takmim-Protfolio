import { motion, useInView } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
const ProjectDetails = () => {
  const { id } = useParams();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });
  // Sample project data structure
  const projectData = [
    {
      id: 1,
      title: "Study Hive",
      description:
        "Study Hive is a user-friendly platform designed to connect tutors and students. Tutors can apply to offer courses, and students can book these approved courses. The admin can manage user roles, approve or reject courses, and control the platform's functionality. Students can also write, update, and delete notes, as well as view materials provided by tutors for approved sessions.",
      image: "https://i.ibb.co/JbMJ9Vd/Screenshot-2025-02-05-215501.png",
      liveLink: "https://study-hive-9b382.web.app",
      clientRepo: "https://github.com/Takmim00/Study-Hive",
      serverRepo: "https://github.com/Takmim00/study-Hive-Server",
      overlayText: "Explore More",
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
      features: [
        "User authentication and role-based access control",
        "Course creation and management for tutors",
        "Course booking system for students",
        "Admin dashboard for platform management",
        "Note-taking functionality for students",
        "Material sharing between tutors and students",
      ],
      screenshots: [
        "https://i.ibb.co.com/Y7fWXxVk/study-hive1.png",
        "https://i.ibb.co.com/NQYgHCQ/study-hive2.png",
        "https://i.ibb.co.com/mPB9sWw/study-hive3.png",
      ],
    },
    {
      id: 2,
      title: "Chill Gamer",
      description:
        'Chill Gamer is a modern and user-friendly game review application designed to provide gamers with a platform to explore, share, and manage game reviews effortlessly. The project focuses on creating a seamless experience with key features such as user authentication to secure personalized profiles and review management to enable users to write, edit, and delete their reviews. The application emphasizes simplicity and functionality, ensuring a "chill" and enjoyable experience for its users. With a clean and responsive UI, the design adapts beautifully to both desktop and mobile devices, making it accessible to a wide audience. Chill Gamer integrates interactive sorting and filtering options, allowing users to browse reviews by game genres, ratings, and release years. By combining robust functionality with a sleek and minimalistic interface, Chill Gamer aims to become the go-to platform for gaming enthusiasts seeking a relaxed and engaging community for sharing their insights and opinions.',
      image: "https://i.ibb.co/HgMG44p/gamex.png",
      liveLink: "https://chill-gamer-8a201.web.app/",
      clientRepo: "https://github.com/Takmim00/Chill-gamer-client",
      serverRepo: "https://github.com/Takmim00/Chill-gamer-server",
      overlayText: "Explore More",
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
      features: [
        "User authentication and profile management",
        "Game review creation, editing, and deletion",
        "Interactive sorting and filtering options",
        "Responsive design for all devices",
        "Real-time updates for new reviews",
        "Rating system for games",
      ],
      screenshots: [
        "https://i.ibb.co.com/5g7B0YLw/gamex2.png",
        "https://i.ibb.co.com/8Lr5fsj5/gamex3.png",
        "https://i.ibb.co.com/HLB1p6BS/gamex4.png",
      ],
    },
    {
      id: 3,
      title: "Car Rental",
      description:
        "The purpose of the car rental website is to provide a seamless and user-friendly platform for individuals and businesses to rent vehicles conveniently. It aims to streamline the car rental process by offering features such as advanced search options, secure user authentication, and an efficient booking system. Users can browse a wide selection of vehicles, check availability, and make bookings online, while the platform ensures secure payment options and responsive design for accessibility across devices. Additionally, the system will include a robust backend for managing car inventory, tracking availability, and maintaining real-time updates. With a focus on user satisfaction, the website will also integrate customer support features to address queries promptly, making the car rental experience reliable and hassle-free.",
      image: "https://i.ibb.co/GWY3xp8/car-rental.png",
      liveLink: "https://car-rental-8afd6.web.app/",
      clientRepo: "https://github.com/Takmim00/Car-rental-client",
      serverRepo: "https://github.com/Takmim00/Car-rental-server",
      overlayText: "Explore More",
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
      features: [
        "Vehicle browsing and advanced search",
        "Booking system with availability checking",
        "User authentication and profile management",
        "Admin dashboard for inventory management",
        "Payment processing integration",
        "Customer support system",
      ],
      screenshots: [
        "https://i.ibb.co.com/s9dsZxNf/car-rental1.png",
        "https://i.ibb.co.com/CsKq8fdk/car-rental3.png",
        "https://i.ibb.co.com/nM5kqTpY/car-rental2.png",
      ],
    },
    {
      id: 4,
      title: "Smart Med Appointments",
      description:
        "Smart Med Appointments is an AI-powered healthcare web application that brings multiple medical services into a single platform. It allows users to book doctor appointments based on specialty and availability, request ambulance services with real-time tracking, donate/request blood, and share reviews of doctors. Integrated with Gemini AI, the platform also provides intelligent health-related query assistance and personalized doctor recommendations. The project focuses on improving accessibility, efficiency, and transparency in healthcare delivery.",
      image: "https://i.ibb.co.com/jYM0Zrd/smart-med.png",
      liveLink: "https://smart-med-appointments.vercel.app/",
      clientRepo:
        "https://github.com/ahanaf607307/smart-med-appointments-healthcare-nextjs",
      overlayText: "Explore More",
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
      features: [
        "AI-powered health assistant using Gemini AI for queries and doctor recommendations",
        "Dynamic appointment system for booking consultations with doctors",
        "Doctor review and rating system to enhance transparency",
        "Ambulance booking with real-time location tracking",
        "Blood donation and request management system",
        "Secure authentication and role-based access using NextAuth and JWT",
      ],
      screenshots: [
        "https://i.ibb.co.com/V0wKVF00/smart-med1.png",
        "https://i.ibb.co.com/5xBD0hcn/smart-med2.png",
        "https://i.ibb.co.com/5X5hy4GQ/smart-med3.png",
      ],
    },
  ];

  // Find the project by ID
  const project = projectData.find((project) => project.id === parseInt(id));

  // Generate a gradient based on the project category
  const getCategoryGradient = (category) => {
    switch (category) {
      case "Education":
        return "from-amber-400 to-orange-600";
      case "Entertainment":
        return "from-blue-400 to-purple-600";
      case "Business":
        return "from-green-400 to-teal-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Project Not Found
          </h2>
          <Link to="/">
            <button className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-600 text-white rounded-full">
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const gradient = getCategoryGradient(project.category);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-black to-stone-900 min-h-screen relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Project Header with Category Badge, Title and Back Button */}
        <div className="mb-16">
          {/* Category Badge - Centered */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-600/20 text-amber-400 text-sm mt-4 mb-6">
              {project.category}
            </div>
          </motion.div>
          {/* Title and Back Button Row */}
          <div className="flex justify-between items-center mb-6">
            {/* Back Button - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Link to="/">
                <motion.button
                  className="group relative flex items-center gap-3 px-5 py-2.5 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 hover:border-amber-400 transition-all duration-300"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <ArrowLeft className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                  <span className="text-white font-medium">Back to Home</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Project Title - Center (with flex-grow to push it to center) */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white flex-grow text-center mr-[50px]"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.title}
            </motion.h1>
            {/* Empty div to balance the layout */}
            <div className="w-[140px]"></div>
          </div>
          {/* Underline - Centered */}
          <motion.div
            className="h-1 w-0 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: "150px" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Image and Links */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Image with Gradient Border */}
            <div className="relative mb-8">
              <div
                className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${gradient} opacity-70 blur-sm`}
              ></div>
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-800">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full object-cover"
                />
              </div>
            </div>
            {/* Screenshots Gallery */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Screenshots</h3>
              <div className="grid grid-cols-3 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden border border-gray-800 hover:border-amber-400 transition-colors duration-300"
                  >
                    <img
                      src={screenshot || "/placeholder.svg"}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Project Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Project Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>
            {/* Features List */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div
                      className={`mt-1 min-w-2 min-h-2 rounded-full bg-gradient-to-r ${gradient}`}
                    ></div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          {/* Right Column - Technologies and Links */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Technologies */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
            {/* Project Links */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Project Links
              </h3>
              <div className="space-y-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-transparent rounded-lg border-2 border-amber-400 text-amber-400 hover:text-white"
                >
                  <span className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-gradient-to-r from-amber-400 to-orange-600 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-90"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </a>
                <a
                  href={project.clientRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    Client Repository
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
                {project.serverRepo && (
                  <a
                    href={project.serverRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      Server Repository
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
