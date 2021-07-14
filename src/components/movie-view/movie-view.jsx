import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import './movie-view.scss';
import axios from 'axios';

export class MovieView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleAdd() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios.post(`https://myfilmdb.herokuapp.com/users/${user}` + "/movies/" +
            this.props.movieInfo._id, {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                alert(this.props.movieInfo.Title + " has been added to your favorites!");
            })
    }

    handleRemove() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios.delete(`https://myfilmdb.herokuapp.com/users/${user}` + "/movies/" +
            this.props.movieInfo._id, {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                alert(this.props.movieInfo.Title + " has been removed from your list.");
            })
    }

    render() {

        const { movieInfo } = this.props;

        return (
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="movie-view">
                        <div>
                            <Button onClick={() => { this.handleAdd(movieInfo); }}>Favorite</Button>
                        </div>
                        <div className="movie-poster">
                            <img src={movieInfo.ImagePath} />
                        </div>
                        <div className="movie-title">
                            <span className="label">Title: </span>
                            <span className="value">{movieInfo.Title}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movieInfo.Description}</span>
                        </div>
                        <Link to={`/directors/${movieInfo.Director.Name}`}>
                            <Button variant="link">Director</Button>
                        </Link>

                        <Link to={`/genres/${movieInfo.Genre.Name}`}>
                            <Button variant="link">Genre</Button>
                        </Link>
                        <Link to={`/`}>
                            <Button type="button">Back</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        );
    }
}

/*MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired
};*/
