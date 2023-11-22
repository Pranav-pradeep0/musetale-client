import React, { useState } from "react";
import Navbar from "../Home Components/Navbar";
import { deleteUser, editUser } from "../../service/allapi";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../service/baseurl";
import UserBlogs from "./UserBlogs";

const Profile = () => {
  const navigate = useNavigate();

  const profileInfo = JSON.parse(localStorage.getItem("user"));

  const [editedProfile, setEditedProfile] = useState({
    name: profileInfo.name,
    username: profileInfo.username,
    email: profileInfo.email,
    password: profileInfo.password,
    profilePic: profileInfo.profilePic,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedProfile({
      name: profileInfo.name,
      username: profileInfo.username,
      email: profileInfo.email,
      password: profileInfo.password,
      profilePic: profileInfo.profilePic,
    });
    setIsEditing(false);
    setPreview("");
  };

  const updatedUserDetails = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  console.log(editedProfile);

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const setProfile = (e) => {
    setImage(e.target.files[0]);
    setEditedProfile({ ...editedProfile, profilePic: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  // const handleSave = async () => {

  //     const headerConfig = {
  //         "Content-Type": "multipart/form-data"
  //     }

  //     const data = new FormData()

  //     data.append('profilePic', image)

  //     const response = await

  //     console.log(response);

  //     setIsEditing(false);
  // };

  const handleSave = async () => {
    const headerConfig = {
      "Content-Type": "multipart/form-data",
    };

    const data = new FormData();

    data.append("name", editedProfile.name);
    data.append("username", editedProfile.username);
    data.append("email", editedProfile.email);
    data.append("password", editedProfile.password);
    if (image) {
      data.append("profilePic", image);
    }

    const response = await editUser(profileInfo._id, data, headerConfig);

    console.log(response.data);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been successfully updated!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There`s an error updating your profile. Please try again.",
      });
    }
    setIsEditing(false);
  };

  const deleteAccount = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account after deletion.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const response = await deleteUser(profileInfo._id);
      localStorage.clear();
      Swal.fire("Deleted!", "Your account has been deleted.", "success");
      navigate("/home");
      window.location.href = "/home";
      console.log(response);
    }
  };

  return (
    <div>
      <Navbar></Navbar>

      <nav aria-label="breadcrumb" className="mx-5 mt-5 pt-4 px-5">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to={"/home"}>Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Profile
          </li>
        </ol>
      </nav>

      <div className="d-flex profile-conainer p-5 flex-wrap gap-5">
        <div className="me-auto">
          <div className="card bg-dark" style={{ width: "18rem" }}>
            {preview ? (
              <img src={preview} className="card-img-top" alt="Profile" />
            ) : editedProfile.profilePic ? (
              <img
                src={`${BASE_URL}/uploads/${profileInfo.profilePic}`}
                className="card-img-top"
              />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                className="card-img-top"
                alt="Profile"
              />
            )}

            {isEditing ? (
              <div className="px-4">
                <input
                  className="form-control mt-4 mb-2"
                  type="file"
                  name="profilePic"
                  id=""
                  onChange={setProfile}
                />
              </div>
            ) : (
              <div className="mb-4 pb-3"></div>
            )}
            <div className="pb-4">
              {isEditing ? (
                <input
                  className="form-control border-0 edit-input"
                  type="text"
                  value={editedProfile.name}
                  name="name"
                  onChange={updatedUserDetails}
                />
              ) : (
                <h3 className="text-center text-uppercase card-title">
                  {editedProfile.name}
                </h3>
              )}
            </div>
            <ul className="list-group list-group-light list-group-small">
              <li className="list-group-item px-4 text-white">
                Username : {editedProfile.username}
              </li>
              <li className="list-group-item px-4 text-white">
                {isEditing ? (
                  <input
                    className="form-control text-white p-0 border-0"
                    type="email"
                    value={editedProfile.email}
                    name="email"
                    onChange={updatedUserDetails}
                  />
                ) : (
                  editedProfile.email
                )}
              </li>
            </ul>
            <div className="card-body d-flex justify-content-evenly mt-3">
              <div>
                {isEditing ? (
                  <div className="d-flex justify-content-evenly gap-3 mx-auto ">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-outline-danger text-danger"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="">
                {!isEditing ? (
                  <button
                    className="btn btn-outline-danger text-danger"
                    onClick={deleteAccount}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow mx-auto">
          <UserBlogs></UserBlogs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
