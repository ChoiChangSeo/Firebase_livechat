import { useRef, useState } from 'react';
import LoginUI from './SignUpPresenter';
import React from 'react';
import {checkEmail,checkPassword} from '../commons/utils/loginValidation'
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth';
import { db, firebaseAuth } from '../../pages/_app';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export default function SignUpPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nickNameRef = useRef(null)
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

  const SignUpButton = async (e) => {
    e.preventDefault()
    if (!passwordValid || !emailValid) {
      return alert('이메일과 비밀번호를 정확하게 입력해주세요');
    }
    if (passwordValid && emailValid) {
      try{
        const result = await createUserWithEmailAndPassword(firebaseAuth, emailRef.current.value, passwordRef.current.value)
        const docRef = await setDoc(doc(db,"Users",result.user.uid),{
          email: emailRef.current.value,
          nickName: nickNameRef.current.value
        })
        await updateProfile(firebaseAuth.currentUser,{
          displayName: nickNameRef.current.value
        })
        router.push('/login')
      }catch(error){
        alert(error.message)
      }
      };
    }
      
    

  return (
    <LoginUI
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}s
      SignUpButton={SignUpButton}
      emailRef={emailRef}
      nickNameRef={nickNameRef}
      passwordRef={passwordRef}
      passwordValid={passwordValid}
      emailValid={emailValid}
    />
  );
}
