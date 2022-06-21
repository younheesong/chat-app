import React, { useRef } from "react";
import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, set, ref as refDB } from "firebase/database";
import { setPhotoURL } from "../../../../src/redux/actions/user_action";
function UserPanel() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const inputOpenImageRef = useRef();
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
  const uploadImg = () => {
    inputOpenImageRef.current.click();
  };
  const uploadImageToFirebase = (event) => {
    const storage = getStorage();
    const storageRef = ref(storage, `user_image/${user.uid}`);
    const file = event.target.files[0];
    const metadata = { contentType: file.type };
    console.log(file, metadata);
    // 'file' comes from the Blob or File API
    try {
      uploadBytes(storageRef, file, metadata).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          updateProfileImg(downloadURL);
        });
      });
    } catch (error) {}
  };
  const updateProfileImg = async (url) => {
    await updateProfile(user, {
      photoURL: url,
    });
    dispatch(setPhotoURL(url));
    const db = getDatabase();
    set(refDB(db, "users/" + user.uid), {
      image: url,
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
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={uploadImg}>프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        onChange={uploadImageToFirebase}
        type="file"
        accept="image/jpeg, image/png"
        style={{ display: "none" }}
        ref={inputOpenImageRef}
      />
    </div>
  );
}

export default UserPanel;
