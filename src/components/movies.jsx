import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Likes from './likes';
import Pagination from './pagination'
import { paginate } from '../utiles/paginate'

export default class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
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
    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage } = this.state;
        if (count === 0) return <p>no movies</p>
        const movies = paginate(this.state.movies, currentPage, pageSize);
        return (
            <React.Fragment>
                <p>Showing {count} movies database</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Likes
                                    liked={movie.liked}
                                    onClick={() => this.hanldeLike(movie)}
                                /></td>
                                <td><button onClick={() => this.deleteItem(movie)} className="btn btn-warning">Delete</button></td>
                            </tr>))}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    onPageChange={this.handlePageChange}
                    currentPage={currentPage}
                />
            </React.Fragment>
        )
    }
    deleteItem = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({
            movies: movies
        })
    }

}