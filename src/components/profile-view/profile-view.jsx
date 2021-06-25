import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Container from "react-bootstrap/Container";
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
}
