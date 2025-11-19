import { createContext, useContext, useEffect, useState } from "react";
import { getPortfolioData, savePortfolioData } from "../utils/portfolioData";

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(getPortfolioData());
  const [isLoading, setIsLoading] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    savePortfolioData(portfolioData);
  }, [portfolioData]);

  const updateSection = (section, data) => {
    setIsLoading(true);
    try {
      setPortfolioData((prev) => ({
        ...prev,
        [section]: data,
      }));
      return true;
    } catch (error) {
      console.error("Error updating section:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePersonal = (data) => updateSection("personal", data);
  const updateContact = (data) => updateSection("contact", data);
  const updateSocial = (data) => updateSection("social", data);
  const updateAbout = (data) => updateSection("about", data);
  const updateSkills = (data) => updateSection("skills", data);
  const updateProjects = (data) => updateSection("projects", data);
  const updateFooter = (data) => updateSection("footer", data);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
    };
    setPortfolioData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id, updatedProject) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)),
    }));
  };

  const deleteProject = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addSkill = (skill) => {
    const newSkill = {
      ...skill,
      id: Date.now(),
    };
    setPortfolioData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id, updatedSkill) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updatedSkill } : s)),
    }));
  };

  const deleteSkill = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const value = {
    portfolioData,
    isLoading,
    updatePersonal,
    updateContact,
    updateSocial,
    updateAbout,
    updateSkills,
    updateProjects,
    updateFooter,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
