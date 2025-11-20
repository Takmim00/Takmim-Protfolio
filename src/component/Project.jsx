import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from "./ProjectCard";

const Project = () => {
  const { portfolioData } = usePortfolio();
  const projectData = portfolioData.projects;

  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });
  const [currentPage, setCurrentPage] = useState(0);

  const categories = [
    "All",
    ...new Set(projectData.map((project) => project.category)),
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projectData
      : projectData.filter((project) => project.category === activeCategory);

  const projectsPerPage = 4;
  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
  const displayedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const nextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-stone-900 to-black relative overflow-hidden"
      id="projects"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        {/* Code-like decorative elements */}
        <div className="absolute left-5 top-20 text-orange-500/10 text-7xl font-mono hidden lg:block">
          {"<projects>"}
        </div>
        <div className="absolute right-5 bottom-20 text-orange-500/10 text-7xl font-mono hidden lg:block">
          {"</projects>"}
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              PROJECTS
            </span>
          </h2>
          <motion.div
            className="h-1 w-0 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: "150px" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-amber-400 font-medium">MY</span> Work
          </motion.p>
        </motion.div>
        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(0);
              }}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-amber-400 to-orange-600 text-white font-medium"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        {/* Projects Grid */}
        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
          {/* Pagination Controls */}
          {filteredProjects.length > projectsPerPage && (
            <motion.div
              className="flex justify-center items-center mt-12 gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${
                  currentPage === 0
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? "bg-gradient-to-r from-amber-400 to-orange-600 w-6"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextPage}
                disabled={currentPage === pageCount - 1}
                className={`p-2 rounded-full ${
                  currentPage === pageCount - 1
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Project;
