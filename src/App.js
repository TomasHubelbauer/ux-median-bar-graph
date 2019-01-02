import React, { Component } from 'react';
import MedianBarGraph from './MedianBarGraph';

class App extends Component {
  render() {
    const values = [
      { runtime: 60, result: 'success' },
      { runtime: 70, result: 'success' },
      { runtime: 50, result: 'success' },
      { runtime: 60, result: 'success' },
      { runtime: 350, result: 'error' },
      { runtime: 30, result: 'error' },
      { runtime: 10, result: 'progress' },
    ];

    return (
      <div>
        <MedianBarGraph values={values} factor={1.5} />
      </div>
    );
  }
}

export default App;
