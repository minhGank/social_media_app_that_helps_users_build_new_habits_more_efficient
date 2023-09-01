import { Form, Formik } from "formik";
import RegisterInput from "../inputs/registerInput";
import { useState } from "react";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// ------------ending import-------------------

export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  //---------set up useState for userinfo -------//
  const [user, setUser] = useState(userInfos);

  //------validation----------//
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("First name is required.")
      .min(2, "First name must be between 3 and 30 characters.")
      .max(16, "First name must be between 3 and 30 characters.")
      .matches(/^[aA-zZ\s]+$/, "Number and special character are not allowed."),
    last_name: Yup.string()
      .required("Last name is required.")
      .min(2, "Last name must be between 3 and 30 characters.")
      .max(16, "Last name must be between 3 and 30 characters.")
      .matches(/^[aA-zZ\s]+$/, "Number and special character are not allowed."),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)"
      )
      .min(6, "Password must be between 6 and 30 characters.")
      .max(36, "Password must be between 6 and 30 characters."),
  });

  //----------- user object destructer-------------//
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  //-----------onChange function---------------//
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  //---------end of onChange function---------//

  const yearTemp = new Date().getFullYear();

  //---------take the totals day of a random month---------//
  const getDay = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };

  //------creating Array Of Month, Day , Year For the Input--------------
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (value, index) => 1 + index);
  const days = Array.from(new Array(getDay()), (val, index) => 1 + index);

  //----------set up useState for birthdate error---------//
  const [dateError, setDateError] = useState();

  //-------------set up useState for gender error-----//
  const [genderError, setGenderError] = useState();

  //-------------set up useState error-----//
  //every error that was sent from backend will store in setError //
  const [error, setError] = useState();

  //-------------set up useState for success-----//
  //every success messages was sent from backend will be store in setSuccess //
  const [success, setSuccess] = useState();

  //-------------set up useState for loading-----//
  // if everything is success, setLoading will go //
  const [loading, setLoading] = useState(false);

  //--------set function for submit----------//
  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        { first_name, last_name, email, password, bYear, bMonth, bDay, gender }
      );
      setError("");
      setSuccess(data.message);

      //save the data that was sent back from backend to variable data
      const { message, ...rest } = data;

      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        //send the value inside the variable data to cookies
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 3000);

      //-------end of success action, next is the section for error------
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  //--------end of onSubmit function -----------//

  //----start return----------
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i
            className="exit_icon"
            onClick={() => {
              setVisible(false);
            }}
          ></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          enableReinitialize
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                "it looks like you entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "it looks like you entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose your gender, you can change who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Email Adress"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New Password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col ">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                {/* <div className="reg_grid">
                  <select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, i) => {
                      return (
                        <option value={month} key={i}>
                          {month}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, i) => (
                      <option value={[year]} key={i}>
                        {[year]}
                      </option>
                    ))}
                  </select>
                  {dateError && <div className="input_error">{dateError}</div>}
                </div> */}
                <DateOfBirthSelect
                  days={days}
                  months={months}
                  years={years}
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                {/* <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  {genderError && (
                    <div className="input_error">{genderError}</div>
                  )}
                </div> */}
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
                <div className="reg_infos">
                  By clicking Sign Up, you agree to our{" "}
                  <a href="#">Terms, Data Policy</a> and{" "}
                  <a href="#">Cookie Policy</a>. You may receive SMS
                  Notifications from us and can opt out any time.
                </div>
                <div className="reg_btn_wrapper">
                  <button className="blue_btn open_signup">Sign Up</button>
                </div>
              </div>
              <DotLoader
                color="#1876f2"
                loading={loading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
