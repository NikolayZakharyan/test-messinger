import React, { useContext, useState, useRef, useEffect } from 'react';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function Chat() {
  const messagesEndRef = useRef(null);
  const inputEl = useRef(null);
  const [message, setMessage] = useState('');
  const { auth, database, firebase } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
    database.collection('messages').orderBy('msgTime')
  );

  const sendMessage = async () => {
    if (message.length) {
      await database.collection('messages').add({
        id: user.uid,
        name: user.displayName,
        msgTime: firebase.firestore.FieldValue.serverTimestamp(),
        message,
      });
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    inputEl.current.focus();
  }, [messages]);

  return (
    <>
      <div className="chat">
        <h1>CHAT</h1>
        {!loading ? (
          <div className="chat_wrapper">
            {messages.map(({ id, name, msgTime, message }) => {
              return (
                <div className={`container ${id === user.uid ? 'darker' : ''}`}>
                  <p>H{message}</p>
                  <span
                    className={id === user.uid ? `time-right` : `time-left`}
                  >
                    11:00 - {name}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <>loading</>
        )}

        <div className="input-div">
          <input
            ref={inputEl}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button type="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
