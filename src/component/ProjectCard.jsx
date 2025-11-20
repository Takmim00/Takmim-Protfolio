import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
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
  const gradient = getCategoryGradient(project.category);
  return (
    <motion.div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Border */}
      <div
        className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${gradient} opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
      {/* Card Content */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden h-56">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${gradient} text-white`}
            >
              {project.category}
            </div>
          </div>
          {/* Overlay with Quick Links */}
          <motion.div
            className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-4">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-2 rounded-full hover:bg-amber-400 transition-colors duration-300"
                aria-label="View live site"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={project.clientRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-2 rounded-full hover:bg-amber-400 transition-colors duration-300"
                aria-label="View client repository"
              >
                <Github className="w-5 h-5" />
              </a>
              {project.serverRepo && (
                <a
                  href={project.serverRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black p-2 rounded-full hover:bg-amber-400 transition-colors duration-300"
                  aria-label="View server repository"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
        {/* Text Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            {project.title}
            <motion.div
              animate={isHovered ? { rotate: 45, x: 3 } : { rotate: 0, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-5 h-5 text-amber-400" />
            </motion.div>
          </h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow">
            {project.bifDescription}
          </p>
          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technology.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technology.length > 3 && (
              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                +{project.technology.length - 3} more
              </span>
            )}
          </div>
          {/* View Details Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="mt-auto w-full"
          >
            <Link
              to={`/project/${project.id}`}
              className="group relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium transition-all bg-transparent rounded-lg border border-amber-400 text-amber-400 hover:text-white"
            >
              <span className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-gradient-to-r from-amber-400 to-orange-600 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-90"></span>
              <span className="relative flex items-center gap-2">
                View Details
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
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
