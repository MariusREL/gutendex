import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookList from "../../components/BookList/BookList";
import Pagination from "../../components/Pagination/Pagination";
import { searchBooks } from "../../services/gutendexApi";
import styles from "./Home.module.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await searchBooks(query, page);
          setBooks(data.results);
          setTotalPages(Math.ceil(data.count / data.results.length));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    } else {
      setBooks([]);
      setTotalPages(0);
    }
  }, [query, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ q: query, page: newPage });
  };

  return (
    <div className={styles.home}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!query && (
        <p className={styles.welcomeMessage}>
          Search for a book to get started, or select a category.
        </p>
      )}
      {query && !loading && !error && (
        <>
          <h2>Search results for "{query}"</h2>
          <BookList books={books} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
