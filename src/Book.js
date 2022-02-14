import React from "react";
import PropTypes from "prop-types";

function Book(props) {
  function handleShelfChange(e) {
    const newShelf = e.target.value;
    const book = props.book;
    if (newShelf !== book.shelf) {
      props.handleChange(book, newShelf);
    }
  }

  const book = props.book;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: book.imageLinks
              ? `url(${book.imageLinks.thumbnail})`
              : "",
          }}
        />
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={handleShelfChange}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors ? book.authors.join(",") : ""}
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default Book;
