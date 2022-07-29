import React, { ChangeEvent, FormEvent, LegacyRef } from "react";
import * as S from "./SignUpStyles";

interface IPropsSignUpUI {
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeNickName: (e: ChangeEvent<HTMLInputElement>) => void;
  SignUpButton: (e: FormEvent<HTMLFormElement>) => void;
  emailRef: LegacyRef<HTMLInputElement>;
  nickNameRef: LegacyRef<HTMLInputElement>;
  passwordRef: LegacyRef<HTMLInputElement>;
  passwordValid: boolean;
  emailValid: boolean;
  nickNameValid: boolean;
}

export default function SignUpUI(props: IPropsSignUpUI) {
  return (
    <S.LoginWrapper>
      <S.Form onSubmit={props.SignUpButton}>
        <S.InputWrapper>
          <S.Input
            emailValid={props.emailValid}
            onChange={props.onChangeEmail}
            ref={props.emailRef}
            placeholder="이메일을 입력해주세요"
          ></S.Input>
          <S.PasswordInput
            passwordValid={props.passwordValid}
            onChange={props.onChangePassword}
            ref={props.passwordRef}
            type="password"
            placeholder="비밀번호는 8~16자리 영문,숫자,특수문자 포함입니다."
          ></S.PasswordInput>
          <S.NickNameInput
            onChange={props.onChangeNickName}
            ref={props.nickNameRef}
            nickNameValid={props.nickNameValid}
            placeholder="닉네임을 입력해주세요"
          ></S.NickNameInput>
          <S.Button
            passwordValid={props.passwordValid}
            emailValid={props.emailValid}
            nickNameValid={props.nickNameValid}
          >
            회원가입
          </S.Button>
        </S.InputWrapper>
        <S.Division>
          <S.Mark></S.Mark>
        </S.Division>
      </S.Form>
    </S.LoginWrapper>
  );
}
