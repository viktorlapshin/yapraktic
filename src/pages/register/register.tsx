import React from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { register } from "../../services/reducers/auth-slice";
import { useAppDispatch } from "../../services/store";

export const Register = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err: any) => {
        alert("Ошибка регистрации: " + (err?.message || "Попробуйте снова"));
      });
  };

  return (
    <div className={styles.centered_container}>
      <form
        className={styles.register_block}
        onSubmit={(event) => {
          event.preventDefault();
          handleRegister();
        }}
      >
        <h2>Регистрация</h2>
        <Input
          data-cy="register-name-input"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <EmailInput
          data-cy="register-email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          data-cy="register-password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button htmlType="submit">Зарегистрироваться</Button>
        <p>
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};
