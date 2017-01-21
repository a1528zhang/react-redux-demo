import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import AgoraRTC from './AgoraRTCSDK-1.8.0'

class Meeting extends Component {
    render() {
        let channel = "2";
        let client = AgoraRTC.createRtcClient();
        console.log(AgoraRTC.createClient());
        client.join(channel, undefined, function(uid) {
            console.log("User " + "b7c2835c0fc941e480664d982f9dd88a" + " join channel successfully");
            console.log("Timestamp: " + Date.now());
            localStream = AgoraRTC.createStream({
                streamID: "b7c2835c0fc941e480664d982f9dd88a",
                audio: true,
                cameraId: videoSource.value,
                microphoneId: "",
                video: true,
                screen: false
            });
            localStream.setVideoProfile("120P");
            localStream.init(function(){
                displayStream('66666', localStream,"100", "100", '');
            })
        });
        return (
            <div>
                <p>meeting</p>
                <input placeholder="roomNum"></input>
                <div id="66666">
                    <div id="66666b7c2835c0fc941e480664d982f9dd88a" className="video-item" data-stream-id="b7c2835c0fc941e480664d982f9dd88a"></div>
                </div>
            </div>
        )
    }
}

function displayStream(tagId, stream, width, height, className, parentNodeId) {
    stream.play("66666b7c2835c0fc941e480664d982f9dd88a");
}

export default Meeting;