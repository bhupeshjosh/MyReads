import React from "react";
import Book from "./Book";

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.readStatus}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((x) => (
              <li key={x.id}>
                <Book book={x} handleChange={this.props.handleChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
