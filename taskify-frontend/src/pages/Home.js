// Home.jsx
import Navbar from '../components/Navbar';
import Tasks from './Tasks';

const Home = () => {
  return (
    <>
      <Navbar />
      <Tasks /> {/* Default home content */}
    </>
  );
};

export default Home;
