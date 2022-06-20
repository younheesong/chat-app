import React from "react";
import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      {/* logo */}
      <h3>
        <IoIosChatboxes /> chat app
      </h3>

      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          src={user && user.photoURL}
          roundedCircle
          style={{ width: "30px", height: "30px", marginTop: "3px" }}
        />
        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "transparent", border: "0px" }}
            variant="success"
            id="dropdown-basic"
          >
            user name
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserPanel;
