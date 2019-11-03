import React from 'react';
import * as BABYLON from 'babylonjs';
import './App.css';
import BabylonScene from './babylonComponent';


class App extends React.Component {

  render() {
    return(
      <div className="App">
        <PurchaseDialog></PurchaseDialog>
      </div>
    );
  }
}

class PurchaseDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: [],
    };
  }

  onSceneMount = (e) => {
    const { canvas, scene, engine } = e;

    // Make scene-background white
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // create a camera that rotates around the Scene-Origin
    var camera = new BABYLON.ArcRotateCamera('rotatingCamera', 0, 0, 10, BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // create a light and set its intensity
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // create the item in the scene and apply a material to it
    var item = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene, true);
    var material = new BABYLON.StandardMaterial('sphereMaterial', scene);
    item.material = material;

    function changeColor(r, g, b) {
      item.material.diffuseColor = new BABYLON.Color3(r, g, b);
    }

    let buttons = [];
    buttons.push(<button onClick={() => changeColor(1,0,0)}>red</button>);
    buttons.push(<button onClick={() => changeColor(0,0,1)}>blue</button>);

    this.setState({buttons: buttons});

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  }

  render() {
    return(
      <div className="PurchaseDialog">
        <BabylonScene onSceneMount={ this.onSceneMount }  />
        <ItemConfigurator buttons={ this.state.buttons }></ItemConfigurator>
      </div>
    );
  }
}

class ItemConfigurator extends React.Component {
  render() {
    return(
      <div class="ItemConfigurator">
        {
          this.props.buttons
        }
      </div>
    );
  }
}

export default App;
