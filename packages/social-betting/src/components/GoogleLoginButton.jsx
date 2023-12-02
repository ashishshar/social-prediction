import React from 'react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const GoogleLoginButton = ({ clientId }) => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
    onError: error => console.error(error),
  });

  return (
    <button variant="link" onClick={() => login()}  style={{ color: 'inherit', backgroundColor: 'transparent', border: 'none', boxShadow: 'none', marginLeft:'5px' }}>
      <FontAwesomeIcon icon={faUser} size='lg'/>
    </button>
  );
};

const GoogleLoginProviderWrapper = ({ clientId }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLoginButton clientId={clientId} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginProviderWrapper;
