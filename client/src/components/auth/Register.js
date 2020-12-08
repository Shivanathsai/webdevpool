import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  // making a controlled component
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className='register'>
      <Link to="/">
      </Link>
      <div className="register-form">
        <h1>Create Account</h1>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <h5 className="text-size">Your name</h5>
          <input type="text"
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <h5 className="text-size">Email</h5>
          <input type="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
                </small>
          <h5 className="text-size">Password</h5>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <h5 className="text-size">Confirm Password</h5>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
          <input type="submit" className="signIn" value="Register" />
          <p>
            Already have an account? <Link style={{ fontSize: "1.1rem", fontWeight: "bold", textDecoration: "underline" }} to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
