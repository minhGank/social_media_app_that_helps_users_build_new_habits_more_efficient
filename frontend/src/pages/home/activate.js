import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import { useState } from "react";
import ActivateForm from "./ActiveForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
//---------- create a page for activate the account, the user will access to this page from the activatation email--------------

export default function Activate() {
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    activateAccount();
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          text={success}
          loading={loading}
          type="success"
          header="Account vertification succeeded."
        />
      )}

      {error && (
        <ActivateForm
          text={error}
          loading={loading}
          type="error"
          header="Account vertification failed."
        />
      )}

      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
