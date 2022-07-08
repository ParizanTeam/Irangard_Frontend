import { useEffect, useRef, useState, ElementRef, ImgHTMLAttributes, MouseEvent } from 'react';
import format from 'date-fns/format';

// import { scrollToBottom } from '../../../../../../utils/messages';
// import { MessageTypes, Link, CustomCompMessage, GlobalState } from '../../../../../../store/types';
// import { setBadgeCount, markAllMessagesRead } from '../../../../../../store/actions';
// import { MESSAGE_SENDER } from '../../../../../../constants';

import Loader from './components/Loader';
import Message from './components/Message';
import './styles.scss';
import profileAvatar from '../../assets/avatar.png';


export default function Messages(props) {
  // const dispatch = useDispatch();
  // const { messages, typing, showChat, badgeCount } = useSelector((state: GlobalState) => ({
  //   messages: state.messages.messages,
  //   badgeCount: state.messages.badgeCount,
  //   typing: state.behavior.messageLoader,
  //   showChat: state.behavior.showChat
  // }));

  // const messageRef = useRef(null);
  // useEffect(() => {
  //   // @ts-ignore
  //   scrollToBottom(messageRef.current);
  //   if (showChat && badgeCount) dispatch(markAllMessagesRead());
  //   else dispatch(setBadgeCount(messages.filter((message) => message.unread).length));
  // }, [messages, badgeCount, showChat]);
    
  // const getComponentToRender = (message) => {
  //   const ComponentToRender = message.component;
  //   if (message.type === 'component') {
  //     return <ComponentToRender {...message.props} />;
  //   }
  //   return <ComponentToRender message={message} showTimeStamp={props.showTimeStamp} />;
  // };


  const isClient = (sender) => true;

  console.log(props.messages)

  return (
    <div id="messages" className="rcw-messages-container" ref={props.messageRef} dir="ltr">
      {props.messages?.map((message, index) =>
        <div className={`rcw-message ${isClient(message.sender) ? 'rcw-message-client' : ''}`} 
          // key={`${index}-${format(message.timestamp, 'hh:mm')}`}
          key={`${index}`}
          >
          {((!isClient(message.sender)) || (isClient(message.sender))) &&
            true && 
            <img 
              src={profileAvatar} 
              className={`rcw-avatar ${isClient(message.sender) ? 'rcw-avatar-client' : ''}`} 
              alt="profile"
            />
          }
          <Message message={message} showTimeStamp={false} />
        </div>
      )}
      <Loader typing={props.messages.length === 0}/>
    </div>
  );
}


