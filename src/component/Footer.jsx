import { usePortfolio } from "../context/PortfolioContext";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa6";

const Footer = () => {
  const { portfolioData } = usePortfolio();
  const footer = portfolioData.footer;
  const social = portfolioData.social;

  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        {footer.links.map((link, index) => (
          <a key={index} href={link.href} className="link link-hover">
            {link.label}
          </a>
        ))}
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href={social.linkedin}>
            <BsLinkedin className="w-6 h-6" />
          </a>
          <a href={social.github}>
            <FaGithubAlt className="w-6 h-6" />
          </a>
          <a href={social.facebook}>
            <FaFacebookSquare className="w-6 h-6" />
          </a>
        </div>
      </nav>
      <aside>
        <p>{footer.copyright}</p>
      </aside>
    </footer>
  );
};

export default Footer;
