import { ChangeEvent, FormEvent, useRef, useState } from "react";
import LoginUI from "./LoginPresenter";
import React from "react";
import { checkEmail, checkPassword } from "../commons/utils/loginValidation";
import { useRouter } from "next/router";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../../pages/_app";

export default function LoginPage() {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmailValid(checkEmail(emailInput));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value;
    setPasswordValid(checkPassword(passwordInput));
  };

  const LoginButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordValid || !emailValid) {
      return alert("이메일과 비밀번호를 정확하게 입력해주세요");
    }
    if (passwordValid && emailValid) {
      try {
        await signInWithEmailAndPassword(
          firebaseAuth,
          emailRef.current?.value,
          passwordRef.current?.value
        );
        localStorage.setItem("user", firebaseAuth.currentUser?.displayName);
        router.push("/main");
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };
  const SignUpButton = () => {
    router.push("/signup");
  };
  return (
    <LoginUI
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      LoginButton={LoginButton}
      SignUpButton={SignUpButton}
      emailRef={emailRef}
      passwordRef={passwordRef}
      passwordValid={passwordValid}
      emailValid={emailValid}
    />
  );
}
