import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';

import classes from './Hero.module.css';
import heroPic from '../../assets/HeroPic.jpg';
import heroPicDark from '../../assets/HeroPicDark.jpg';
import Button from '../UI/Elements/Button';
import Wrapper from '../UI/Layout/Wrapper';

const Home = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(state => state.ui.themeMode);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const heroSectionClasses = `${classes.heroSection} ${isLoggedIn ? classes.loggedIn : ''}`;

  const gotoRegisterHandler = () => {
    dispatch(authActions.toggleIsLogin());
  };

  return (
    <main className={classes.homePage}>
      <section className={heroSectionClasses}>
        <div className={classes.heroPic}>
          {themeMode === 'light' && <img src={heroPic} alt='Hero pic' />}
          {themeMode === 'dark' && <img src={heroPicDark} alt='Hero pic' />}
        </div>
        <Wrapper>
          <h1>
            Welcome to Invoice<span>Me</span>!
          </h1>
          <p>
            We will take care of your invoices wherever you are. Instant access from you pc, tablet
            or your phone anywhere around the world.
          </p>
          {!isLoggedIn && (
            <Link to='/auth'>
              <Button btnType='hero' onClick={gotoRegisterHandler}>
                Register Now!
              </Button>
            </Link>
          )}
          <h3>It's free!</h3>
          <Link to='/about'>
            <Button btnType='transparent'>Or Find Out More...</Button>
          </Link>
        </Wrapper>
      </section>
    </main>
  );
};

export default Home;
