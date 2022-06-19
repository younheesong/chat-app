import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../assets/css/style.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "../../firebase";
import { getDatabase, ref, set } from "firebase/database";
import md5 from "md5";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const auth = await getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateUserProfile(data.name, user);
        setLoading(false);
      })
      .catch((error) => {
        setErrorFromSubmit(error.message);
        setTimeout(() => {
          setErrorFromSubmit("");
        }, 5000);
        setLoading(false);
        // ..
      });
  };
  const updateUserProfile = async (name, user) => {
    await updateProfile(user, {
      displayName: name,
      photoURL: `http://gravatar.com/avatar/${md5(user.email)}?d-identicon`,
    });

    // firebase 의 database에 저장해두기
    const db = getDatabase();
    set(ref(db, "users/" + user.uid), {
      name: name,
      image: user.photoURL,
    });
  };
  const password = useRef(null);
  password.current = watch("password");

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="auth-wrapper">
      <div>
        <h3>register</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>email</label>
        <input
          type="email"
          name="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This email is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <label>name</label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This name is required</span>}
        <label>password</label>
        <input
          type="password"
          ref="password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This pd confirm is required</span>}
        <label>password confirm</label>

        <input
          type="password"
          name="passwordConfirm"
          {...register("passwordConfirm", {
            required: true,
            validate: (val) => val === password.current,
          })}
        />
        {/* errors will return when field validation fails  */}

        {errors.passwordConfirm && <span>This pd confirm is required</span>}
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" disabled={loading} />
      </form>
      <Link to="/login">로그인 하러 가기</Link>
    </div>
  );
}

export default RegisterPage;
