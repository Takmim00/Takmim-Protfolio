import { Briefcase, Code, Home, Mail, Settings, User } from 'lucide-react';
import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import FooterSection from "./sections/FooterSection";
import PersonalSection from "./sections/PersonalSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import SocialSection from "./sections/SocialSection";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { portfolioData } = usePortfolio();

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "about", label: "About Me", icon: Home },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "social", label: "Social Links", icon: Settings },
    { id: "footer", label: "Footer", icon: Settings },
  ];

  const renderSection = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalSection />;
      case "about":
        return <AboutSection />;
      case "skills":
        return <SkillsSection />;
      case "projects":
        return <ProjectsSection />;
      case "contact":
        return <ContactSection />;
      case "social":
        return <SocialSection />;
      case "footer":
        return <FooterSection />;
      default:
        return <PersonalSection />;
    }
  };

  return (
    <div className=" w-11/12 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Manage your portfolio content from one place
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Sections
            </h2>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
