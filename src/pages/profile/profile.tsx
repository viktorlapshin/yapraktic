import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Input,
  Tab,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import { logout } from "../../services/reducers/auth-slice";
import { getProfile, editProfile } from "../../services/reducers/profile-slice";
import { userSelector } from "../../services/reducers/profile-slice";
import { useAppDispatch } from "../../services/store";
import { Orders } from "./orders";


interface IUser {
  name: string;
  email: string;
}


type TabType = "profile" | "orders" | "logout";

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [initialName, setInitialName] = useState<string>("");
  const [initialLogin, setInitialLogin] = useState<string>("");

  const dispatch = useAppDispatch();
  const user = useSelector(userSelector) as IUser | null;

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

  const handleTabClick = (tab: TabType) => {
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
      {activeTab === "profile" && (
        <form
          className={styles.right_block}
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            dispatch(editProfile({ name, email: login, password }));
          }}
        >
          <Input
            placeholder="Имя"
            value={name}
            icon="EditIcon"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Input
            placeholder="Логин"
            value={login}
            icon="EditIcon"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLogin(e.target.value)
            }
          />
          <Input
            placeholder="Пароль"
            value={password}
            icon="EditIcon"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {isChanged && (
            <div className={styles.button_block}>
              <Link
                to="#"
                onClick={() => {
                  setName(initialName);
                  setLogin(initialLogin);
                  setPassword("");
                }}
              >
                Отмена
              </Link>
              <Button htmlType="submit">Сохранить</Button>
            </div>
          )}
        </form>
      )}
      {activeTab === "orders" && <Orders />}
    </div>
  );
};
