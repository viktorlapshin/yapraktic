import React from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./reset-password.module.css";
import { useSelector } from "react-redux";
import {
  passwordRecoveryStatusSelector,
  passwordRecovery,
  authSlice,
} from "../../services/reducers/auth-slice";
import { useAppDispatch } from "@/services/store";

export const ForgotTwo = () => {
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const status = useSelector(passwordRecoveryStatusSelector);

  React.useEffect(() => {
    if (status === "fulfilled") {
      navigate("/");
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
        className={styles.forgot_two_block}
        onSubmit={(event) => {
          event.preventDefault();

          dispatch(passwordRecovery({ password, token }));
        }}
      >
        <h1>Восстановление пароля</h1>
        <Input
          placeholder="Введите новый пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          placeholder="Введите код из письма"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
          }}
        />
        <Button htmlType="submit">Сохранить</Button>
        <p>
          Вспонили пароль? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};
