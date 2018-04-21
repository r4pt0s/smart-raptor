import React, { Component } from 'react';

import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js'

import './App.css';


const particlesOptions= {
  particles: {
    number:{
      value: 30,
      density:{
        enable:true,
        value_area: 800
      }
    }
  }
}

const initialState= {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
} 

class App extends Component {
  constructor(){
    super();
    this.state= initialState;
  }

  loadUser = (data) => {
    this.setState({
      user:{
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
     }
  })

  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiData= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;

    return{
      leftCol: clarifaiData.left_col * width,
      topRow: clarifaiData.top_row * height,
      rightCol: width -(clarifaiData.right_col * width),
      bottomRow: height -(clarifaiData.bottom_row * height),
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})

    fetch('https://dry-beach-24784.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body:JSON.stringify({
          inputUrl: this.state.input
        })
    })
    .then(response => response.json())
    .then( response => {
        if(response.status.code === 10000)
        {
            fetch('https://dry-beach-24784.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-type': 'application/json'},
              body:JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}));
              })
            this.displayFaceBox(this.calculateFaceLocation(response))
          }

    })
    .catch( err => console.log(err));
  }

  onRouteChange = (whereTo) =>{

    if(whereTo === 'signout')
    {
      this.setState(initialState);
    }else if(whereTo === 'home'){
      this.setState({isSignedIn: true});

    }
    this.setState({route: whereTo});
  }

  render() {
    const {isSignedIn, route, box, imageUrl}= this.state;

    return (
      <div className="App">

        <Particles className="particles" params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange= {this.onRouteChange}/>
        {route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl= {imageUrl}/>
            </div>
          :((route === 'signin' || route === 'signout') 
            ?<SignIn loadUser={this.loadUser} onRouteChange= {this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange= {this.onRouteChange}/>
            )          
        }
      </div>
    );
  }
}

export default App;

// <Particles className="particles" params={particlesOptions}/>