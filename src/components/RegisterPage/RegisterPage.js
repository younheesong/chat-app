import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../assets/css/style.css";
function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const password = useRef(null);
  password.current = watch("pdRequired");
  console.log(watch("emailRequired")); // watch input value by passing the name of it

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
          {...register("emailRequired", { required: true })}
        />
        {errors.emailRequired && <span>This email is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <label>name</label>
        <input type="text" {...register("nameRequired", { required: true })} />
        {errors.nameRequired && <span>This name is required</span>}
        <label>password</label>
        <input
          type="password"
          //   ref="password"
          {...register("pdRequired", { required: true })}
        />
        {errors.pdRequired && <span>This pd confirm is required</span>}
        <label>password confirm</label>

        <input
          type="password"
          {...register("pdcRequired", {
            required: true,
            validate: (val) => val === password.current,
          })}
        />
        {/* errors will return when field validation fails  */}

        {errors.pdcRequired && <span>This pd confirm is required</span>}

        <input type="submit" />
      </form>
      <Link to="/login">로그인 하러 가기</Link>
    </div>
  );
}

export default RegisterPage;
