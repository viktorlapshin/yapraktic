import React from "react";
import styles from "./burger-constructor.module.css";
import { ButtonOrder } from "../button-order/button-order";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  bunIngredientsSelector,
  ingredientsSelector,
  addIngredient,
  removeIngredient,
  moveIngredient,
} from "../../services/reducers/ingredients-slice";
import { useDrop, useDrag } from "react-dnd";

const BunConstructorIngredientsItem = ({ type, ingredient }) => {
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "bun",
    drop: (ingredient) => {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: isOver ? "2px solid green" : canDrop ? "2px dashed orange" : undefined,
      }}
      className={styles[`${type}_bun`]}
    >
      {ingredient ? (
        <ConstructorElement
          type={type}
          isLocked
          thumbnail={ingredient.image}
          text={`${ingredient.name} ${type === "top" ? "(верх)" : "(низ)"}`}
          price={ingredient.price}
        />
      ) : (
        <>Выберите булки</>
      )}
    </div>
  );
};

const ConstructorIngredientsItem = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "move",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "move",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
      className={styles.point_list_food}
    >
      <DragIcon />
      <ConstructorElement
        thumbnail={ingredient.image}
        text={ingredient.name}
        price={ingredient.price}
        handleClose={() => dispatch(removeIngredient(ingredient.uniqueId))}
      />
    </li>
  );
};

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "ingredient",
    drop: (ingredient) => {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const bunIngredient = useSelector(bunIngredientsSelector);
  const otherIngredients = useSelector(ingredientsSelector);

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.burger_consructor_list}>
        <BunConstructorIngredientsItem type="top" ingredient={bunIngredient} />

        <ul ref={drop} className={styles.list_food}>
          {otherIngredients.length === 0 ? (
            <div
              className={styles.filling}
              style={{
                border: isOver ? "2px solid green" : canDrop ? "2px dashed orange" : undefined,
              }}
            >
              Выберите начинку
            </div>
          ) : (
            otherIngredients.map((ingredient, index) => (
              <ConstructorIngredientsItem
                key={ingredient.uniqueId}
                ingredient={ingredient}
                index={index}
              />
            ))
          )}
        </ul>

        <BunConstructorIngredientsItem type="bottom" ingredient={bunIngredient} />
      </div>

      <ButtonOrder text="Оформить заказ" />
    </section>
  );
};
