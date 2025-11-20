import emailjs from "@emailjs/browser"
import { motion, useAnimation, useInView } from "framer-motion"
import { Github, Instagram, Linkedin, Loader2, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { usePortfolio } from "../context/PortfolioContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("message")
  const formRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, threshold: 0.2 })
  const controls = useAnimation()
  const { portfolioData } = usePortfolio();
  const contact = portfolioData.contact;
  const social = portfolioData.social;

  // Floating elements animation
  const floatingElements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }))

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      const serviceId = "service_e9iqelg"
      const templateId = "template_ecf26bv"
      const publicKey = "_FMPfnej307GndFRC"
      // Include the subject in the message body since the template has a hardcoded subject
      const enhancedMessage = `Subject: ${formData.subject}\n\n${formData.message}`
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        // Still include the subject in case the template is updated later
        subject: formData.subject,
        // Include the subject in the message body
        message: enhancedMessage,
        // For reply functionality
        reply_to: formData.email,
      }
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      toast.success("Message sent successfully! I'll get back to you soon.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Failed to send email:", error)
      toast.error("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={containerRef} className="relative py-18 overflow-hidden bg-gradient-to-b from-black " id="contact">
      <ToastContainer position="top-right" theme="dark" />
      {/* Floating elements background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/20"
            style={{ width: el.size, height: el.size }}
            initial={{ x: `${el.x}%`, y: `${el.y}%`, opacity: 0.2 }}
            animate={{
              x: [`${el.x}%`, `${el.x + 10}%`, `${el.x - 5}%`, `${el.x}%`],
              y: [`${el.y}%`, `${el.y - 15}%`, `${el.y + 10}%`, `${el.y}%`],
              opacity: [0.2, 0.5, 0.3, 0.2],
            }}
            transition={{
              duration: el.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: el.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {/* Hexagon grid background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path
              d="M25,0 L50,14.4 L50,43.4 L25,57.8 L0,43.4 L0,14.4 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>
      <div className="container relative z-10 px-4 mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              CONTACT ME
            </span>
          </h2>
          <motion.div
            className="h-1 mx-auto mt-4 bg-gradient-to-r from-amber-400 to-orange-600"
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              visible: {
                width: "150px",
                transition: { duration: 1, delay: 0.3 },
              },
            }}
          />
          <motion.p
            className="max-w-2xl mx-auto mt-6 text-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: { duration: 0.8, delay: 0.5 },
              },
            }}
          >
            Let's collaborate and bring your ideas to life
          </motion.p>
        </motion.div>
        {/* Main contact card */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.3 },
            },
          }}
        >
          <div className="relative overflow-hidden bg-gray-900/50 backdrop-blur-md rounded-3xl border border-gray-800">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-amber-500/20 to-orange-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-r from-orange-600/20 to-amber-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
            {/* Content container */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5">
              {/* Left side - Contact info (always visible on desktop) */}
              <div className="p-8 lg:p-12 lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md hidden lg:block">
                <motion.h3
                  className="mb-6 text-2xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, delay: 0.4 },
                    },
                  }}
                >
                  Contact Information
                </motion.h3>
                <div className="space-y-8">
                  {/* Contact details with staggered animations */}
                  {[{
                    icon: Mail,
                    title: "Email",
                    value: contact.email,
                    link: `mailto:${contact.email}`,
                    delay: 0.5,
                  }, {
                    icon: Phone,
                    title: "Phone",
                    value: contact.phone,
                    link: `tel:${contact.phone}`,
                    delay: 0.6,
                  }, {
                    icon: MapPin,
                    title: "Location",
                    value: contact.location,
                    delay: 0.7,
                  }].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={controls}
                      variants={{
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, delay: item.delay },
                        },
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm">
                        <item.icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">{item.title}</h4>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-400">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Social media links */}
                <motion.div
                  className="mt-12 pt-8 border-t border-gray-800/50"
                  initial={{ opacity: 0 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.8, delay: 0.8 },
                    },
                  }}
                >
                  <h4 className="mb-6 text-lg font-medium text-white">Follow Me</h4>
                  <div className="flex flex-wrap gap-4">
                    {[{
                      icon: Github,
                      href: social.github,
                      delay: 0.9,
                    }, {
                      icon: Linkedin,
                      href: social.linkedin,
                      delay: 1.0,
                    }, {
                      icon: Instagram,
                      href: social.instagram,
                      delay: 1.1,
                    }, {
                      icon: Twitter,
                      href: social.twitter,
                      delay: 1.2,
                    }].map((socialLink, index) => (
                      <motion.a
                        key={index}
                        href={socialLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={controls}
                        variants={{
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                              delay: socialLink.delay,
                            },
                          },
                        }}
                        whileHover={{ y: -5 }}
                      >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-600 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-gray-900 text-gray-400 group-hover:text-white group-hover:border-amber-400 transition-all duration-300">
                          <socialLink.icon className="w-5 h-5" />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
              {/* Right side - Form */}
              <div className="p-8 lg:p-12 lg:col-span-3">
                {/* Mobile tabs */}
                <div className="flex mb-8 lg:hidden">
                  <button
                    className={`flex-1 py-2 text-center transition-colors duration-300 ${activeTab === "message" ? "text-amber-400 border-b-2 border-amber-400" : "text-gray-400 border-b border-gray-800"}`}
                    onClick={() => setActiveTab("message")}
                    type="button"
                  >
                    Send Message
                  </button>
                  <button
                    className={`flex-1 py-2 text-center transition-colors duration-300 ${activeTab === "info" ? "text-amber-400 border-b-2 border-amber-400" : "text-gray-400 border-b border-gray-800"}`}
                    onClick={() => setActiveTab("info")}
                    type="button"
                  >
                    Contact Info
                  </button>
                </div>
                {/* Mobile view content */}
                <div className="lg:hidden">
                  {/* Contact info tab content */}
                  {activeTab === "info" && (
                    <div className="space-y-6 mb-8">
                      {[{
                        icon: Mail,
                        title: "Email",
                        value: contact.email,
                        link: `mailto:${contact.email}`,
                      }, {
                        icon: Phone,
                        title: "Phone",
                        value: contact.phone,
                        link: `tel:${contact.phone}`,
                      }, {
                        icon: MapPin,
                        title: "Location",
                        value: contact.location,
                      }].map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20">
                            <item.icon className="w-4 h-4 text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-base font-medium text-white">{item.title}</h4>
                            {item.link ? (
                              <a
                                href={item.link}
                                className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-300"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-sm text-gray-400">{item.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                      {/* Social links for mobile */}
                      <div className="pt-6 border-t border-gray-800/50">
                        <h4 className="mb-4 text-base font-medium text-white">Follow Me</h4>
                        <div className="flex gap-3">
                          {[{
                            icon: Github,
                            href: social.github,
                          }, {
                            icon: Linkedin,
                            href: social.linkedin,
                          }, {
                            icon: Instagram,
                            href: social.instagram,
                          }, {
                            icon: Twitter,
                            href: social.twitter,
                          }].map((socialLink, index) => (
                            <a
                              key={index}
                              href={socialLink.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 bg-gray-900 text-gray-400 hover:text-white hover:border-amber-400 transition-all duration-300"
                            >
                              <socialLink.icon className="w-4 h-4" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Message form tab content - KEY FIX: Always render the form but control visibility with CSS */}
                  <div className={activeTab === "message" ? "block" : "hidden"}>
                    <motion.h3
                      className="mb-6 text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={controls}
                      variants={{
                        visible: {
                          opacity: 1,
                          transition: { duration: 0.6, delay: 0.4 },
                        },
                      }}
                    >
                      Send Me a Message
                    </motion.h3>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Name field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={controls}
                          variants={{
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.6, delay: 0.5 },
                            },
                          }}
                        >
                          <label className="block mb-2 text-sm font-medium text-white">Your Name</label>
                          <div
                            className={`relative rounded-lg overflow-hidden ${errors.name ? "ring-2 ring-red-500" : ""}`}
                          >
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                              placeholder="Your Name"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                          </div>
                        </motion.div>

                        {/* Email field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={controls}
                          variants={{
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.6, delay: 0.6 },
                            },
                          }}
                        >
                          <label className="block mb-2 text-sm font-medium text-white">Email Address</label>
                          <div
                            className={`relative rounded-lg overflow-hidden ${errors.email ? "ring-2 ring-red-500" : ""}`}
                          >
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                              placeholder="your.email@example.com"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                          </div>
                        </motion.div>
                      </div>
                      {/* Subject field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.7 },
                          },
                        }}
                      >
                        <label className="block mb-2 text-sm font-medium text-white">Subject</label>
                        <div
                          className={`relative rounded-lg overflow-hidden ${errors.subject ? "ring-2 ring-red-500" : ""}`}
                        >
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                            placeholder="Project Inquiry"
                          />
                          {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                        </div>
                      </motion.div>
                      {/* Message field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.8 },
                          },
                        }}
                      >
                        <label className="block mb-2 text-sm font-medium text-white">Your Message</label>
                        <div
                          className={`relative rounded-lg overflow-hidden ${errors.message ? "ring-2 ring-red-500" : ""}`}
                        >
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-300 resize-none"
                            placeholder="Tell me about your project or idea..."
                          />
                          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                        </div>
                      </motion.div>
                      {/* Submit button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.9 },
                          },
                        }}
                        className="flex justify-end"
                      >
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all bg-transparent rounded-lg border-2 border-amber-400 text-amber-400 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          <span className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-gradient-to-r from-amber-400 to-orange-600 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-90"></span>
                          <span className="relative flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </>
                            )}
                          </span>
                        </button>
                      </motion.div>
                    </form>
                  </div>
                </div>
                {/* Desktop form (always visible) */}
                <div className="hidden lg:block">
                  <motion.h3
                    className="mb-6 text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: { duration: 0.6, delay: 0.4 },
                      },
                    }}
                  >
                    Send Me a Message
                  </motion.h3>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* Name field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.5 },
                          },
                        }}
                      >
                        <label className="block mb-2 text-sm font-medium text-white">Your Name</label>
                        <div
                          className={`relative rounded-lg overflow-hidden ${errors.name ? "ring-2 ring-red-500" : ""}`}
                        >
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                            placeholder="Your Name"
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                      </motion.div>
                      {/* Email field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.6 },
                          },
                        }}
                      >
                        <label className="block mb-2 text-sm font-medium text-white">Email Address</label>
                        <div
                          className={`relative rounded-lg overflow-hidden ${errors.email ? "ring-2 ring-red-500" : ""}`}
                        >
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                            placeholder="your.email@example.com"
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                      </motion.div>
                    </div>
                    {/* Subject field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={controls}
                      variants={{
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, delay: 0.7 },
                        },
                      }}
                    >
                      <label className="block mb-2 text-sm font-medium text-white">Subject</label>
                      <div
                        className={`relative rounded-lg overflow-hidden ${errors.subject ? "ring-2 ring-red-500" : ""}`}
                      >
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-300"
                          placeholder="Project Inquiry"
                        />
                        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                      </div>
                    </motion.div>
                    {/* Message field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={controls}
                      variants={{
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, delay: 0.8 },
                        },
                      }}
                    >
                      <label className="block mb-2 text-sm font-medium text-white">Your Message</label>
                      <div
                        className={`relative rounded-lg overflow-hidden ${errors.message ? "ring-2 ring-red-500" : ""}`}
                      >
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-300 resize-none"
                          placeholder="Tell me about your project or idea..."
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                      </div>
                    </motion.div>
                    {/* Submit button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={controls}
                      variants={{
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, delay: 0.9 },
                        },
                      }}
                      className="flex justify-end"
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all bg-transparent rounded-lg border-2 border-amber-400 text-amber-400 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <span className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-gradient-to-r from-amber-400 to-orange-600 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-90"></span>
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Decorative elements at bottom */}
        <div className="flex justify-center mt-16">
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-amber-400/50 to-orange-600/50 rounded-full"
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              visible: { width: "6rem", transition: { duration: 1, delay: 1 } },
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
