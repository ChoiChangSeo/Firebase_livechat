import React, { ChangeEvent, FormEvent, LegacyRef, MouseEvent } from "react";
import * as S from "./LoginStyles";

interface IPropsLoginUI {
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  SignUpButton: (e: MouseEvent<HTMLButtonElement>) => void;
  LoginButton: (e: FormEvent<HTMLFormElement>) => void;
  emailRef: LegacyRef<HTMLInputElement>;
  passwordRef: LegacyRef<HTMLInputElement>;
  passwordValid: boolean;
  emailValid: boolean;
}

export default function LoginUI(props: IPropsLoginUI) {
  return (
    <S.LoginWrapper>
      <S.Form onSubmit={props.LoginButton}>
        <S.InputWrapper>
          <S.Input
            emailValid={props.emailValid}
            onChange={props.onChangeEmail}
            ref={props.emailRef}
            placeholder="이메일을 입력해주세요"
          />
          <S.PasswordInput
            passwordValid={props.passwordValid}
            onChange={props.onChangePassword}
            ref={props.passwordRef}
            type="password"
            placeholder="비밀번호는 8~16자리 영문,숫자,특수문자 포함입니다."
          />
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
