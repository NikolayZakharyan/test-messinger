import React, { useContext, useState, useRef, useEffect } from 'react';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SingleMsg from '../components/SingleMsg';




function Chat() {
  const messagesEndRef = useRef(null);
  const inputEl = useRef(null);
  const [message, setMessage] = useState('');
  const { auth, database, firebase } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
    database.collection('messages').orderBy('msgTime')
  );

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.length) {
      await database.collection('messages').add({
        id: user.uid,
        name: user.displayName,
        msgTime: await firebase.firestore.FieldValue.serverTimestamp(),
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
        <h1>{`HI ${user.displayName}`}</h1>
        {!loading ? (
          <div className="chat_wrapper">
            {messages.map(({ id, name, msgTime, message }, i) => {
              return (
                <SingleMsg
                  owner={id === user.uid}
                  data={{ id, name, msgTime, message }}
                  message={message}
                  name={name}
                  msgTime={msgTime}
                  id={id}
                  key={i}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div>loading</div>
        )}

        <form className="input-div" onSubmit={sendMessage}>
          <input
            ref={inputEl}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

export default Chat;
