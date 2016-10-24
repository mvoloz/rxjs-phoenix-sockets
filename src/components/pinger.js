import React,  { Component } from 'react';
import { connect } from 'react-redux';
/*import pingReducer from '../ping';
import { ping } from '../ping';*/

import {
  ping
} from '../ping';

class Pinger extends Component {
  constructor(props){
    super(props);
    this.togglePing = this.togglePing.bind(this)

    this.state = {
      isPinging: false
    }
  }

  componentDidUpdate = () => {
    const { isPinging } = this.props.pingReducer;
    this.setState({isPinging})
  }
  togglePing = () => {
    this.props.ping()
  }


  render(){
    const { isPinging } = this.state

    return (
      <div>
        <h1>is pinging: {isPinging.toString()}</h1>
        <button onClick={this.togglePing}>Start PING</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isPinging: state.isPinging,
    pingReducer: state.pingReducer
  }
}

export default connect(mapStateToProps, {ping})(Pinger)
/*export default Pinger;*/
