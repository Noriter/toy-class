import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import "./Auth.modules.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error: any) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async () => {
    let provider = new firebaseInstance.auth.GoogleAuthProvider();
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="v9_28">
      <div className="v9_57"></div>
      <div className="v17_108"></div>
      <span className="v9_64">안녕하세요</span>
      <span className="v9_66">토이 클래스에 오신 것을 환영합니다!</span>
      <div className="v9_58">
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
          <input
            type="submit"
            value={newAccount ? "Create Account" : "Sign In"}
          />
          {error}
        </form>
        <span onClick={toggleAccount}>
          {newAccount ? "Sign In" : "Create Account"}
        </span>
      </div>
      <span className="v9_59">회원 가입하고 토이 만들기</span>
      <div className="v9_61"></div>
      <span className="v9_62" onClick={onSocialClick}>
        구글 계정으로 로그인
      </span>
      <span className="v9_60">이메일로 로그인</span>
      <span className="v9_65">토이 클래스가 처음이신가요?</span>
      <span className="v9_72">이미 계정이 있으신가요?</span>
      <div className="v55_3"></div>
    </div>

    /*
    12_77: 배경색
    12_78: 이메일 버튼
    47_2: 패스워드 버튼
    12_80: 완료버튼
    12_87: 이메일로 로그인 버튼
    17_110: 구글 계정 버튼
    55_3: 사진
    */
  );
};
export default Auth;
