
class MyLink {
  constructor(data = {}){
    console.log(data);

    this.ownPlayer = data.ownPlayer;

    this.VERSION = '0.0.01';

    this.DATA_CHANNEL_STATE = {
      CONNECTING: 'connecting',
      OPEN: 'open',
      CLOSING: 'closing',
      CLOSED: 'closed',
      ERROR: 'error'
    };

    this.DATA_CHANNEL_TYPE = {
      MESSAGING: 'messaging',
      DATA: 'data'
    };
    this._enableDataChannel = true;

    this._dataChannels = {};
    this.videoSource = {};
    this.myStream = {};
    this.streams = [];
  }

    connect = () => {
/*      let p = navigator.mediaDevices.getUserMedia({ audio: false, video: true });

      return p.then(mediaStream => {
        let video = document.getElementById(this.ownPlayer);
        video.src = window.URL.createObjectURL(mediaStream);
        video.onloadedmetadata = (e) => {
          video.play()
        }
      })*/

      return navigator.mediaDevices.getUserMedia(
        {
          audio: false,
          video: true
        }
      )
      .then(stream => this.gotStream(stream))
      .catch(error => console.log(error))

    }

    gotStream = (stream) => {
      this.streams.push(this.setupStream(stream));

      this.videoSource = document.getElementById(this.ownPlayer)
      this.videoSource.src = window.URL.createObjectURL(stream);
      return stream;

    }
    setupStream = (stream) => {
      stream.onactive = (e) => alert("ACTIVE")
      stream.oninactive = (e) => alert("INACTIVE")
      return stream;
    }
    playVideo = () => {
      const video = this.videoSource;
      return video;

    }
    stopVideo = () => {
      const video = this.videoSource
      video.onloadedmetadata = (e) => video.stop();
    }

/*    generateUUID = () => {
      let d = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const random = (d + Math.random() * 16) % 16 | 0;
        // d = Math.floor(d / 16);
        return (c === 'x' ? random : (random & 0x7 | 0x8)).toString(16);
      });
      return uuid;
    };*/

    _createDataChannel = (peerId, channelType, dc, customChannelName) => {

      if (typeof dc === 'string'){
        customChannelName = dc
        dc = null;
      }
    }


}

export default MyLink;
