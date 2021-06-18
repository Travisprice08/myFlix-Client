import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';

import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://myfilmdb.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //componentWillUnmount {}
    //code executed just before the moment the componeent gets removed from the DOM

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state
       to that *particular user*/

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    render() {
        const { movies, selectedMovie, register, user } = this.state;

        if (register) return <RegistrationView onRegistration={register => this.onRegister(register)} />

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user
        details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {/* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise
                , all *movies will be returned*/}
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>

            /*<div className="main-view">
                {/* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise
                , all *movies will be returned}
                {selectedMovie
                    ? (
                        <Row className="justify-content-md-center">
                            <Col md={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        </Row>
                    )
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>*/
        );
    }
}