import { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IngredientsDetails } from "../ingredients-details/ingredients-details";
import styles from "./app.module.css";
import { AppHeader } from "@components/app-header/app-header.jsx";
import {
  getIngredients,
  isLoadingSelector,
  isErrorSelector,
  allIngredientsSelector,
} from "../../services/reducers/ingredients-slice";
import { Home } from "../../pages/home/home";
import { Modal } from "../modal/modal";
import { IngredientDetailsPage } from "../../pages/ingredient-details-page/ingredient-details-page";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { Forgot } from "../../pages/forgot-password/forgot-password";
import { ForgotTwo } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { checkAuth } from "../../services/reducers/auth-slice";
import { ProtectedRoute } from "../protected-route/protected-route";
import { useAppDispatch, useAppSelector } from "@/services/store";
import { Feed } from "@/pages/feed";
import { Order } from "@/pages/order";
import { totalOrderWithIngridientsSelector } from "@/services/reducers/order-slice";
import { OrderFullDetails } from "../order-full-details";

export const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const isError = useAppSelector(isErrorSelector);

  const location = useLocation();
  const backgroundLocation =
    location.state && location.state.backgroundLocation;

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1> */}
      {/* <Link to='/login'>login</Link> */}
      {isLoading || isError ? null : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<Home />} />
            <Route
              path="/ingredients/:id"
              element={<IngredientDetailsPage />}
            />
            <Route path="/order/:orderNumber" element={<Order />} />
            <Route path="feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/reset-password" element={<ForgotTwo />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <h1 style={{ textAlign: "center" }}>
                  Страница не найдена. Ошибка 404.
                </h1>
              }
            />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route path="/ingredients/:id" element={<ModalWrapper />} />
              <Route
                path="/order/:orderNumber"
                element={<OrderModalWrapper />}
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

function OrderModalWrapper() {
  const navigate = useNavigate();
  const { orderNumber } = useParams();

  const order = useAppSelector(
    totalOrderWithIngridientsSelector(Number(orderNumber))
  );

  const handleClose = () => navigate(-1);

  if (!order) return null;

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <OrderFullDetails order={order} />
    </Modal>
  );
}

function ModalWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredients = useAppSelector(allIngredientsSelector);
  const ingredient = ingredients.find((item) => item._id === id);

  const handleClose = () => navigate(-1);

  if (!ingredient) return null;

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <IngredientsDetails
        selectedIngredient={ingredient}
        onClose={handleClose}
      />
    </Modal>
  );
}
