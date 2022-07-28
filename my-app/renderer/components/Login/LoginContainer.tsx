import { useRef, useState } from 'react';
import LoginUI from './LoginPresenter';
import React from 'react';
import {checkEmail,checkPassword} from '../commons/utils/loginValidation'
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../pages/_app';

export default function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const router = useRouter()

  const onChangeEmail = (e) => {
    const emailInput = e.target.value;
    setEmailValid(checkEmail(emailInput));
  };

  const onChangePassword = (e) => {
    const passwordInput = e.target.value;
    setPasswordValid(checkPassword(passwordInput));
  };

  const LoginButton = async (e) => {
    e.preventDefault()
    if (!passwordValid || !emailValid) {
      return alert('이메일과 비밀번호를 정확하게 입력해주세요');
    }
    if (passwordValid && emailValid) {
      try{
        await signInWithEmailAndPassword(firebaseAuth, emailRef.current.value, passwordRef.current.value);
        router.push('/main')
      }catch(error){
        alert(error.message)
      }
    }
  };
  const SignUpButton = () => {
router.push('/signup');
  }
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
