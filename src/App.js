import React from 'react';
import VestingScanner from './components/VestingScanner'; // Adjust the import path as per your project structure

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vested Launchpad Scanner</h1>
      </header>
      <main>
        <VestingScanner />
      </main>
    </div>
  );
}

export default App;
