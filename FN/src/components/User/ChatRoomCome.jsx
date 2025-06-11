import React, { useState } from "react";
import "../../css/user/ChatRoomCome.css";
import horror from '../../img/horror-avatar.png';
import user1 from '../../img/user1.png';
import user2 from '../../img/user2.png';
import user3 from '../../img/user3.png';

const ChatRoomUI = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "공포 영화 추천 부탁드릴게요", avatar: user3, isMine: false },
    { id: 2, text: "미드소마가 진짜 짱입니다.", avatar: user1, isMine: true },
    { id: 3, text: "저 최근에 컨저링 혼자 보다가 기절 하는 줄 알았습니다...", avatar: user3 , isMine: false },
    { id: 4, text: "아이고, 큰일 나실뻔 했네요.. 두번다시는 못볼뻔..했네요..", avatar: user2, isMine: false },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      avatar: user1, // 본인 프로필
      isMine: true,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatroom-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h2 className="section-title">내가 참여 중인 채팅방</h2>
        <div className="chat-item">
          <img
            src={horror}
            alt="공포 메니아들"
            className="chat-avatar"
          />
          <span>공포 메니아들</span>
        </div>
      </div>

      {/* Chat content */}
      <div className="chat-content">
        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.isMine ? "mine" : "other"}`}
            >
              {!msg.isMine && <img src={msg.avatar} alt="avatar" className="msg-avatar" />}
              <span className="msg-text">{msg.text}</span>
              {msg.isMine && <img src={msg.avatar} alt="avatar" className="msg-avatar" />}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="chat-input"
          />
          <button onClick={handleSend} className="send-button">전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomUI;
