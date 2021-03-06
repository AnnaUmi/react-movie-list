import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

import Pagination from './pagination'
import { paginate } from '../utiles/paginate'
import ListGroup from './listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash'

export default class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        sortColumn: { path: 'title', order: 'asc' }
    }
    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
        console.log(genres)
        this.setState({ movies: getMovies(), genres })
    }
    hanldeLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked
        this.setState({
            movies: movies
        })

    }
    handlePageChange = page => {
        this.setState({ currentPage: page })
    }
    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }
    handleSort = path => {
        const sortColumn = { ...this.state.sortColumn };
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc'
        }
        this.setState({ sortColumn })
    }
    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        if (count === 0) return <p>no movies</p>
        const movies = paginate(sorted, currentPage, pageSize);
        return (
            <div className="row">
                <div className="col-md-4">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    >
                    </ListGroup>
                </div>
                <div className="col-md-8">
                    <p>Showing {filtered.length} movies database</p>
                    <MoviesTable movies={movies} onLike={this.hanldeLike} onDelete={this.deleteItem}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>

        )
    }
    deleteItem = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({
            movies: movies
        })
    }

}