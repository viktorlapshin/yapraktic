import React from "react";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./register.module.css";

export const Register = () => (
  <div className={styles.centered_container}>
    <div className={styles.register_block}>
      <h2>Регистрация</h2>
      <Input placeholder="Имя" />
      <EmailInput />
      <PasswordInput />
      <Button>Зарегистрироваться</Button>
      <p>
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </div>
  </div>
);
