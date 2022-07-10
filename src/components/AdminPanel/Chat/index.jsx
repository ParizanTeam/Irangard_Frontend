import React from 'react'
import {useState} from 'react'
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ChatLayout from './ChatLayout'
function Chat(props){

    const roomName = "emad12";
    const username = "emad12";
    const chatSocket = new WebSocket(
    'ws://'
    // + window.location.host
    + 'localhost:8000'
    + '/ws/room'
    // + roomName
    + '/'
    );

    chatSocket.onmessage = function(e) {
      const data = JSON.parse(e.data);

      if (data.message) {
        // document.querySelector('#chat-messages').innerHTML += ('<b>' + data.username + '</b>: ' + data.message + '<br>');
      } else {
        alert('The message is empty!');
      }

    };

    chatSocket.onclose = function(e) {
        console.log('The socket close unexpectadly');
    };


    const handleNewUserMessage = (message) =>{
      chatSocket.send(JSON.stringify({
        'message': message,
        'username': username,
        'room_name': roomName
    }));
    console.log("received");
    }

    return(

      <div>
        <ChatLayout
            title="پشتیبانی ایرانگرد"
            subtitle="هر سوالی داری بپرس"
            senderPlaceHolder="سوالت رو بپرس !!!"
            handleNewUserMessage={handleNewUserMessage}
        />
      </div>

    )

}

export default Chat;