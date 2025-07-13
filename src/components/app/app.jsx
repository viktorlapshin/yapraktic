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

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);

  const location = useLocation();
  // Получаем backgroundLocation из state, если он есть
  const backgroundLocation =
    location.state && location.state.backgroundLocation;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      {isLoading || isError ? null : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<Home />} />
            <Route
              path="/ingredients/:id"
              element={<IngredientDetailsPage />}
            />
          </Routes>

          {/* Модалка поверх Home */}
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

// Обёртка для модалки, чтобы не дублировать логику
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
