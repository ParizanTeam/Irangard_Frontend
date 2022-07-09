import React from 'react'
import {useState} from 'react'
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ChatLayout from './ChatLayout'
function Chat(props){

    const roomName = "chat_room";
    const username = "emad12";
    const chatSocket = new WebSocket(
    'ws://'
    + '127.0.0.1:8000'
    // + 'api.parizaan.ir'
    + '/chat/room/'
    + roomName
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
      console.log(message);
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