import React from "react";
import useFavorites from "../../hooks/useFavorites";
import BookList from "../../components/BookList/BookList";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favorites}>
      <h2>My Favorites</h2>
      {favorites.length > 0 ? (
        <BookList books={favorites} />
      ) : (
        <p>You have no favorite books yet.</p>
      )}
    </div>
  );
};

export default Favorites;
