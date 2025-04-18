import React, { useEffect, useState } from 'react'
import SignOut from './SignOut'
import { db, auth } from '../firebase.js';
import SendMessage from './SendMessage.js';


function Line() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        db.collection("messages")
            .orderBy("createdAt")
            .limit(50)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);
    return (
        <div>
            {console.log(messages)}
            <SignOut />
            <div className='msgs'>
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}>
                            <img
                                src={photoURL || "/default-avatar.png"}
                                alt="user icon"
                                className="w-8 h-8 rounded-full"
                            />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage />
        </div>
    )
}

export default Line