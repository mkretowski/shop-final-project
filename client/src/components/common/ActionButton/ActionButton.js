import React from 'react';
import './ActionButton.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartProduct } from '../../../redux/cartReducer';
import { useToast } from '../../../contexts/ToastContext';

const ActionButton = ({
  productId,
  buttonType,
  dataTooltip,
  size,
  quantity,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const handleView = (e) => {
    e.preventDefault();
    navigate('/products/' + productId);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (size) {
      dispatch(addCartProduct({ productId, size, quantity }));
      showToast({ type: 'Success', action: 'Product added to cart!' });
    } else {
      showToast({ type: 'Error', action: 'Choose size!' });
    }
  };

  const getButtonProps = (buttonType) => {
    switch (buttonType) {
      case 'view':
        return {
          name: 'View',
          function: handleView,
          icon: faEye,
        };
      case 'addToCart':
        return {
          name: 'Add to cart',
          function: handleAddToCart,
          icon: faShoppingBasket,
        };
      default:
        return null;
    }
  };

  const buttonProps = getButtonProps(buttonType);

  return (
    <Button
      variant="outline-dark"
      className="m-1 action-button"
      onClick={buttonProps.function}
      data-tooltip={dataTooltip}
    >
      <FontAwesomeIcon icon={buttonProps.icon}>
        {buttonProps.name}
      </FontAwesomeIcon>
    </Button>
  );
};

export default ActionButton;
