import React, { Component } from "react";
import './style.css';
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class Form extends Component {
    state = {
        from: "",
        to: "Stockholm",
        date: new Date()
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.from, this.state.to);
        console.log(this.state.from);
        console.log(this.state.to);
    }

    handleDateChange = (date) =>{
        this.setState({date: date})
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className="searchInput From" type="text" value={this.state.From} onChange={event => this.setState({ from: event.target.value })} placeholder="From" required />
                <select onChange={event => this.setState({ to: event.target.value})}>
                    <option value="Stockholm">Stockholm</option>
                    <option value="Falun">Falun</option>
                    <option value="Åre">Åre</option>
                </select>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    dateFormat= "YYYY/MM/dd"
                />
                <button className="searchInput submitBtn">Go!</button>
            </form>
        );
    }
}

