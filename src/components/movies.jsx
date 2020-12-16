import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;
    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(m =>
        m.genre._id === selectedGenre._id);

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order])
    const movies = paginate(sortedMovies, currentPage, pageSize);
    return { totalCount: filteredMovies.length, data: movies };
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    if (count === 0) return <p>No movies in database.</p>
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div style={{ marginTop: '20px' }} className='row'>
        <div className='col-3'>
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre} />
        </div>
        <div className='col'>
          <Link
            to='/movies/add'
            className='btn btn-primary'
            style={{ marginBottom: 20 }}
          >
            Add Movie
          </Link>
          <p>Showing {totalCount} movies.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;