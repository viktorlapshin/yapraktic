import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { login } from "../../services/reducers/auth-slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services/store";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.centered_container}>
      <form
        className={styles.login_block}
        onSubmit={(event) => {
          event.preventDefault();

          dispatch(login({ email, password }))
            .unwrap()
            .then(() => {
              navigate("/");
            });
        }}
      >
        <h2>Вход</h2>
        <EmailInput
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <PasswordInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button htmlType="submit">Войти</Button>
        <p>
          Вы - новый пользователь?{" "}
          <Link to="/register" data-cy="login-register-link">
            Зарегистрироваться
          </Link>
        </p>
        <p>
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </form>
    </div>
  );
};
