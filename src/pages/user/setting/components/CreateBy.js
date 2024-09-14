import React from "react";
import Accordion from "./Accordion";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { useTheme } from "../../../../context/themeContext";

const CreateBy = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === "dark" ? "text-gray-300" : "text-black"
      }`}
    >
      <Accordion
        title={
          <span
            className={`text-16 ${
              theme === "dark" ? "text-gray-300" : "text-black"
            }`}
          >
            About XLR Team
          </span>
        }
        answer={
          <div>
            <h3
              className={`text-16 font-bold ${
                theme === "dark" ? "text-gray-100" : "text-custom-red"
              }`}
            >
              All About Us
            </h3>
            <p
              className={`text-16 font-bold ${
                theme === "dark" ? "text-gray-300" : "text-zinc-400"
              }`}
            >
              XLR Team stands at the forefront of innovation, specializing in
              creating comprehensive solutions across web, mobile, and desktop
              platforms. We excel in leveraging cutting-edge technologies to
              deliver seamless, impactful experiences tailored to meet the
              diverse needs of our clients. We provide solutions at a reasonable
              cost, ensuring that our services are both effective and
              budget-friendly.
            </p>
            <ul
              className={`text-14 ${
                theme === "dark" ? "text-gray-300" : "text-black"
              }`}
            >
              <li>
                <a
                  href="https://www.instagram.com/_xlr.team03_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={20} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/XLR.Team"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={20} /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/XLRTeam03"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={20} /> X
                </a>
              </li>
              <li>
                <a href="mailto:xlr.devteam03@gmail.com">
                  <FaEnvelope size={20} /> Email: xlr.devteam03@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/0377783437">
                  <FaWhatsapp size={20} /> WhatsApp: 0377783437
                </a>
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-16 ${
              theme === "dark" ? "text-gray-300" : "text-black"
            }`}
          >
            Front-end
          </span>
        }
        answer={
          <div>
            <h3
              className={`text-16 font-bold ${
                theme === "dark" ? "text-gray-300" : "text-custom-red"
              }`}
            >
              Lenf (Pham Minh Hoang)
            </h3>
            <ul
              className={`text-14 ${
                theme === "dark" ? "text-gray-300" : "text-black"
              }`}
            >
              <li>
                <strong>Project Manager (PM):</strong> Oversees the project,
                coordinates between different teams, and ensures that the
                project goals and timelines are met.
              </li>
              <li>
                <strong>Developer (Dev):</strong> Handles the development of the
                front-end components, ensuring they are functional and integrate
                well with the back-end.
              </li>
              <li>
                <strong>UX/UI Designer:</strong> Designs the user interface and
                user experience, creating wireframes, prototypes, and ensuring a
                visually appealing and user-friendly design.
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-16 ${
              theme === "dark" ? "text-gray-300" : "text-black"
            }`}
          >
            Back-End
          </span>
        }
        answer={
          <div>
            <h3
              className={`text-16 font-bold ${
                theme === "dark" ? "text-gray-300" : "text-custom-red"
              }`}
            >
              ChuBA (Tran Thanh Hoang)
            </h3>

            <ul
              className={`text-14 ${
                theme === "dark" ? "text-gray-300" : "text-black"
              }`}
            >
              <li>
                <strong>Developer (Dev):</strong> Develops the back-end
                services, handles server-side logic, and ensures smooth data
                management and API integration.
              </li>
              <li>
                <strong>Database Administrator (DA):</strong> Manages the
                database, ensures data integrity, performance optimization, and
                handles database queries and schema design.
              </li>
            </ul>
          </div>
        }
      />
    </div>
  );
};

export default CreateBy;
