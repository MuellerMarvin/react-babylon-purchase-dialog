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

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene, true);
    var material = new BABYLON.StandardMaterial('sphereMaterial', scene);
    sphere.material = material;

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    function changeColor(r, g, b) {
      sphere.material.diffuseColor = new BABYLON.Color3(r, g, b);
    }

    let buttons = [];
    buttons.push(<button onClick={() => changeColor(1,0,0)}>red</button>);
    buttons.push(<button onClick={() => changeColor(0,0,1)}>blue</button>);

    this.setState({buttons: buttons});

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    // eslint-disable-next-line no-unused-vars
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene, true);

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
