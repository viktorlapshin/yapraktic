import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/reducers/auth-slice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <div className={styles.centered_container}>
      <div className={styles.login_block}>
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
        <Button
          onClick={() => {
            dispatch(login({ email, password })).then(() => {
              navigate('/')
            });
          }}
        >
          Войти
        </Button>
        <p>
          Вы - новый пользователь?{" "}
          <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p>
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
};
