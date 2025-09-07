import React from "react";
import BookCard from "../BookCard/BookCard";
import styles from "./BookList.module.css";

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
