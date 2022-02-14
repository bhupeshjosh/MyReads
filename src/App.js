import React from "react";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./SearchPage";
import "./App.css";
import { Link, Route } from "react-router-dom";
import BookShelf from "./BookShelf";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksInShelf: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((x) =>
      this.setState({
        booksInShelf: [...x],
      })
    );
  }

  handleChange = (b, s) => {
    BooksAPI.update(b, s).then(() => {
      BooksAPI.getAll().then((x) => this.setState({ booksInShelf: [...x] }));
    });
  };

  bookToShelfMap() {
    let map = new Map();
    for (let b of this.state.booksInShelf) {
      map.set(b.id, b.shelf);
    }
    return map;
  }

  render() {
    const currentlyReading = this.state.booksInShelf.filter(
      (x) => x.shelf === "currentlyReading"
    );
    const read = this.state.booksInShelf.filter((x) => x.shelf === "read");
    const wanttoread = this.state.booksInShelf.filter(
      (x) => x.shelf === "wantToRead"
    );
    return (
      <div className="app">
        <Route path={"/search"}>
          <SearchPage
            dict={this.bookToShelfMap()}
            handleChange={this.handleChange}
          />
        </Route>
        <Route exact path={"/"}>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={currentlyReading}
                  readStatus="Currently Reading"
                  handleChange={this.handleChange}
                />
                <BookShelf
                  books={wanttoread}
                  readStatus="Want To read"
                  handleChange={this.handleChange}
                />
                <BookShelf
                  books={read}
                  readStatus="Read"
                  handleChange={this.handleChange}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to={"/search"}>
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        </Route>
      </div>
    );
  }
}
export default BooksApp;
