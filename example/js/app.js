import React, { Component } from 'react';
import { render } from 'react-dom';
import { Usage, Usage0, Usage1, Usage1a, Usage2, Usage2a, Usage2b } from './usage';
import '../css/app.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Usage />
        <div className="filler" />
        <Usage0 />
        <div className="filler" />
        <Usage1 />
        <div className="filler" />
        <Usage1a />
        <div className="filler" />
        <Usage2 />
        <div className="filler" />
        <Usage2a />
        <div className="filler" />
        <Usage2b />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
