import React, { useState } from 'react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const GoogleLoginButton = ({ clientId }) => {
  const [token, setToken] = useState(null);

  const onSuccess = async (tokenResponse) => {
    try {
      const response = await axios.post('https://social-test.theox.co:3030///api/auth/google', { token: tokenResponse.tokenId });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onError = (error) => {
    console.error(error);
  };


  const login = useGoogleLogin({
    onSuccess,
    onError,
    clientId,
    isSignedIn: true,
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
