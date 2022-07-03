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
    searchTerm: "",
    searchResult: [],
    searchLoading: false,
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
  handleSearchMessages = () => {
    const chatRoomMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResult = chatRoomMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResult });
  };
  handleSearchChange = (e) => {
    this.setState(
      {
        searchTerm: e.target.value,
        searchLoading: true,
      },
      this.handleSearchMessages
    );
  };

  renderMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message, i) => (
      <Message key={i} message={message} user={this.props.user} />
    ));

  render() {
    const { messages, searchTerm, searchResult } = this.state;
    return (
      <div style={{ padding: "2rem 2rem 0 2rem" }}>
        <MessageHeader handleSearchChange={this.handleSearchChange} />

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
          {searchTerm
            ? this.renderMessages(searchResult)
            : this.renderMessages(messages)}
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
