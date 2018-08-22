import React, {Component} from 'react';
import Highlight from 'react-highlighter';


export class Search extends Component {
    displayName = Search.name;

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        this.state = {
            jokes: [],
            searchTerm: "",
            hideResults: true
        }
    }

    render() {

        let jokeList = [];
        for (let i = 0; i < this.state.jokes.length; i++) {

            let joke = this.state.jokes[i].joke;
            let searchTerm = this.refs.searchTerm.value;
            let wordCount = this.state.jokes[i].wordCount;
            let wordCountCategory = this.state.jokes[i].wordCountCategory;

            jokeList.push(<li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                <Highlight search={searchTerm}>{joke}</Highlight><span
                className="badge badge-primary badge-pill">{wordCountCategory}: {wordCount}</span></li>);
        }

        return (

            <div>
                <h3 className="display-4 text-muted">icanhazdadjoke.com</h3>
                <br />
                <p>
                    <input ref="searchTerm" type="text" className="form-control" placeholder="Jokes with the term..."/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                            onClick={this.search}>Search
                    </button>
                </p>
                <br />
                <p hidden={this.state.hideResults}>
                    <ul className="list-group list-group-flush">{jokeList}</ul>
                    <br/>
                    <div><span id="resultsCount">your search returned {this.state.jokes.length} result(s)</span></div>
                </p>
            </div>
            
        );
    }

    search() {

        let term = this.refs.searchTerm.value;

        fetch('/api/jokes/search?term=' + term, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(data => {

            let state = this.state;
            state.hideResults = false;
            state.jokes = data;

            this.setState(state);
        });
    }

    componentDidMount() {

        console.log("componentDidMount");
    }

    componentWillUnmount() {

        console.log("componentWillUnmount");
    }

}
