import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name;

  render() {
      
    return (
      <div>
        <br />
        <p>Welcome to the Degreed Jokes Challenge, built with:</p>
        <ul>
          <li>ASP.NET Core and C# for cross-platform server-side code</li>
          <li>ReactJS for client-side code</li>
          <li>Bootstrap for layout and styling</li>
        </ul>
      </div>
    );
    
  }
}
