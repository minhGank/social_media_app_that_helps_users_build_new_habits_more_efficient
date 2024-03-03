import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import DotLoader from "react-spinners/DotLoader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// --------end of importing-------------

const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ----------useState, set the login= {email: "", password:""}-------------
  const [login, setLogin] = useState(loginInfos);

  // --------setting the value of email and password to ""-----------
  const { email, password } = login;

  //---------setting the onChange handle funtion for setState------------
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // ---------Login valdation----------
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email"),
    password: Yup.string().required("Password is required"),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const LoginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );

      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_self_wrap">
      <div className="login_self_2">
        <div className="login_2_wrap">
          {/* -----create a form------- */}
          <Formik
            onSubmit={() => {
              LoginSubmit();
            }}
            enableReinitialize
            // setting the initialValues to email and password
            initialValues={{
              email,
              password,
            }}
            //setting the validation
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button className="blue_btn" type="submit">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <DotLoader
            color="#1876f2"
            loading={loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {error && <div className="error_text">{error}</div>}
          {/* forgot password */}
          <Link to="/forgot" className="forgot_password">
            Forgotten Password?
          </Link>

          <div className="sign_splitter"></div>
          <span className="orSignUpSpan">Or</span>
          <button onClick={() => setVisible(true)} className=" open_signup">
            Create Account
          </button>
        </div>
      </div>
      {/* ----------------------- */}

      <div className="login_self_1">
        {/*------ CHANGE THE LOGO HERE ---------*/}
        <img src="../../self-icon/Astaire2.png"></img>
        {/* <span>Build good habits together</span> */}
      </div>
    </div>
  );
}
