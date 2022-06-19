import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../assets/css/style.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../../firebase";
// import { getDatabase, ref, set } from "firebase/database";

function LoginPage() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const auth = await getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
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

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="auth-wrapper">
      <div>
        <h3>Login</h3>
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
        <label>password</label>
        <input
          type="password"
          ref="password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This pd confirm is required</span>}
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" disabled={loading} />
        <label>password confirm</label>
      </form>
      <Link to="/register">회원가입 하러가기</Link>
    </div>
  );
}

export default LoginPage;
