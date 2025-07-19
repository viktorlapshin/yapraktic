import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../services/reducers/ingredients-slice";
import { Home } from "../../pages/home/home";
import { Modal } from "../modal/modal";
import { IngredientDetailsPage } from "../../pages/ingredient-details-page/ingredient-details-page";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
import { Forgot } from "../../pages/forgot-password/forgot-password";
import { ForgotTwo } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { Link } from "react-router-dom";
import { checkAuth } from "../../services/reducers/auth-slice";
import { ProtectedRoute } from "../protected-route/protected-route";

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);

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
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ingredients/:id"
              element={
                <ProtectedRoute>
                  <IngredientDetailsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Новый маршрут */}
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
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route path="/ingredients/:id" element={<ModalWrapper />} />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

function ModalWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.allIngredients);
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
