import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { counties } from "./utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./redux/actions/userActions";
import Loader from "./utils/Loader";

function Register() {
  const [locationUser, setLocationUser] = React.useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //redirect user to previous page
  const from = location?.state?.from?.pathname || "/";
  //check if user was registered successfuly
  React.useEffect(() => {
    if (!loading && !error && userInfo) {
      setSuccess(true);

      navigate('/');
    }

    if (error) {
      alert(error);
    }
  }, [userInfo, error,loading]);

  //handle handleSubmit
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    businessName: Yup.string().required("Business name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    // username: Yup.string()
    //   .required("Username is required")
    //   .min(6, "Username must be at least 6 characters")
    //   .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    //acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //submit form
  const onSubmit = async ({
    fullname,
    email,
    password,
    confirmPassword,
    businessName,
    phoneNumber,
  }) => {
    if (location === "") {
      alert("Please select your location");
    } else {
      dispatch(
        registerUser(
          fullname,
          email,
          phoneNumber,
          businessName,
          locationUser.value,
          password,
        )
      );
      console.log(
        fullname,
        email,
        password,
        confirmPassword,
        phoneNumber,
        locationUser.value,
      );
    }
  };
  return (
    <div classNameName="flex items-center justify-center h-screen bg-gray-100">
      {loading && <Loader />}
      <div className="px-8 py-6 mt-4 mb-4 text-left bg-white shadow-lg md:w-1/2 lg:w-1/3 sm:w-1/3 mx-auto">
        {success && (
          <div
            className="p-4 mb-4 flex text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium">Success!- </span> You have successfully
            created an account
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
        <h3 className="text-2xl font-bold text-center">Join us</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div>
              <label className="block" for="Name">
                Name
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                {...register("fullname")}
              />
            </div>
            {errors.fullname && (
              <span className="text-xs text-red-400">
                {errors.fullname.message}
              </span>
            )}
            <div className="mt-4">
              <label className="block" for="email">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-400">
                {errors.email.message}
              </span>
            )}
            <div className="mt-4">
              <label className="block" for="email">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="phoneNumber"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                {...register("phoneNumber")}
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-xs text-red-400">
                {errors.phoneNumber.message}
              </span>
            )}

            <div className="mt-4">
              <label className="block" for="email">
                Business Name (optional)
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="eg Patakenya Ltd"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                {...register("businessName")}
              />
            </div>
            {errors.businessName && (
              <span className="text-xs text-red-400">
                {errors.businessName.message}
              </span>
            )}
            <div className="mt-4">
              <label className="block" for="email">
                Location
              </label>
              <Select
                options={counties}
                className="focus:border-orange-300"
                name="location"
                value={locationUser}
                onChange={setLocationUser}
              />
            </div>
            {location === null && (
              <span className="text-xs text-red-400">Location is required</span>
            )}
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                name="password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className="text-xs text-red-400">
                {errors.password.message}
              </span>
            )}
            <div className="mt-4">
              <label className="block">Confirm Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                name="confirmPassword"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-400">
                {errors.confirmPassword.message}
              </span>
            )}
            <div className="flex items-center mt-4">
              <input
                id="checkbox-1"
                aria-describedby="checkbox-1"
                type="checkbox"
                className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                checked
              />
              <label
                for="checkbox-1"
                className="text-sm ml-3 font-medium text-gray-900"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>
            <div className="flex">
              <button
                className="w-full px-6 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-400"
                type="submit"
              >
                Create Account
              </button>
            </div>

            <div className="mt-6 text-grey-dark">
              Already have an account?
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

export default Register;
