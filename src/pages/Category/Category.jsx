import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BookList from "../../components/BookList/BookList";
import Pagination from "../../components/Pagination/Pagination";
import { getBooksByCategory } from "../../services/gutendexApi";
import styles from "./Category.module.css";

const Category = () => {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBooksByCategory(categoryName, page);
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [categoryName, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className={styles.category}>
      <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
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

export default Category;
