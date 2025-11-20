import { useState } from "react"
import { motion } from "framer-motion"

const ContactCard = ({ icon: Icon, title, value, link, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-600/20 blur-md"
        animate={isHovered ? { scale: 1.05, opacity: 0.8 } : { scale: 1, opacity: 0.4 }}
        transition={{ duration: 0.3 }}
      />
      {/* Card content */}
      <div className="relative flex items-start gap-4 p-6 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20"
          animate={isHovered ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 1, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
        >
          <Icon className="w-5 h-5 text-amber-400" />
        </motion.div>
        {/* Text content */}
        <div>
          <h4 className="text-lg font-medium text-white">{title}</h4>
          {link ? (
            <a href={link} className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
              {value}
            </a>
          ) : (
            <p className="text-gray-400">{value}</p>
          )}
        </div>
        {/* Decorative corner */}
        <motion.div
          className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-amber-400/30 rounded-tr-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={isHovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -90 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default ContactCard
