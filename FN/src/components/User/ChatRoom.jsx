import React from "react";
import "../../css/user/ChatRoom.css";
import horror from '../../img/horror-avatar.png';
import SF from '../../img/sf-avatar.png';
import { Link} from 'react-router-dom';

const ChatRoomUI = () => {
  const handleJoin = (roomName) => {
    alert(`${roomName}에 참여하시겠습니까?`);
  };

  return (
    <div className="chatroom-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h2 className="section-title">내가 참여 중인 채팅방</h2>
        <div className="chat-item">
        <Link to="/chatroomcome">
          <img
            src={horror}
            alt="공포 메니아들"
            className="chat-avatar"
          />
          </Link>
          <span>공포 메니아들</span>
        </div>
      </div>

      {/* Right Content */}
      <div className="main-content">
        {/* 내가 가입한 채팅방 */}
        <section className="section">
          <h3 className="section-header">내가 가입한 채팅방</h3>
          <div className="chat-item">
            <img
              src={horror}
              alt="공포 메니아들"
              className="chat-avatar"
            />
            <span>공포 메니아들</span>
          </div>
        </section>

        {/* 승인 대기 중인 채팅방 */}
        <section className="section">
          <h3 className="section-header">승인 대기 중인 채팅방</h3>
          <div className="chat-item">
            <img
              src={SF}
              alt="SF 메니아들"
              className="chat-avatar"
            />
            <span>SF 메니아들</span>
          </div>
        </section>

        {/* 채팅방 목록 */}
        <section className="section">
          <h3 className="section-header">채팅방 목록</h3>
          
          <div className="chat-entry">
            <span className="chat-name">로맨스 메니아들</span>
            <button
              className="join-button"
              onClick={() => handleJoin("로맨스 메니아들")}
            >
              참여하기
            </button>
          </div>
          <div className="chat-entry">
            <span className="chat-name">장르 상관없이 대화하는 곳</span>
            <button
              className="join-button"
              onClick={() => handleJoin("장르 상관없이 대화하는 곳")}
            >
              참여하기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatRoomUI;