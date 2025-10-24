import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

interface FooterProps {
  title: string;
  subtitle: string;
}

const Footer = ({ title, subtitle }: FooterProps) => {
  return (
     <footer className="bg-violet-900 text-white px-6 py-8">
      <div className="max-w-screen-xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-300">{subtitle}</p>
        <div className="flex justify-center gap-6 text-white text-xl">
          <Link href="https://www.linkedin.com" target="_blank">
            <FaLinkedinIn className="hover:text-gray-300 transition" />
          </Link>
          <Link href="https://github.com" target="_blank">
            <FaGithub className="hover:text-gray-300 transition" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
