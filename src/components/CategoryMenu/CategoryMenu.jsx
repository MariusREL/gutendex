import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CategoryMenu.module.css";
import {
  FaBookOpen,
  FaQuestionCircle,
  FaHeart,
  FaBalanceScale,
  FaUsers,
  FaGavel,
  FaBrain,
} from "react-icons/fa";
import {
  GiKnifeThrust,
  GiFairy,
  GiCrown,
  GiCompass,
  GiSwordman,
} from "react-icons/gi";
import { BsMask } from "react-icons/bs";

const categories = [
  { name: "Fiction", icon: <FaBookOpen /> },
  { name: "Mystery", icon: <FaQuestionCircle /> },
  { name: "Thriller", icon: <GiKnifeThrust /> },
  { name: "Romance", icon: <FaHeart /> },
  { name: "Fantasy", icon: <GiFairy /> },
  { name: "Morality", icon: <FaBalanceScale /> },
  { name: "Society", icon: <FaUsers /> },
  { name: "Power", icon: <GiCrown /> },
  { name: "Justice", icon: <FaGavel /> },
  { name: "Adventure", icon: <GiCompass /> },
  { name: "Tragedy", icon: <BsMask /> },
  { name: "War", icon: <GiSwordman /> },
  { name: "Philosophy", icon: <FaBrain /> },
];

const CategoryMenu = ({ isMobile, onLinkClick }) => {
  const navLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={isMobile ? styles.mobileMenu : styles.desktopMenu}>
      {categories.map((category) => (
        <NavLink
          key={category.name}
          to={`/category/${category.name.toLowerCase()}`}
          className={navLinkClass}
          onClick={onLinkClick}
        >
          <div className={styles.icon}>{category.icon}</div>
          <span className={styles.text}>{category.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default CategoryMenu;
