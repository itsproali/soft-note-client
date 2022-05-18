import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase-init";
import Loading from "./Loading";

const Register = () => {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (loading || updating) {
    return <Loading />;
  }

  return (
    <div className="my-12 px-3">
      <h1 className="text-center text-3xl font-semibold">Create New Account</h1>
      <form
        onSubmit={handleRegister}
        className="bg-white w-full sm:w-[450px] rounded-lg shadow-lg p-4 sm:p-6 mx-auto my-4"
      >
        <input
          type="name"
          name="name"
          id="name"
          className="input border border-transparent focus:border-primary focus:outline-none w-full bg-gray-100 my-4"
          placeholder="Name"
          required
        />
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
        {updateError && <p className="text-red-500">{updateError.message}</p>}
        <input
          type="submit"
          value="Crete New Account"
          className="btn btn-primary w-full my-4"
        />
        <p className="text-center text-xs">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline text-purple-600">
            Login please
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
