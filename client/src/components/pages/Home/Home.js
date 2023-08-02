import './Home.scss';
import HomeCarousel from '../../features/HomeCarousel/HomeCarousel';
import FeatureBoxes from '../../features/FeatureBoxes/FeatureBoxes';
import LookBook from '../../features/LookBook/LookBook';
import ProductsGallery from '../../features/ProductsGallery/ProductsGallery';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Spinner } from 'react-bootstrap';
import { getAllProducts, getStatus } from '../../../redux/productsReducer';
import { getUserStatus, setUserStatus } from '../../../redux/userReducer';
import { useEffect } from 'react';
import InfoToast from '../../features/InfoToast/InfoToast';

const Home = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(getStatus);
  const products = useSelector(getAllProducts);
  const userStatus = useSelector(getUserStatus);
  useEffect(() => {
    return () => {
      dispatch(setUserStatus());
    };
  }, [dispatch]);
  return (
    <>
      <HomeCarousel />
      <FeatureBoxes />
      {status === 'loading' && (
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      )}
      {!status && <Col className="text-center">No ads to show...</Col>}
      {status === 'idle' && <ProductsGallery products={products} />}
      {userStatus === 'login' && (
        <InfoToast
          message={{
            type: 'Success',
            action: 'You have been successfuly login!',
          }}
        />
      )}
      {userStatus === 'logout' && (
        <InfoToast
          message={{
            type: 'Success',
            action: 'You have been successfuly logout!',
          }}
        />
      )}
      {userStatus === 'register' && (
        <InfoToast
          message={{
            type: 'Success',
            action: 'You have been successfuly registered!',
          }}
        />
      )}
      <LookBook />
    </>
  );
};

export default Home;
