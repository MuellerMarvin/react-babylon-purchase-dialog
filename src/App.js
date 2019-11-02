import React from 'react';
import Scene from './babylonScene.tsx';
import './App.css';


function App() {
  return (
    <div className="App">
      <PurchaseDialog></PurchaseDialog>
    </div>
  );
}

function PurchaseDialog() {
  return(
    <div className="PurchaseDialog">
      <Scene></Scene>
      <div className=""></div>
    </div>
  );
}

export default App;
