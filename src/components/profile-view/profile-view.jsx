import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Row, Col, Form } from "react-bootstrap";

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: "",
            Email: "",
            Birthday: "",
            FavoriteMovies: [],

        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        this.getUsers(accessToken);
    }

    getUsers(token) {
        axios.get('https://myfilmdb.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    removeFavorite(movie) {
        const token = localStorage.getItem("token");
        const url = "https://myfilmdb.herokuapp.com/users" +
            localStorage.getItem("user") +
            "/movies/" +
            movieInfo._id;
        axios
            .delete(url, {
                headers: { Authorization: ` Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                this.componentDidMount();
                alert(movieInfo.Title + " has been removed from your list.");
            });
    }

    handleDelete() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios.delete(`https://myfilmdb.herokuapp.com/users/${user}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            , then(() => {
                alert(user + "has been unregistered.");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.pathname = "/";
            })
                .catch(function (error) {
                    console.log(error);
                });
    }

    handleUpdate() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        let setisValid = this.formValidation();
        if (setisValid) {
            axios.put(`https://myfilmdb.herokuapp.com/users/${user}`,
                {
                    Username: this.state.Username,
                    Password: this.state.Password,
                    Email: this.state.Email,
                    Birthday: this.state.Birthday,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then((response) => {
                    const data = response.data;
                    localStorage.setItem("user", data.Username);
                    console.log(data);
                    alert(user + "inforamation has been updated.");
                })
                .catch(function (error) {
                    console.log(error.response.data);
                })
        }
    }

    formValidation() {
        let UsernameError = {};
        let PasswordError = {};
        let EmailError = {};
        let BirthdateError = {};
        let isValid = true;
        if (this.state.Username.trim().length < 5) {
            UsernameError.usernameShort = "Username must be at least 5 characters";
            isValid = false;
        }
        if (this.state.Password.trim().length < 8) {
            PasswordError.passwordMissing = "Password must be at least 8 characters";
            isValid = false;
        }
        if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
            EmailError.emailNotEmail = "Please enter a valid email address";
        }
        if (this.state.birthdate === '') {
            BirthdateError.birthdateEmpty = "Please enter your date of birth";
            isValid = false;
        }
        this.setState({
            UsernameError: UsernameError,
            PasswordError: PasswordError,
            EmailError: EmailError,
            BirthdateError: BirthdateError,
        })

        return isValid;

    };

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }


    render() {
        const { user, movies } = this.props;
        const FavoriteMovieList = movies.filter((movie) => {
            return this.state.FavoriteMovies.includes(movieInfo._id);
        });

        return (
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" name="Username" placeholder="Change Username" value={this.state.Username} onChange={(e) => this.handleChange(e)} />
                            {Object.keys(UsernameError).map((key) => {
                                return (
                                    <div key={key} style={{ color: "red" }}>
                                        {UsernameError[key]}
                                    </div>
                                );
                            })}
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" name="Password" placeholder="Update Password" value={this.state.Password} onChange={(e) => this.handleChange(e)} />
                            {Object.keys(PasswordError).map((key) => {
                                return (
                                    <div key={key} style={{ color: "red" }}>
                                        {PasswordError[key]}
                                    </div>
                                );
                            })}
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" name="Email" placeholder="Update Email" value={this.state.Email} onChange={(e) => this.handleChange(e)} />
                            {Object.keys(EmailError).map((key) => {
                                return (
                                    <div key={key} style={{ color: "red" }}>
                                        {EmailError[key]}
                                    </div>
                                );
                            })}
                        </Form.Group>

                        <Form.Group controlId="formBirthdate">
                            <Form.Label>Birthdate:</Form.Label>
                            <Form.Control type="date" name="Birthdate" placeholder="Update Birthdate" value={this.state.Birthdate} onChange={(e) => this.handleChange(e)} />
                            {Object.keys(BirthdateError).map((key) => {
                                return (
                                    <div key={key} style={{ color: "red" }}>
                                        {BirthdateError[key]}
                                    </div>
                                );
                            })}
                        </Form.Group>
                        <Link to={`/users/${this.state.Username}`}>
                            <Button variant="primary" type="link" onClick={(e) => this.handleUpdate(e)}>Update</Button>
                        </Link>

                        <Link to={`/`}>
                            <Button variant="secondary" type="submit" onClick={(e) => { onBackClick(e); }}>Back</Button>
                        </Link>

                        <Button variant="danger" onClick={() => this.handleDelete()}>
                            Delete Profile
                        </Button>
                    </Form>

                    <div className="favoriteMovies">
                        <Card.Text>Favorites:</Card.Text>
                        <Row>
                            {FavoriteMovieList.map((movie) => {
                                return (
                                    <Col md={4} key={movieInfo._id}>
                                        <div key={movieInfo._id}>
                                            <Card>
                                                <Card.Img variant="top" src={movieInfo.ImagePath} />
                                                <Card.Body>
                                                    <Link to={`/movies/${movie._id}`}>
                                                        <Card.Title>{movieInfo.Title}</Card.Title>
                                                    </Link>
                                                    <Button onClick={() => this.removeFavorite(movie)}>Remove</Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>


                </Col>
            </Row>
        );
    }
}

/*ProfileView.propTypes = {
    movies: PropTypes.array.isRequired
};*/