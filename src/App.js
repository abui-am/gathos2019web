import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './signIn/SignIn';

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SignIn check={true} />
      </div>
    );
  }
}

export default App;
