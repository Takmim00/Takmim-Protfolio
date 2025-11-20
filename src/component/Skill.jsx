import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaFigma, FaGithub, FaHtml5, FaNodeJs } from "react-icons/fa";
import {
  RiFirebaseFill,
  RiReactjsLine,
  RiTailwindCssFill,
} from "react-icons/ri";
import { SiCss3, SiExpress, SiMongodb, SiNextdotjs } from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";
import { usePortfolio } from "../context/PortfolioContext";

const getIconForSkill = (skillName) => {
  const iconMap = {
    "HTML5": FaHtml5,
    "CSS3": SiCss3,
    "JavaScript": TbBrandJavascript,
    "React": RiReactjsLine,
    "Next.js": SiNextdotjs,
    "Tailwind": RiTailwindCssFill,
    "Node.js": FaNodeJs,
    "Express": SiExpress,
    "MongoDB": SiMongodb,
    "Firebase": RiFirebaseFill,
    "GitHub": FaGithub,
    "Figma": FaFigma,
  };
  return iconMap[skillName] || RiReactjsLine;
};

const Skill = () => {
  const { portfolioData } = usePortfolio();
  const skillsFromContext = portfolioData.skills;
  // State
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "150px",
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const detailsVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  // Icon animation variants
  const iconVariants = (duration = 3) => ({
    initial: { y: -5 },
    animate: {
      y: [5, -5],
      transition: {
        duration: duration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  });

  // Data
  const categories = [
    { id: "frontend", name: "Frontend", color: "#61DAFB" },
    { id: "backend", name: "Backend", color: "#339933" },
    { id: "tools", name: "Tools", color: "#F24E1E" },
  ];

  const skills = skillsFromContext.map(skill => ({
    ...skill,
    icon: getIconForSkill(skill.name), 
    details: skill.description,
    keywords: [skill.name.toLowerCase(), skill.category, skill.description.toLowerCase()],
    animationDuration: 2.5 + Math.random(),
  }));

  // Filter skills by search query and active category
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory
      ? skill.category === activeCategory
      : true;

    if (!searchQuery) return matchesCategory;

    const query = searchQuery.toLowerCase();
    return (
      matchesCategory &&
      (skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.details.toLowerCase().includes(query) ||
        skill.keywords.some((keyword) => keyword.toLowerCase().includes(query)))
    );
  });

  // Event handlers
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedSkill(null);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-stone-950 to-black relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-400/30"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            animate={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2
            id="skills-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-400 to-rose-600">
              TECH ARSENAL
            </span>
          </h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-rose-400 via-amber-400 to-rose-600 mx-auto mt-4"
            variants={underlineVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          />
        </motion.div>
        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={filterVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          role="tablist"
          aria-label="Skill categories"
        >
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === null
                ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleCategoryChange(null)}
            role="tab"
            aria-selected={activeCategory === null}
            aria-controls="all-skills"
          >
            All Skills
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/20"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => handleCategoryChange(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls={`${category.id}-skills`}
              style={{
                boxShadow:
                  activeCategory === category.id
                    ? `0 10px 15px -3px ${category.color}20`
                    : undefined,
              }}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
        {/* Search Results Count */}
        {searchQuery && (
          <motion.div
            className="text-center mb-8 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Found {filteredSkills.length}{" "}
            {filteredSkills.length === 1 ? "skill" : "skills"} matching 
            {searchQuery}
          </motion.div>
        )}
        {/* Selected Skill Details */}
        {selectedSkill && (
          <motion.div
            className="mb-12 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-xl"
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-live="polite"
          >
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${selectedSkill.color}20` }}
              >
                <selectedSkill.icon
                  className="text-3xl"
                  style={{ color: selectedSkill.color }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white">
                  {selectedSkill.name}
                </h3>
                <p className="text-gray-400">{selectedSkill.description}</p>
              </div>
              <div className="ml-auto mt-2 md:mt-0">
                <span
                  className="text-xl font-bold"
                  style={{ color: selectedSkill.color }}
                >
                  {selectedSkill.level}%
                </span>
              </div>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: selectedSkill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${selectedSkill.level}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              {selectedSkill.details}
            </p>
            {/* Keywords */}
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {selectedSkill.keywords.map((keyword, index) => (
                <motion.span
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full cursor-pointer hover:bg-gray-700"
                  onClick={() => {
                    setSearchQuery(keyword);
                    setSelectedSkill(null);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  #{keyword}
                </motion.span>
              ))}
            </motion.div>
            <motion.button
              className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
              onClick={() => setSelectedSkill(null)}
              aria-label="Close skill details"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
        {/* No Results Message */}
        {filteredSkills.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-4xl mb-4 opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              🔍
            </motion.div>
            <h3 className="text-xl font-medium text-white mb-2">
              No skills found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or category filter
            </p>
            <motion.button
              className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear all filters
            </motion.button>
          </motion.div>
        )}
        {/* Skills Grid */}
        {filteredSkills.length > 0 && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 items-center"
            id={activeCategory ? `${activeCategory}-skills` : "all-skills"}
            role="tabpanel"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                variants={skillVariants}
                whileHover={{ scale: 1.05 }}
              >
                <button
                  className="w-full text-left"
                  onClick={() => handleSkillClick(skill)}
                  aria-label={`View details about ${skill.name}`}
                  aria-expanded={selectedSkill?.id === skill.id}
                >
                  <div className="flex flex-col items-center">
                    {/* Hexagon Container */}
                    <div className="relative mb-3">
                      <svg
                        width="120"
                        height="140"
                        viewBox="0 0 150 170"
                        className="transform scale-75 md:scale-90"
                      >
                        <defs>
                          <linearGradient
                            id={`gradient-${skill.id}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor={skill.color}
                              stopOpacity="0.8"
                            />
                            <stop
                              offset="100%"
                              stopColor={skill.color}
                              stopOpacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                        <motion.path
                          d="M75 0L150 43V127L75 170L0 127V43L75 0Z"
                          fill={
                            selectedSkill?.id === skill.id
                              ? skill.color
                              : `url(#gradient-${skill.id})`
                          }
                          stroke={skill.color}
                          strokeWidth="2"
                          opacity={selectedSkill?.id === skill.id ? 0.9 : 0.7}
                          whileHover={{
                            strokeWidth: 3,
                            opacity: 1,
                          }}
                        />
                      </svg>
                      {/* Icon with Framer Motion animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="text-4xl"
                          style={{
                            color:
                              selectedSkill?.id === skill.id
                                ? "white"
                                : skill.color,
                          }}
                          variants={iconVariants(skill.animationDuration)}
                          initial="initial"
                          animate="animate"
                        >
                          <skill.icon />
                        </motion.div>
                      </div>
                    </div>
                    {/* Skill Name */}
                    <h3 className="text-white font-medium text-center text-sm md:text-base">
                      {skill.name}
                    </h3>
                    {/* Skill Level Indicator */}
                    <div className="w-full mt-2 px-2">
                      <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.5,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skill;
