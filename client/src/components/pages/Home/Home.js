import './Home.scss';
import HomeCarousel from '../../features/HomeCarousel/HomeCarousel';
import FeatureBoxes from '../../features/FeatureBoxes/FeatureBoxes';
import LookBook from '../../features/LookBook/LookBook';

const Home = () => {
  return (
    <>
      <HomeCarousel />
      <FeatureBoxes />
      <LookBook />
    </>
  );
};

export default Home;
