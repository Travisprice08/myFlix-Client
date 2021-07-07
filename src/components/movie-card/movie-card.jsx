import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movieInfo } = this.props;

        return (
            <div>
                <Card>
                    <Card.Img variant="top" src={movieInfo.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movieInfo.Title}</Card.Title>
                        <Card.Text>{movieInfo.Description}</Card.Text>
                        <Link to={`/movies/${movieInfo._id}`}>
                            <Button variant="link">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}

/*MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    //onMovieClick: PropTypes.func.isRequired
};*/