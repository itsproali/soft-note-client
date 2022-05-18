import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase-init";
import Loading from "./Loading";

const Login = () => {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="my-12 px-3">
      <h1 className="text-center text-3xl font-semibold">Login</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white w-full sm:w-[450px] rounded-lg shadow-lg p-4 sm:p-6 mx-auto my-4"
      >
        <input
          type="email"
          name="email"
          id="email"
          className="input border border-transparent focus:border-primary focus:outline-none w-full bg-gray-100 my-4"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="input border border-transparent focus:border-primary focus:outline-none w-full bg-gray-100 my-4"
          placeholder="Password"
          required
        />
        {error && <p className="text-red-500">{error.message}</p>}
        <input
          type="submit"
          value="Login"
          className="btn btn-primary w-full my-4"
              />
              <p className="text-center text-xs">Don't have an account? <Link to="/register" className="hover:underline text-purple-600">Register Now</Link></p>
      </form>
    </div>
  );
};

export default Login;
