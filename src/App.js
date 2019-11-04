import React from 'react';
import * as BABYLON from 'babylonjs';
import './App.css';
import BabylonScene from './babylonComponent';
import 'babylonjs-loaders';

class App extends React.Component {
  render() {
    return(
      <div className="App">
        <PurchaseDialog itemName="Beautiful Ring" itemPrice="29.99€"></PurchaseDialog>
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

  onSceneMount = async (e) => {
    const { canvas, scene, engine } = e;

    // Make scene-background white
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // create a camera that rotates around the Scene-Origin
    var camera = new BABYLON.ArcRotateCamera('rotatingCamera', 0, 1, 5, BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // limit the camera's movement (prevent it from zooming)
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 5;

    // create a light and set its intensity
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1;

    // create the itemMaterial
    var material = new BABYLON.StandardMaterial('itemMaterial', scene);

    // create the item in the scene and apply a material to it
    await BABYLON.SceneLoader.ImportMesh('', '/assets/', 'Ring.glb', scene, function onSuccess(meshes) {
      // applies the material to all the meshes in the item
      scene.meshes.forEach(mesh => {
        mesh.material = material;
      });

      // this prevents the item from being see-trough
      scene.getMaterialByName("itemMaterial").backFaceCulling = false;
    });

    function changeColor(r, g, b) {
      // changes the color of the material, that is applied when the item has loaded
      scene.getMaterialByName("itemMaterial").diffuseColor = new BABYLON.Color3(r, g, b);
    }

    let buttons = [];
    buttons.push(<ColorButton key="white" colorName="White" hexColor="#FFFFFF" onClick={() => changeColor(1,1,1)}></ColorButton>);
    buttons.push(<ColorButton key="red" colorName="Red" hexColor="#FF0000" onClick={() => changeColor(1,0,0)}></ColorButton>);
    buttons.push(<ColorButton key="green" colorName="Green" hexColor="#00FF00" onClick={() => changeColor(0,1,0)}></ColorButton>);
    buttons.push(<ColorButton key="blue" colorName="Blue" hexColor="#0000FF" onClick={() => changeColor(0,0,1)}></ColorButton>);

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
        <BabylonScene onSceneMount={ this.onSceneMount }/>
        <ItemConfigurator buttons={ this.state.buttons } itemName={ this.props.itemName } itemPrice={ this.props.itemPrice }></ItemConfigurator>
      </div>
    );
  }
}

class ItemConfigurator extends React.Component {
  render() {
    return(
      <div className="ItemConfigurator">
        <p className="ItemName">{ this.props.itemName }</p>
        <p className="ItemPrice">{ this.props.itemPrice }</p>
        <p className="ColorHeader">Available colors:</p>
        { this.props.buttons }
      </div>
    );
  }
}

class ColorButton extends React.Component {
  render() {
    return(
      <div className="ColorButton" onClick={ this.props.onClick }>
        <ColorDot hexColor={ this.props.hexColor }></ColorDot>
          <p className="unselectable">{ this.props.colorName }</p>
      </div>
    );
  } 
}

function ColorDot(props) {
  return(
    <div className="ColorDot" style={{ backgroundColor: props.hexColor }}>
    </div>
  );
}

export default App;
