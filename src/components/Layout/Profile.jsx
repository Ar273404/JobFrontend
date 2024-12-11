import React from "react";
import { useContext } from "react";
import moment from "moment";
import { Context } from "../../index.js";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaBirthdayCake,
  FaUserTie,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(Context);

  // if(!isAuthenticated)
  // {
  //    NavigateTo("/");
  // }
  return (
    <div class="p-6">
      <div class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4">
        <div class="min-h-[256px]">
          <img
            src="https://img.freepik.com/premium-photo/simple-3d-character-illustrations-depicting-different-jobs-careers-clean-white-background_655090-259887.jpg"
            class="w-full h-80"
            alt=""
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-5 text-center">
            {user.name}
            {/* {console.log(user.name)} */}
          </h3>
          <p className="text-gray-700 text-base mb-3 flex items-center">
            <FaEnvelope className="mr-2 text-blue-500 text-xl" />
            <strong>Emaill:</strong> {user.email}
          </p>
          <p className="text-gray-700 text-base mb-3 flex items-center">
            <FaPhoneAlt className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">Phone:</strong> {user.phone}
          </p>
          <p className="text-gray-700 text-base mb-3 flex items-center">
            <FaBirthdayCake className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">Time:</strong>{" "}
            {moment(user.dob).format("DD/MM/YYYY")}
          </p>
          <p className="text-gray-700 text-base mb-2 flex items-center">
            <FaUserTie className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">Role:</strong> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
