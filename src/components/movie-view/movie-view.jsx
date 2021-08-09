import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="movie-view">
                        <div className="movie-poster">
                            <img src={movie.ImagePath} />
                        </div>
                        <div className="movie-title">
                            <span className="label">Title: </span>
                            <span className="value">{movie.Title}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </div>
                        <button onClick={() => { onBackClick(null); }}>Back</button>
                    </div>
                </Col>
            </Row>
        );
    }
}