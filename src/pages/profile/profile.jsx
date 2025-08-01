import React, { useState, useEffect } from "react";
import {
  Input,
  Tab,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/reducers/auth-slice";
import { getProfile, editProfile } from "../../services/reducers/profile-slice";
import { userSelector } from "../../services/reducers/profile-slice";
 
export const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [initialName, setInitialName] = useState("");
  const [initialLogin, setInitialLogin] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLogin(user.email);
      setInitialName(user.name);
      setInitialLogin(user.email);
    }
  }, [user]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const isChanged =
    name !== initialName || login !== initialLogin || password !== "";

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
          onClick={() => {
            dispatch(logout());
          }}
        >
          Выход
        </Tab>
        <p>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={styles.right_block}>
        <Input
          placeholder="Имя"
          value={name}
          icon="EditIcon"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Логин"
          value={login}
          icon="EditIcon"
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          placeholder="Пароль"
          value={password}
          icon="EditIcon"
          onChange={(e) => setPassword(e.target.value)}
        />
        {isChanged && (
          <div className={styles.button_block}>
            <Link
              onClick={() => {
                setName(initialName);
                setLogin(initialLogin);
                setPassword("");
              }}
            >
              Отмена
            </Link>
            <Button
              onClick={() => {
                dispatch(editProfile({ name, login, password }));
              }}
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
