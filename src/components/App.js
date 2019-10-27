import React, { Component } from "react";
import nav from "./nav";
import SearchBox from "./SearchBox";

import MovieList from "./MovieList";
import Pagination from "./pagination";
import MovieDetails from "./MovieDetails";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchItem: "",
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    };
    this.apiKey = "a63db4d8ed9a5af15e2dd254142cdf3f";
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchItem}`
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({
          movies: [...data.results],
          totalResults: data.total_results
        });
      });
  };

  nextPage = pageNumber => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchItem}&page=${pageNumber}`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({ movies: [...data.results], currentPage: pageNumber });
      });
  };

  handleChange = e => {
    this.setState({ searchItem: e.target.value });
  };

  viewMovieInfo = id => {
    const filteredMovie = this.state.movies.filter(movie => movie.id == id);
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;

    this.setState({ currentMovie: filteredMovie });
  };

  close4MovieInfo = () => {
    this.setState({ currentMovie: null });
  };

  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);

    return (
      <div>
        <nav />
        {this.state.currentMovie == null ? (
          <div>
            <SearchBox
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            <MovieList
              viewMovieInfo={this.viewMovieInfo}
              movies={this.state.movies}
            />
          </div>
        ) : (
          <MovieDetails close4MovieInfo={this.close4MovieInfo} />
        )}

        {this.state.totalResults > 20 ? (
          <Pagination
            pages={numberPages}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default App;
