// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={`http://localhost:5001/employee-images/${user.Image}`}
      alt={user.displayName}
      color={user.photoURL ? 'default' : createAvatar(user.FirstName).color}
      {...other}
    >
      {createAvatar(user.FirstName).name}
    </MAvatar>
  );
}
