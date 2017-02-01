import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import AgoraRTC from './AgoraRTCSDK-1.8.0'

class Meeting extends Component {
    render() {
        let channel = "123";
        let client = AgoraRTC.createRtcClient();
        console.log(AgoraRTC.createClient());
        client.on('error', function(err) {
            console.log(err);
            if (err.reason === 'INVALID_CHANNEL_NAME') {
                $.alert("Invalid channel name, Chinese characters are not allowed in channel name.");
            }
        });
        client.init("b7c2835c0fc941e480664d982f9dd88a",function(obj){
            console.log("AgoraRTC client initialized");
            AgoraRTC.getDevices(function(devices){
                let audioSelect = document.querySelector('select#audioSource');
                let videoSelect = document.querySelector('select#videoSource');
                for (var i = 0; i !== devices.length; ++i) {
                    var device = devices[i];
                    var option = document.createElement('option');
                    option.value = device.deviceId;
                    if (device.kind === 'audioinput') {
                        option.text = device.label || 'microphone ' + (audioSelect.length + 1);
                        audioSelect.appendChild(option);
                        console.log('audioinput is: ', device);
                    } else if (device.kind === 'videoinput') {
                        option.text = device.label || 'camera ' + (videoSelect.length + 1);
                        videoSelect.appendChild(option);
                        console.log('videoinput is: ', device);
                    } else {
                        console.log('Some other kind of source/device: ', device);
                    }
                }
                console.log(device);
            });
            client.join(channel, undefined, function(uid) {
                console.log("User " + uid + " join channel successfully");
                console.log("Timestamp: " + Date.now());

                let localStream = AgoraRTC.createStream({
                    streamID: uid,
                    audio: true,
                    cameraId: videoSource.value,
                    microphoneId: audioSource.value,
                    video: true,
                    screen: false
                });
                console.log(videoSource.value);
                console.log(audioSource.value);
                localStream.setVideoProfile("120P");
                localStream.init(function(){
                    console.log("Get UserMedia successfully");
                    displayStream('66666', localStream,"100", "100", '',"");
                    client.publish(localStream, function(err) {
                        console.log("Timestamp: " + Date.now());
                        console.log("Publish local stream error: " + err);
                    });
                })
            },function(obj){
                console.log(obj);
            });
            client.on('stream-added', function (evt) {
                let stream = evt.stream;
                console.log("New stream added: " + stream.getId());
                console.log("Timestamp: " + Date.now());
                console.log("Subscribe ", stream);
                client.subscribe(stream, function (err) {
                    console.log("Subscribe stream failed", err);
                });
                stream.play("remoteView");
            });
        })

        return (
            <div>
                <div id="div_device" className="panel panel-default">
                    <div className="select">
                        <label htmlFor="audioSource">Audio source: </label><select id="audioSource"></select>
                    </div>
                    <div className="select">
                        <label htmlFor="videoSource">Video source: </label><select id="videoSource"></select>
                    </div>
                </div>
                <p>meeting</p>
                <input placeholder="roomNum"></input>
                <div id="video-container-multiple">
                    <div id="66666b7c2835c0fc941e480664d982f9dd88a" className="" data-stream-id="b7c2835c0fc941e480664d982f9dd88a" style={{height:'100px',width:'100px'}}></div>
                </div>
                <div id="remoteView" className="remote-view"></div>
            </div>
        )
    }
}

function displayStream(tagId, stream, width, height, className, parentNodeId) {
    var styleStr = 'width:' + width + 'px; height:' + height + 'px;';
    var $container = $("#video-container-multiple");
    console.log(stream.getId()+"***-*-*-*-*-*-*");
    $container.append('<div id="gogogo" class="' + className + '" data-stream-id="' + stream.getId() + '" style="' + styleStr + '"></div>');
    stream.play("gogogo");
}

export default Meeting;