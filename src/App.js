import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/BUtton';
import SignIn from './signIn/SignIn';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isError: false };
  }

  setError = bool => {
    this.setState({ isError: bool });
  };
  render() {
    return (
      <div className="App">
        <div style={{ position: 'absolute', marginLeft: '10px' }}>
          Simulasi kondisi :
          <div>
            <Button
              variant={this.state.isError ? 'contained' : ''}
              onClick={e => {
                e.preventDefault();
                this.setError(true);
              }}
            >
              Error
            </Button>
            <Button
              variant={!this.state.isError ? 'contained' : ''}
              onClick={e => {
                e.preventDefault();
                this.setError(false);
              }}
            >
              Success
            </Button>
          </div>
        </div>

        <SignIn isError={this.state.isError} />
      </div>
    );
  }
}

export default App;
