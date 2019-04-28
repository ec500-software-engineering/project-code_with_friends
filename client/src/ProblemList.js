import React, { Component } from 'react';
import './App.css';
//import ReactDOM from 'react-dom'

class ProblemList extends Component {
    constructor() {
        super();
        this.state = {
            problems: [],
            doneLoading: false
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/problems", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then((response) => {
                response.json()
                    .then( body => this.setState({ problems: body.problems, doneLoading: true }));
            },
            (error) => {
                alert(error);
            })
    }

    render() {
        if (this.state.doneLoading === true) {
            /*
            var prob_des = this.state.problems.map((problem,i) =>
                <li className="prob_desc" key={i}>{problem.description} submitted by {problem.user}</li>
            );
            */
            var prob_des = this.state.problems.map((problem,i) =>
                <li className="prob_desc" key = {i}>
                    <div className="one_problem">
                        <span className="prob_title"><a href={"/editor/" + problem.title.split(' ').join('+')}>{problem.title}</a></span>
                        <span className="prob_type">{problem.problem_type}</span>
                        <span className="prob_difficulty">{problem.difficulty}</span>
                        <span className="prob_user">{problem.user}</span>
                    </div>
                </li>
            );
            return (
                <div className="ProblemList">
                    <ul>
                        {prob_des}
                    </ul>
                </div>
            )
        } else {
            return (
                <p id="test">loading...</p>
            )
        }
    }
}

export default ProblemList;
