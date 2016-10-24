import React, { Component } from 'react';
import MyLink from '../../lib/MyLink';
import { connect } from 'react-redux';
import { Socket } from 'phoenix';

// import pingEpic from '../../epics/pingEpic';
import {ping} from '../../ping';

const socket = new Socket("//localhost:4000/socket",{params: {user: "mike"}})

class Player extends Component {
  constructor(props){
    super(props);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.togglePing = this.togglePing.bind(this);
    this.state = {
      isPinging: false,
      audioMute: false,
      videoMute: false,
      videoStarted: false,
      videoButtonText: "start",
      myVideo: new MyLink({ownPlayer: "MyVideo", remotePlayer: "other"})
    }

  }

  componentDidMount(){
    let channel = socket.channel("videos:1")
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })


    channel.on("new_msg", msg => console.log("got msg", msg))

    console.log(this.state);
    /*debugger;*/
  }

/*  getUserMedia = () => {
    return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ;
  }*/

  startVideo = () => {
    this.state.myVideo.connect();
  }
  toggleVideo = () => {

    const stream = this.state.myVideo.streams.filter(s => !s.getVideoTracks()[0].remote)
    /*debugger;*/
    stream.getVideoTracks()[0].enabled = !(stream.getVideoTracks()[0].enabled)
  }

  togglePing = () => {
    this.props.ping()
  }

  componentDidUpdate(){
    debugger;
  }
  render() {
    const { isPinging } = this.state;
/*    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ;

    navigator.getUserMedia({audio: true, video: { width: 1280, height: 720}},
      (stream) => {
        console.log(stream);
        let video = document.querySelector('video');

        video.src = window.URL.createObjectURL(stream);
        video.onloadedmetadata = (e) => {
          video.play();
        }
      },
      (err) => {
        console.log("The following error occured " + err.name)
      }
    )*/
/*    const constrains = {
      audio: true,
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 776, ideal: 720, max: 1080 }
      }
    }


    navigator.mediaDevices.getUserMedia(
      { audio: true,
        video: { width: 1280, height: 720}
      }
    )
    .then(mediaStream => {
      console.log("mediaStream", mediaStream)
      let video = document.querySelector('video')
      video.src = window.URL.createObjectURL(mediaStream)
      video.onloadedmetadata = (e) => video.play();
    })
    .catch(err => console.log(err.name))*/

    /*const myVideo = new MyLink;*/

    return (
      <div>
        <video id="MyVideo"></video>
        <div className="chatScreen">

        </div>
        <a onClick={this.startVideo}>{this.state.videoButtonText}</a>
        <br />
        <a onClick={this.toggleVideo}>toggle</a>
        <br />
        <h1>is pinging: {isPinging.toString()}</h1>
        <button onClick={ping}>Start PING</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isPinging:    state.isPinging,
    pingReducer:  state.pingReducer
  }
}
export default connect(mapStateToProps, {ping})(Player);
