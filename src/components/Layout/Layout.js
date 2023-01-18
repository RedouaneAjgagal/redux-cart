import { Fragment } from 'react';
import MainHeader from './MainHeader';
import Notification from '../Notifications/Notification';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  const { notifications } = useSelector(state => state.cartUiReducer);
  return (
    <Fragment>
      {notifications ? <Notification status={notifications.status} title={notifications.title} message={notifications.message} /> : null}
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
