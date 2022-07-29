import styled from "@emotion/styled";

interface IPropsPasswordValid {
  passwordValid: boolean;
}
interface IPropsEmailValid {
  emailValid: boolean;
}
interface IPropsValid {
  emailValid: boolean;
  passwordValid: boolean;
}
export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  padding: 2%;
  background-color: #eeeeee;
`;
export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-bottom: 15px;
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 5%;
`;
export const Input = styled.input<IPropsEmailValid>`
  border-radius: 5px;
  border: ${(props) =>
    props.emailValid ? "1px solid #eeeeee" : "1px solid #f77167"};
  width: 80%;
  height: 50px;
  padding-left: 5px;
  margin-bottom: 20px;
  font-size: 15px;
`;

export const PasswordInput = styled.input<IPropsPasswordValid>`
  border-radius: 5px;
  border: ${(props) =>
    props.passwordValid ? "1px solid #eeeeee" : "1px solid #f77167"};
  width: 80%;
  height: 50px;
  padding-left: 5px;
  margin-bottom: 20px;
  font-size: 15px;
`;

export const Button = styled.button<IPropsValid>`
  width: 80%;
  height: 40px;
  background-color: ${(props) =>
    props.passwordValid && props.emailValid ? "#2c88dd" : "#9fc5e8"};
  border-radius: 5px;
  font-size: 17px;
  color: white;
  cursor: pointer;
`;

export const Division = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

export const Mark = styled.div`
  width: 90%;
  border-bottom: 2px solid #eeeeee;
`;

export const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  padding: 30px;
  margin-bottom: 30px;
  background-color: white;
  border: 1px solid lightgray;
`;

export const SignUpFont = styled.div`
  font-size: 17px;
  margin-right: 10px;
`;

export const SignUpButton = styled.button`
  font-size: 17px;
  font-weight: bold;
  color: #3d85c6;
  cursor: pointer;
  :hover {
    text-decoration: underline;
    color: #3d85c6;
  }
`;
