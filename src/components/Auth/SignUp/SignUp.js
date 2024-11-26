import React, { useState } from 'react';
import './SignUp.css'; // Assuming the CSS file is named Signup.css

export default function SignUp () {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    email: '',
    phoneNumber: '',
    role: '',
    id: '', // New field for ID
    password: '', // New field for password
  });

  // Function to handle form data changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle radio button change
  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the form data to be sent to the backend
    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthday: formData.birthday,
      gender: formData.gender,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      role: formData.role,
      id: formData.id,
      password: formData.password, // Include the password in the request
    };

    try {
      // Sending the form data to the backend (assuming your backend URL is '/api/register')
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration (e.g., redirect to login or show success message)
        console.log('User registered successfully:', data);
        alert('Registration successful!');
      } else {
        // Handle error from backend
        console.error('Error registering user:', data.error);
        alert('Error registering user: ' + data.error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Network error:', error);
      alert('There was an error with the registration. Please try again later.');
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="firstName">First Name</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="date"
                          id="birthday"
                          className="form-control form-control-lg"
                          value={formData.birthday}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="birthday">Birthday</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h6 className="mb-2 pb-1">Gender: </h6>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="femaleGender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={handleRadioChange}
                        />
                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="maleGender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={handleRadioChange}
                        />
                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="otherGender"
                          value="other"
                          checked={formData.gender === 'other'}
                          onChange={handleRadioChange}
                        />
                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="email">Email</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="phoneNumber"
                          className="form-control form-control-lg"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="id"
                          className="form-control form-control-lg"
                          value={formData.id}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="id">ID</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <select
                          id="role"
                          className="form-control form-control-lg"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Choose Role</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Student">Student</option>
                        </select>
                        <label className="form-label" htmlFor="role">Role</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <input
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
