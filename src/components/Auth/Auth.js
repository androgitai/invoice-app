import { useSelector } from 'react-redux';

import Login from './Login';
import Register from './Register';
import classes from './Auth.module.css';

const Auth = () => {
  const { isLogin } = useSelector(state => state.auth);

  return (
    <section className={classes.auth} key={isLogin}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {isLogin ? <Login /> : <Register />}
    </section>
  );
};

export default Auth;
