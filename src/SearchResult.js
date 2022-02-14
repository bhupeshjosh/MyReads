import React from "react";
import Book from "./Book";

function SearchResult(props) {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {props.books.map((x) => (
          <li key={x.id}>
            <Book book={x} handleChange={props.handleChange} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default SearchResult;
