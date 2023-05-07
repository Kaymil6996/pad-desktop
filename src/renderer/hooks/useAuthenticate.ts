import { useDispatch } from 'react-redux';
import { userSlice } from 'renderer/store/user/user';
import { useAppSelector } from 'renderer/store/store';
import { API } from 'renderer/constants/links';

export enum Variant {
  LOGIN = 'login',
  REGISTER = 'register',
}

export const useAuthenticate = function (p?: { onSuccess?: Function }) {
  const dispatch = useDispatch();

  const { isError, errorMessage } = useAppSelector((s) => s.user);

  const checkIfSaved = function () {
    const v = localStorage.getItem('usr');

    if (typeof v !== 'undefined' && v != null) {
      const parsed = JSON.parse(v);

      if (parsed.isAuthenticated)
        dispatch(userSlice.actions.authenticate(parsed));

      return parsed.isAuthenticated as boolean;
    }

    return false;
  };

  const authenticate = async function (
    type: 'login' | 'register',
    props: { email: string; password: string }
  ) {
    const t = type === 'login' ? type : 'create-account';
    try {
      const response = await fetch(API + '/authentication/' + t, {
        method: 'POST',
        body: JSON.stringify({ email: props.email, password: props.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (
        data.statusCode === 400 ||
        data.statusCode === 404 ||
        data.statusCode > 300
      ) {
        const err = new Error();
        err.message = data.message;
        throw err;
      }

      dispatch(userSlice.actions.authenticate(data));

      p?.onSuccess?.();
    } catch (error) {
      dispatch(userSlice.actions.error(error));
    }
  };

  return { authenticate, checkIfSaved, isError, errorMessage };
};
