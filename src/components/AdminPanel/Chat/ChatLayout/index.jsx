import { useEffect, useState } from 'react';
import cn from 'classnames';
import Launcher from '../Launcher';
import FullScreenPreview from '../FullScreenPreview';
import Conversation from '../Conversation';
import './style.scss';
import profileAvatar from '../assets/avatar.png';

export default function ChatLayout({
  title,
  titleAvatar,
  subtitle,
  handleNewUserMessage,
  onSendMessage,
  onToggleConversation,
  senderPlaceHolder,
  onQuickButtonClicked,
  profileAvatar,
  profileClientAvatar,
  showCloseButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  onTextInputChange,
  chatId,
  launcherOpenLabel,
  launcherCloseLabel,
  launcherCloseImg,
  launcherOpenImg,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  showBadge,
  resizable,
  emojis,
}) {
  const [showChat, setShowChat] = useState(false);

  const toggleShowChat = () => {
    setShowChat(!showChat);
    console.log('showchat', showChat);
  };

  return (
    <div
      className={cn('rcw-widget-container-admin', {
        'rcw-full-screen': fullScreenMode,
        'rcw-previewer': imagePreview,
        'rcw-close-widget-container-admin ': true || !showChat,
      })}
    >
      {true && (
        <Conversation
          title={title}
          subtitle={subtitle}
          senderPlaceHolder={senderPlaceHolder}
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={profileAvatar}
          //   sendMessage={onSendMessage}
          //   profileClientAvatar={profileClientAvatar}
          //   toggleChat={onToggleConversation}
          //   showCloseButton={showCloseButton}
          // //   disabledInput={dissableInput}
          //   autofocus={autofocus}
          //   titleAvatar={titleAvatar}
          //   className={showChat || true ? 'active' : 'hidden'}
          //   onQuickButtonClicked={onQuickButtonClicked}
          //   onTextInputChange={onTextInputChange}
          //   sendButtonAlt={sendButtonAlt}
          //   showTimeStamp={showTimeStamp}
          //   resizable={resizable}
          //   emojis={emojis}
        />
      )}
      {/* {customLauncher
        ? customLauncher(onToggleConversation)
        : !fullScreenMode && (
            <Launcher
              toggle={onToggleConversation}
              chatId={chatId}
              openLabel={launcherOpenLabel}
              closeLabel={launcherCloseLabel}
              closeImg={launcherCloseImg}
              openImg={launcherOpenImg}
              showBadge={showBadge}
            />
          )} */}
      {imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />}
    </div>
  );
}
