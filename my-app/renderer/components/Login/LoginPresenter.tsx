import React from 'react';
import * as S from './LoginStyles';

export default function LoginUI(props) {
  return (
    <S.LoginWrapper>
      <S.Form onSubmit={props.LoginButton}>
        <S.InputWrapper>
          <S.Input
            emailValid={props.emailValid}
            onChange={props.onChangeEmail}
            ref={props.emailRef}
            placeholder="전화번호, 사용자 이름 또는 이메일"
          ></S.Input>
          <S.PasswordInput
            passwordValid={props.passwordValid}
            onChange={props.onChangePassword}
            ref={props.passwordRef}
            type="password"
            placeholder="비밀번호"
          ></S.PasswordInput>
          <S.Button
          passwordValid={props.passwordValid}
          emailValid={props.emailValid}
        >
          로그인
        </S.Button>
        </S.InputWrapper>
        <S.Division>
          <S.Mark></S.Mark>
        </S.Division>
      </S.Form>
      <S.SignUpWrapper>
        <S.SignUpFont>계정이 없으신가요?</S.SignUpFont>
        <S.SignUpButton onClick={props.SignUpButton}>가입하기</S.SignUpButton>
      </S.SignUpWrapper>
    </S.LoginWrapper>
  );
}
