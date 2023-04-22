import React from "react";
import Myinfo from "../../components/MyInfo/Myinfo";
import "./Profile.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { imageupload, verifyToken,removeimage } from "../../utils/Constants";
import { change } from "../../Redux/usernameReducer";
import { changeImage } from "../../Redux/userImageReducer";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Swal from "sweetalert2";

export default function Profile() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [fullname, setFullname] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    dispatch({ type: "logout" });
    navigate("/login");
  };

  useEffect(() => {
    const Token = localStorage.getItem("token");
    console.log("token", Token);
    if (!Token) {
      return navigate("/login");
    } else {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setName(res.data.user.username);
          setemail(res.data.user.email);
          setFullname(res.data.user && res.data.user.fullname);
          setImage(res.data.user.image.url);

          dispatch(change(res.data.user.username));
          dispatch(changeImage(res.data.user.image.url));
        })
        .catch((err) => {
          localStorage.removeItem("token");
        });
    }
  }, [navigate, dispatch]);

  const username = useSelector((state) => state.username);

  const addImage = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",

      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "img",
          imageUrl: e.target.result,
          imageHeight: 400,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Update",
          denyButtonText: `Change`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            uploadimg(file);
          } else if (result.isDenied) {
            addImage();
          }
        });
      };
      reader.readAsDataURL(file);
    }
    function uploadimg(file) {
      const Token = localStorage.getItem("token");
      let Stoken = JSON.stringify({ Token });
      let formData = new FormData();
      formData.append("image", file);
      axios
        .patch(`${imageupload}/${Stoken}`, formData)
        .then((res) => {
          console.log("profile", res);
          setImage(res.data.userdp.image.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  };
  const  remove=()=> {
    const Token = localStorage.getItem("token");
        let Stoken = JSON.stringify({ Token })
    axios.delete(`${removeimage}/${Stoken}`).then((res) => {
        setImage(res.data.image)
        dispatch(changeImage(res.data.image))
    }).catch((err) => {
        console.log(err);
    })

}

  return (
    <div>
      <div>
        <span>
          {username} <button onClick={logout}>Logout</button>
        </span>
        <button>
          <Link className="Link" to="/editprofile">
            Edit Profile
          </Link>
        </button>
        <img className="profilepic " src={image} alt="Cinque Terre" />

        <button
          onClick={addImage}
          type="button"
          className="btn btn-outline-primary ms-1"
        >
          Update image
        </button>
        <button onClick={remove} type="button" className="btn btn-primary">
          Remove image
        </button>
      </div>
    </div>
  );
}
