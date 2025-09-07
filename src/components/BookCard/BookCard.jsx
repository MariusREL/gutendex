import React from "react";
import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

const BookCard = ({ book }) => {
  const coverImage = book.formats["image/jpeg"];

  return (
    <Link to={`/book/${book.id}`} className={styles.card}>
      <img src={coverImage} alt={book.title} className={styles.cover} />
      <div className={styles.info}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>
          {book.authors.map((a) => a.name).join(", ")}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
