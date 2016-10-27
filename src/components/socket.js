import React, { Component } from 'react';
import {connect} from 'react-redux';

// import {startSocket, createWebSocket} from './socker/socketEpic';
import {
  createSocket,
  pushMessage
} from './socker/actions';


class Socker extends Component {
  constructor(props){
    super(props);

    this.connectSocket = this.connectSocket.bind(this);
    this.sendMessage   = this.sendMessage.bind(this);

    this.state = {
      msgValue: ''
    }
  }

/*  componentDidUpdate = () => {
    debugger;
  }*/
  connectSocket = () => {
    this.props.createSocket("video:1")
  }

  sendMessage = () => {
    const { msgValue } = this.state
    this.props.pushMessage({channel: this.props.socketReducer.channel,msg:msgValue});
    this.setState({msgValue: ''})
  }
  render(){
    const { joinStatus, newMsg } = this.props.socketReducer

    return (
      <div>
        <div>  </div>
        <br />
        <br />
        { joinStatus }
        <button onClick={this.connectSocket}>Connect</button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <textarea onChange={(e) => this.setState({msgValue: e.target.value})} />
        <br />
        <br />
        <a onClick={this.sendMessage}>Send </a>
        <br />
        <br />
        <br />
        <div> { newMsg }</div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    socketReducer: state.socketReducer,

  }
}

export default connect(mapStateToProps, { createSocket, pushMessage })(Socker)
