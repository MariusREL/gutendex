import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../services/gutendexApi";
import useFavorites from "../../hooks/useFavorites";
import styles from "./BookDetails.module.css";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = book && favorites.some((fav) => fav.id === book.id);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookById(bookId);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Book not found.</p>;

  const coverImage = book.formats["image/jpeg"];
  const ebookLink =
    book.formats["text/html"] ||
    book.formats["application/pdf"] ||
    book.formats["text/plain"];

  return (
    <div className={styles.details}>
      <div className={styles.cover}>
        {coverImage && <img src={coverImage} alt={book.title} />}
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{book.title}</h1>
        <p>
          <strong>Author:</strong> {book.authors.map((a) => a.name).join(", ")}
        </p>
        <p>
          <strong>Downloads:</strong> {book.download_count}
        </p>
        <p>
          <strong>Category:</strong> {book.subjects.slice(0, 3).join(", ")}
        </p>
        <p>
          <strong>Language:</strong> {book.languages.join(", ")}
        </p>
        {ebookLink && (
          <a href={ebookLink} target="_blank" rel="noopener noreferrer">
            Read Book
          </a>
        )}
        <button onClick={handleFavoriteClick} className={styles.favButton}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
