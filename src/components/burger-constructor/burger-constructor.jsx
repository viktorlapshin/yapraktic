import React from "react";
import styles from "./burger-constructor.module.css";
import * as PropTypes from "prop-types";
import { ingredientPropType } from "@utils/prop-types.js";
import { ButtonOrder } from "../button-order/button-order";
import { BurgerConstructorItem } from "../burger-constructor-item/burger-constructor-item";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  bunIngredientsSelector,
  ingredientsSelector,
} from "../../services/reducers/ingredients-slice";
import { useDrop, useDrag } from "react-dnd";
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
} from "../../services/reducers/ingredients-slice";

const BunConstructorIngredientsItem = ({ type, ingredient }) => {
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "bun",
      drop: (ingredient) => {
        dispatch(addIngredient(ingredient));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "green" : canDrop ? "orange" : undefined,
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
  const ref = React.useRef(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: "move",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex);
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "move",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={styles.point_list_food}
      key={ingredient.uniqueId}
    >
      <DragIcon />
      <ConstructorElement
        thumbnail={ingredient.image}
        text={ingredient.name}
        price={ingredient.price}
        handleClose={() => {
          dispatch(removeIngredient(ingredient.uniqueId));
        }}
      />
    </li>
  );
};

export const BurgerConstructor = ({ ingredients }) => {
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "ingredient",
      drop: (ingredient) => {
        dispatch(addIngredient(ingredient));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const bunIngredient = useSelector(bunIngredientsSelector);
  const otherIngredients = useSelector(ingredientsSelector);

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.burger_consructor_list}>
        <BunConstructorIngredientsItem type="top" ingredient={bunIngredient} />{" "}
        <ul ref={drop} className={styles.list_food}>
          {otherIngredients.length === 0 ? (
            <div
              className={styles.filling}
              style={{
                backgroundColor: isOver
                  ? "green"
                  : canDrop
                    ? "orange"
                    : undefined,
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
        <BunConstructorIngredientsItem
          type="bottom"
          ingredient={bunIngredient}
        />
      </div>

      <ButtonOrder text="Оформить заказ" />
    </section>
  );
};
