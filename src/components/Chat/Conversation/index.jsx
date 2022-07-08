import { useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import Header from './Header';
import Messages from './Messages';
import Sender from './Sender';
import QuickButtons from './QuickButtons';

import './style.scss';


export default function Conversation(props) {


  return (
    <div id="rcw-conversation-container"  
      className={cn('rcw-conversation-container')} aria-live="polite">
      
      <Header
        title={props.title}
        subtitle={props.subtitle}
        toggleChat={props.toggleChat}
        showCloseButton={props.showCloseButton}
        titleAvatar={props.titleAvatar}
      />
      <Messages
        profileAvatar={props.profileAvatar}
        profileClientAvatar={props.profileClientAvatar}
        showTimeStamp={props.showTimeStamp}
      />
      <QuickButtons onQuickButtonClicked={props.onQuickButtonClicked} />

      <Sender
        sendMessage={props.handlerSendMsn}
        placeholder={props.senderPlaceHolder}
        disabledInput={props.disabledInput}
        autofocus={props.autofocus}
        onTextInputChange={props.onTextInputChange}
        buttonAlt={props.sendButtonAlt}
        onPressEmoji={props.togglePicker}
      />
    </div>
  );
}

