import { ChangeEvent, FormEvent, useRef, useState } from "react";
import LoginUI from "./SignUpPresenter";
import React from "react";
import { checkEmail, checkPassword } from "../commons/utils/loginValidation";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  OAuthProvider,
  updateProfile,
} from "firebase/auth";
import { db, firebaseAuth } from "../../pages/_app";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpPage() {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const nickNameRef = useRef<any>(null);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);
  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmailValid(checkEmail(emailInput));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value;
    setPasswordValid(checkPassword(passwordInput));
  };

  const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    const nickNameInput = e.target.value;
    nickNameInput ? setNickNameValid(true) : setNickNameValid(false);
  };

  const SignUpButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordValid || !emailValid || !nickNameValid) {
      return alert("이메일과 비밀번호 닉네임을 정확하게 입력해주세요");
    }
    if (passwordValid && emailValid && nickNameValid) {
      try {
        const result = await createUserWithEmailAndPassword(
          firebaseAuth,
          emailRef.current?.value,
          passwordRef.current?.value
        );
        const docRef = await setDoc(doc(db, "Users", result.user.uid), {
          email: emailRef.current?.value,
          nickName: nickNameRef.current?.value,
        });
        await updateProfile(result.user, {
          displayName: nickNameRef.current?.value,
        });
        router.push("/login");
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  return (
    <LoginUI
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onChangeNickName={onChangeNickName}
      SignUpButton={SignUpButton}
      emailRef={emailRef}
      nickNameRef={nickNameRef}
      passwordRef={passwordRef}
      passwordValid={passwordValid}
      emailValid={emailValid}
      nickNameValid={nickNameValid}
    />
  );
}
