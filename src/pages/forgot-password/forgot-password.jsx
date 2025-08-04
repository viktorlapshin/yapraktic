import React from "react";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  passwordReset,
  passwordResetStatusSelector,
  authSlice,
} from "../../services/reducers/auth-slice";

export const Forgot = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const status = useSelector(passwordResetStatusSelector);

  React.useEffect(() => {
    if (status === "fulfilled") {
      navigate("/forgot-password-two");
    }
  }, [status]);

  React.useEffect(
    () => () => {
      dispatch(authSlice.actions.reset());
    },
    []
  );

  return (
    <div className={styles.centered_container}>
      <form
        className={styles.forgot_block}
        onSubmit={(event) => {
          event.preventDefault();

          dispatch(passwordReset(email));
        }}
      >
        <h2>Восстановление пароля</h2>
        <EmailInput
          placeholder="Укажите e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button htmlType="submit">Восстановить</Button>
        <p>
          Вспонили пароль? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};
