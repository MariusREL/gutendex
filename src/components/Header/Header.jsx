import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import Modal from "../Modal/Modal";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";
import { FaHeart } from "react-icons/fa";

const Header = ({ theme, toggleTheme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 1320;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <h1>Gutendex</h1>
        </Link>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <nav className={styles.nav}>
        {isMobile ? (
          <button onClick={toggleModal} className={styles.menuButton}>
            Categories
          </button>
        ) : (
          <CategoryMenu />
        )}
        <Link to="/favorites" className={styles.favLink}>
          <FaHeart />
          <span>Favorites</span>
        </Link>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </nav>
      {isMobile && isModalOpen && (
        <Modal onClose={toggleModal}>
          <CategoryMenu isMobile={true} onLinkClick={toggleModal} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
