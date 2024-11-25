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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you can add form validation or send data to your server
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
                          type="text"
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

// export default Signup;
