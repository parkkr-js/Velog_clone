import React from "react";
import styled from "styled-components";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { authState } from "../../state/atoms/authState";
import { on } from "events";

const LoginBtn: React.FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

  const onSuccess = async (res: any) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);

    try {
      const response = await fetch("http://localhost:8080/v1/oauth/login", {
        method: "POST",
        credentials: "include", // include, *same-origin, omit
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res.idToken), // Sending the Google token ID to your backend
      });

      if (response.ok) {
        // Handle successful authentication here
        console.log("Backend authentication successful");
      } else {
        // Handle errors here
        console.error("Backend authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication: ", error);
    }
  };

  const onFailure = (res: any) => {
    console.log("LOGIN FAILED! res: ", res);
  };
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};
export default LoginBtn;

const GoogleLoginButton = styled.button`
  background-color: #ffffff;
  color: #4285f4;
  padding: 10px;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e8e8e8;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #d6d6d6;
    transform: translateY(0);
  }
`;
