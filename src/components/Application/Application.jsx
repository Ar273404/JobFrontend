import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../index";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
} from "react-icons/fa";
import { url } from "../../Api";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverletter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null); // Change to null initially
  const [loading, setIsLoading] = useState(false); // Track form submission loading state
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || user.role === "Employer") {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (allowedTypes.includes(file.type)) {
        setResume(file);
      } else {
        toast.error(
          "Invalid file type. Only JPG, PNG, and WebP files are allowed."
        );
      }
    }
  };

  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    setIsLoading(true); // Start loader
    const toastId = toast.loading("Submitting your application...");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverletter", coverletter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${url}/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(data.message);

      // Reset form fields
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setResume(null);
      setCoverLetter("");
      navigateTo("/job/getall");
    } catch (e) {
      toast.dismiss(toastId);
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <div>
      <section className="application">
        <div className="container">
          <h3>Application Form</h3>
            <form onSubmit={handleApplication}>
              <div className="form-group">
                <label>Name</label>
                <div className="input-group">
                  <FaUser className="icon" />
                  <input
                    type="text"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <div className="input-group">
                  <FaEnvelope className="icon" />
                  <input
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <div className="input-group">
                  <FaPhone className="icon" />
                  <input
                    type="tel"
                    value={phone}
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <div className="input-group">
                  <FaMapMarkerAlt className="icon" />
                  <input
                    type="text"
                    value={address}
                    name="adress"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Cover Letter</label>
                <div className="input-group">
                  <FaFileAlt className="icon" />
                  <textarea
                    value={coverletter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Cover letter"
                    name="cover letter"
                    required></textarea>
                </div>
              </div>
              <div className="form-group">
                <label>Resume</label>
                <input
                  type="file"
                  accept=".jpg, .png, .webp"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button type="submit" className="btn">
                Submit Application
              </button>
            </form>
        </div>
      </section>
    </div>
  );
};

export default Application;
