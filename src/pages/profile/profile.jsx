import React from "react";
import { Input, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";

export const Profile = () => (
  <div className={styles.profile}>
    <div className={styles.left_block}>
      <Tab>Профиль</Tab>
      <Tab>История заказов</Tab>
      <Tab>Выход</Tab>
      <p>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
    <div className={styles.right_block}>
      <Input placeholder="Имя" icon="EditIcon" />
      <Input placeholder="Логин" icon="EditIcon" />
      <Input placeholder="Пароль" icon="EditIcon" />
    </div>
  </div>
);
