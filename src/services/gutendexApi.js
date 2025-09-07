const BASE_URL = "https://gutendex.com/books";

export const searchBooks = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}?search=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};

export const getBooksByCategory = async (category, page = 1) => {
  const response = await fetch(
    `${BASE_URL}?topic=${encodeURIComponent(category)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch books by category");
  }
  return response.json();
};

export const getBookById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }
  return response.json();
};
