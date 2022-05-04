import { useSelector } from 'react-redux';

import PasswordForm from './PasswordForm';
import classes from './UserProfile.module.css';
import Card from '../UI/Layout/Card';
import Avatar from '../UI/Elements/Avatar';
import ProfileForm from './ProfileForm';

const UserProfile = () => {
  const profile = useSelector(state => state.profile);

  return (
    <section className={classes.profile}>
      <div className={classes.profileHead}>
        <Avatar />
        <h1 className={classes.profileH1}>{profile.name}</h1>
      </div>
      <div className={classes.profileDetails}>
        <Card cardType='profile'>
          <ProfileForm />
          <PasswordForm />
        </Card>
      </div>
    </section>
  );
};

export default UserProfile;
