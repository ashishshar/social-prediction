import React, { useState } from 'react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const GoogleLoginButton = ({ clientId }) => {
  const [token, setToken] = useState(null);

  const onSuccess = async (tokenResponse) => {
    try {
      const response = await axios.post('http://localhost:3030/api/auth/google', { token: tokenResponse.tokenId });
      // Handle response from backend if needed
      console.log(response.data);
    } catch (error) {
      // Handle error if the request fails
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


  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  //   onError: error => console.error(error),
  // });

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
