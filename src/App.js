import React, { Component } from 'react';

import './App.css';
import Home from "./Component/Home";

class App extends  Component{



  state ={users:[]}

  componentDidMount() {

  }


  render(){
      //const values= this.state.users.map(user=><li key={user.id}>{user.username}</li> )

    return ( <div className="App">
            <Home/>
      </div>
    );
  }

}

export default App;
