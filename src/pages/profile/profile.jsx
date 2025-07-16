import React, { useState } from "react";
import {
  Input,
  Tab,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.left_block}>
        <Tab
          value="profile"
          active={activeTab === "profile"}
          onClick={() => handleTabClick("profile")}
        >
          Профиль
        </Tab>
        <Tab
          value="orders"
          active={activeTab === "orders"}
          onClick={() => handleTabClick("orders")}
        >
          История заказов
        </Tab>
        <Tab
          value="logout"
          active={activeTab === "logout"}
          onClick={() => handleTabClick("logout")}
        >
          Выход
        </Tab>
        <p>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={styles.right_block}>
        <Input placeholder="Имя" icon="EditIcon" />
        <Input placeholder="Логин" icon="EditIcon" />
        <Input placeholder="Пароль" icon="EditIcon" />
        <div className={styles.button_block}>
          <Link>Отмена</Link>
          <Button>Сохранить</Button>
        </div>
      </div>
    </div>
  );
};
