import React, { Component } from "react";
import Message from "./Message";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import { connect } from "react-redux";
import { getDatabase, onChildAdded, ref, child } from "firebase/database";
export class MainPanel extends Component {
  state = {
    messagesRef: ref(getDatabase(), "messages"),
    messages: [],
    messagesLoading: true,
  };

  componentDidMount() {
    const { chatRoom, user } = this.props;
    console.log(chatRoom);
    console.log(user);
    if (chatRoom) {
      this.addMessagesListeners(chatRoom.id);
    }
  }
  addMessagesListeners = (chatRoomId) => {
    let messageArray = [];
    let { messagesRef } = this.state;
    onChildAdded(child(messagesRef, chatRoomId), (DataSnapshot) => {
      messageArray.push(DataSnapshot.val());
      this.setState({
        messages: messageArray,
        messagesLoading: false,
      });
    });
  };

  renderMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message, i) => (
      <Message key={i} message={message} user={this.props.user} />
    ));

  render() {
    const { messages } = this.state;
    return (
      <div style={{ padding: "2rem 2rem 0 2rem" }}>
        <MessageHeader />

        <div
          style={{
            width: "100%",
            height: "450px",
            border: ".2rem solid #ececec",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "1rem",
            overflowY: "auto",
          }}
        >
          {this.renderMessages(messages)}
        </div>
        <MessageForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    chatRoom: state.chatRoom.room,
  };
};

export default connect(mapStateToProps)(MainPanel);
