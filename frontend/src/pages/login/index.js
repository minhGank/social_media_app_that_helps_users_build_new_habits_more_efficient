import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/login/Footer";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";
// end of importing

// start the component
export default function Login() {
  // start the return
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}
