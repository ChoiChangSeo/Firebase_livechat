import React from 'react';
import * as S from './SignUpStyles';

export default function SignUpUI(props) {
  return (
    <S.LoginWrapper>
      <S.Form onSubmit={props.SignUpButton}>
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
          <S.NickNameInput
            ref={props.nickNameRef}
            placeholder="닉네임을 입력해주세요"
          ></S.NickNameInput>
          <S.Button
          passwordValid={props.passwordValid}
          emailValid={props.emailValid}
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
