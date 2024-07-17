/* eslint-disable react/prop-types */
import { AuthProvider as Provider } from './AuthContext';

const AuthProvider = ({ children }) => {
  return (
    <Provider>
      {children}
    </Provider>
  );
};

export default AuthProvider;
