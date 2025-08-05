import React from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../services/reducers/auth-slice";

export const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert("Ошибка регистрации: " + (err?.message || "Попробуйте снова"));
      });
  };

  return (
    <div className={styles.centered_container}>
      <form className={styles.register_block} onSubmit={(event) => {
        event.preventDefault()

        handleRegister()
      }}>
        <h2>Регистрация</h2>
        <Input
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button htmlType="submit">
          Зарегистрироваться
        </Button>
        <p>
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};
