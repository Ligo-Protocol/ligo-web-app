import React, {  useState } from 'react';
import { Launcher } from 'popup-chat-react';
import messageHistory from './MessageHistory';
//import './../assets/styles';

export function Chatbox({conversation}) {
   
  const [state, setState] = useState({
    messageList: messageHistory,
    newMessagesCount: 0,
    isOpen: false,
    fileUpload: false,
  });

  async function onMessageWasSent(message) {
    await conversation.send(message.data.text)
    setState(state => ({
      ...state,
      messageList: [...state.messageList, message]
    }));
  }

  function onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    setState(state => ({
      ...state,
      messageList: [
        ...state.messageList,
        {
          type: 'file', author: 'me',
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          }
        }
      ]
    }));
  }

 
  // function sendMessage(text) {
  //   if (text.length > 0) {
  //     const newMessagesCount = state.isOpen ? state.newMessagesCount : state.newMessagesCount + 1;

  //     setState(state => ({
  //       ...state,
  //       newMessagesCount: newMessagesCount,
  //       messageList: [
  //         ...state.messageList,
  //         {
  //           author: 'them',
  //           type: 'text',
  //           data: { text }
  //         }
  //       ]
  //     }));
  //   }
  // }

  async function onClick() {
    
    setState(state => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0
    }));
  }

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: 'Host/Renter Coversation Chat',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={onMessageWasSent}
        onFilesSelected={onFilesSelected}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={state.isOpen}
        showEmoji
        fileUpload={state.fileUpload}
        pinMessage={{
        	id: 123,
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          title: 'Note:',
          text: 'The Host/Renter will be notified of your message.'
        }}
        onPinMessage={value => console.log(value)}
        placeholder='placeholder'
      />
    </div>
  );
}

