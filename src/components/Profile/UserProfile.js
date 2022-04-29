import { useSelector } from 'react-redux';

import PasswordForm from './PasswordForm';
import classes from './UserProfile.module.css';
import ProfileForm from './ProfileForm';
import Card from '../UI/Layout/Card';
import ProfileConfirmModal from '../UI/Modals/ProfileConfirmModal';
import Avatar from '../UI/Elements/Avatar';

const UserProfile = () => {
  const showDetailsConfirmModal = useSelector(state => state.ui.showDetailsConfirmModal);
  const profile = useSelector(state => state.profile);

  return (
    <section className={classes.profile}>
      {showDetailsConfirmModal && <ProfileConfirmModal />}
      <div className={classes.profileHead}>
        <Avatar />
        <h1 className={classes.profileH1}>{profile.name}</h1>
      </div>
      <div className={classes.profileDetails}>
        <Card cardType='profile'>
          <ProfileForm profileData={profile} />
          <PasswordForm />
        </Card>
      </div>
    </section>
  );
};

export default UserProfile;
