import React, { useEffect } from "react";
import moment from "moment";
function Message({ message, user }) {
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();
  useEffect(() => {
    console.log(message);
  }, []);
  const isMessageMine = (message, user) => {
    if (user) {
      return message.user.id === user.id;
    }
  };
  const isImage = (message) => {
    return (
      message.hasOwnProperty("image") && !message.hasOwnProperty("content")
    );
  };

  return (
    <div style={{ marginBottom: "3px", display: "flex" }}>
      <div>dlkajfldskjf</div>
      <img
        style={{ borderRadius: "10px" }}
        width={48}
        height={48}
        className="mr-3"
        src={message.user.image}
        alt={message.user.name}
      />

      <div
        style={{
          backgroundColor: isMessageMine(message, user) && "#ECECEC",
        }}
      >
        <h6>
          {message.user.name}{" "}
          <span style={{ fontSize: "10px", color: "gray" }}>
            {timeFromNow(message.timestamp)}
          </span>
        </h6>
        {isImage(message) ? (
          <img
            style={{ maxWidth: "300px" }}
            alt="이미지"
            src={message.user.image}
          />
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
}

export default Message;
