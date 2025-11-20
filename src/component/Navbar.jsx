import { Download, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import resume from "../assets/My_Resume.pdf"
const cn = (...classes) => classes.filter(Boolean).join(" ")

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("banner")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Handle scroll effects and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = ["banner", "about", "skill", "project", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
        document.body.style.overflow = "" // unlock scroll
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
  }, [mobileMenuOpen])
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled ? "bg-black/40 py-3 shadow-lg" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("banner")
            }}
          >
            <Link to="/" className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden">
              <img src={logo || "/placeholder.svg"} alt="Portfolio Logo" className="object-contain h-full w-full" />
            </Link>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks activeSection={activeSection} scrollToSection={scrollToSection} />
          </div>
          {/* Resume Button (Desktop) */}
          <div className="hidden md:block">
            <a
              href={resume}
              download="My_Resume"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-orange-500 px-6 py-3 font-medium text-orange-500 shadow-md transition duration-300 ease-out"
            >
              <span className="ease absolute inset-0 flex h-full w-full -translate-y-full items-center justify-center bg-orange-500 text-white duration-300 group-hover:translate-y-0">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </span>
              <span className="ease absolute inset-0 flex h-full w-full translate-y-0 items-center justify-center text-orange-500 duration-300 group-hover:translate-y-full">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </span>
              <span className="invisible relative">Download Resume</span>
            </a>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 backdrop-blur-3xl transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Close button inside the overlay */}
        <button
          className="absolute top-5 right-5 text-white bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-colors z-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
        <div className="flex flex-col h-full pt-24 px-8 relative z-10  ">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10  to-black/30 pointer-events-none"></div>
          <div className="flex flex-col space-y-2 relative bg-black/50  backdrop-blur-2xl">
            <MobileNavLinks activeSection={activeSection} scrollToSection={scrollToSection} />
          </div>
          <div className="mt-8 relative">
            <a
              href={resume}
              download="My_Resume"
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors w-full justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLinks({ activeSection, scrollToSection }) {
  return (
    <>
      <NavLink
        to="/"
        sectionId="banner"
        label="Home"
        isActive={activeSection === "banner"}
        scrollToSection={scrollToSection}
      />
      <NavLink
        sectionId="about"
        label="About Me"
        isActive={activeSection === "about"}
        scrollToSection={scrollToSection}
      />
      <NavLink
        sectionId="skill"
        label="Skills"
        isActive={activeSection === "skill"}
        scrollToSection={scrollToSection}
      />
      <NavLink
        sectionId="project"
        label="Projects"
        isActive={activeSection === "project"}
        scrollToSection={scrollToSection}
      />
      <NavLink
        sectionId="contact"
        label="Contact"
        isActive={activeSection === "contact"}
        scrollToSection={scrollToSection}
      />
    </>
  )
}

function MobileNavLinks({ activeSection, scrollToSection }) {
  return (
    <>
      <MobileNavLink
        sectionId="banner"
        label="Home"
        isActive={activeSection === "banner"}
        scrollToSection={scrollToSection}
      />
      <MobileNavLink
        sectionId="about"
        label="About Me"
        isActive={activeSection === "about"}
        scrollToSection={scrollToSection}
      />
      <MobileNavLink
        sectionId="skill"
        label="Skills"
        isActive={activeSection === "skill"}
        scrollToSection={scrollToSection}
      />
      <MobileNavLink
        sectionId="project"
        label="Projects"
        isActive={activeSection === "project"}
        scrollToSection={scrollToSection}
      />
      <MobileNavLink
        sectionId="contact"
        label="Contact"
        isActive={activeSection === "contact"}
        scrollToSection={scrollToSection}
      />
    </>
  )
}

function NavLink({ sectionId, label, isActive, scrollToSection }) {
  const cn = (...classes) => classes.filter(Boolean).join(" ")
  return (
    <a
      href={`#${sectionId}`}
      className={cn(
        "relative text-white font-medium text-lg transition-colors duration-300",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300",
        isActive ? "text-orange-500 after:w-full" : "hover:text-orange-500 after:w-0 hover:after:w-full",
      )}
      onClick={(e) => {
        e.preventDefault()
        scrollToSection(sectionId)
      }}
    >
      {label}
    </a>
  )
}

function MobileNavLink({ sectionId, label, isActive, scrollToSection }) {
  return (
    <a
      href={`#${sectionId}`}
      className={cn(
        "text-xl font-medium backdrop-blur-xl py-2 px-4 rounded-lg transition-all duration-200",
        isActive
          ? "bg-orange-500/20 text-orange-500 border-l-4 border-orange-500"
          : "text-white hover:text-orange-500 hover:bg-white/5 border-l-4 border-transparent",
      )}
      onClick={(e) => {
        e.preventDefault()
        scrollToSection(sectionId)
      }}
    >
      {label}
    </a>
  )
}
