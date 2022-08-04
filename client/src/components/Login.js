import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "./redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./utils/Loader";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  //check if user is logged in
  React.useEffect(() => {
    if (!loading && !error && userInfo) {
      setSuccess(true);
      const timer = setTimeout(() => {
        navigate(-1);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  });
  //handle user login
  const loginHandler = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setPasswordError(true);
      const timer = setTimeout(() => {
        setPasswordError(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      dispatch(signIn(email, password));
    }
  };
  return (
    <div classNameName="flex items-center justify-center h-screen bg-gray-100 relative ">
      {loading && <Loader />}
      <div className="px-8 py-6 mt-4 mb-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 mx-auto">
        {passwordError && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Error!-</span> Password mismatch
        </div>
        )}
        {error && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Error!-</span> {error}
        </div>
        )}
        {success && (
        <div
          className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Success!-</span>You have successfully logged in
        </div>
        )}
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-orange-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <form onSubmit={loginHandler}>
          <div className="mt-4">
            <div className="mt-4">
              <label className="block" for="email">
                Email
              </label>
              <input
                type="text"
                required
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block">Confirm Password</label>
              <input
                required
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <span className="text-xs text-red-400">Password must be same!</span>
            <div className="flex">
              <button
                className="w-full px-6 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-400"
                type="submit"
              >
                Login to Account
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              Don't have an account?
              <Link to="/login" className="text-blue hover:underline">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
