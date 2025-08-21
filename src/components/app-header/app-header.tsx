import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, Link } from "react-router-dom";

export const AppHeader = () => {
  const location = useLocation()

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link to="/" className={`${styles.link} ${location.pathname === '/' && styles.link_active}`}>
            <BurgerIcon type={location.pathname === '/' ? "primary" : 'secondary'} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </Link>
          <Link to="/feed" className={`${styles.link} ml-10 ${location.pathname === '/feed' && styles.link_active}`}>
            <ListIcon type={location.pathname === '/feed' ? "primary" : 'secondary'} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link
          to="/profile"
          className={`${styles.link} ${styles.link_position_last} ${location.pathname === '/profile' && styles.link_active}`}
        >
          <ProfileIcon type={location.pathname === '/profile' ? "primary" : 'secondary'} />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </Link>
      </nav>
    </header>
  );
};
