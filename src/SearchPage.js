import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import SearchResult from "./SearchResult";
import PropTypes from "prop-types";

function SearchPage(props) {
  const [searchtext, setText] = useState("");
  const [books, setBooks] = useState([]);

  let timer = null;
  /**
   * Below code debounces the onchange event
   * When user enter value in search field
   * Handle onchange code is executed completely only when user takes a pause after typing.
   */
  function handleTextChange(event) {
    const searchval = event.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setText(searchval);
    }, 1000);
  }
  useEffect(
    () => {
      if (searchtext !== "") {
        search(searchtext).then((x) => {
          // if result is an instance of Array means the search api has resulted in Books array successfully
          if (x instanceof Array) {
            setBooks(x);
          } else {
            // else case handles the case if search parameter is invalid or doesnt result in an array.
            setBooks([]);
          }
        });
      }
    },
    [searchtext]
  );

  function getBookShelfInfo(x) {
    const map = props.dict;
    return x.map((b) => {
      if (map.has(b.id)) {
        b.shelf = map.get(b.id);
      } else {
        b.shelf = "none";
      }
      return b;
    });
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        {<Link className="close-search" to={"/"} />}
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={handleTextChange}
          />
        </div>
      </div>
      <SearchResult
        books={getBookShelfInfo(books)}
        handleChange={props.handleChange}
      />
    </div>
  );
}

SearchPage.propTypes = {
  dict: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default SearchPage;
