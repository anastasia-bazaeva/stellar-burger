import React, { FC, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructStyles from '../../components/burger-constructor/burger-constructor.module.css';
import { sort, TConstructorIngredient } from '../../services/reducers/constructor-reducers';
import { useDispatch } from '../../hooks/wrappers';

interface IFillingItem {
  ingredient: TConstructorIngredient;
  handleClose: (uid: string, price: number) => void;
  index: number;
}

const FillingItem: FC<IFillingItem> = ({ ingredient, handleClose, index }) => {

  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const id = ingredient._id;

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructor-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId
      }
    },
    hover(item: {index: number}, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sort({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-item',
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} className={constructStyles.drag} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        data-handler-id={handlerId}
        handleClose={() => handleClose(ingredient.uid, ingredient.price)} />
    </div>
  )
}

export default FillingItem