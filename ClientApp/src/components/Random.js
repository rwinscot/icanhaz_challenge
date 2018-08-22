import React, {Component} from 'react';

export class Random extends Component {
    displayName = Random.name;

    constructor(props) {
        super(props);

        this.tick = this.tick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        this.state = {
            refreshTimerID: undefined,
            refreshCount: 0,
            joke: "Loading..."
        }
    }

    render() {

        return (

            <div>
                <h3 className="display-4 text-muted">icanhazdadjoke.com</h3>
                <br />
                <br />
                <p>{this.state.joke}</p>
            </div>            
            
        );
    }

    tick() {
        
        fetch('/api/jokes/random', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(data => {

            let state = this.state;
            state.refreshCount = state.refreshCount + 1;
            state.joke = data[0].joke;
            
            this.setState(state);
        });
    }

    componentDidMount() {

        console.log("componentDidMount");

        let state = this.state;
        state.refreshTimerID = setInterval(() => this.tick(), 10000);
        state.refreshCount = 0;

        this.setState(state);
        this.tick();
    }

    componentWillUnmount() {

        console.log("componentWillUnmount");

        let state = this.state;
        state.refreshTimerID = clearInterval(this.state.refreshTimerID);
        state.refreshCount = 0;

        this.setState(state);
    }

}
