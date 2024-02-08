import React, { useState } from 'react';
import Table from "./Table.js";
import styles from "./Form.module.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weekdays: [],
    gender: '',
    dob: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    weekdays: '',
    gender: '',
    dob: '',
  });

  const [tableData, setTableData] = useState([]);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number (10 digits)';
    }

    if(formData.weekdays.length == 0){
        errors.weekdays = 'Please select atleast one weekday';
    }

    if(!formData.gender.trim()){
        errors.gender = 'Please select atleast one';
    }

    if (!formData.dob.trim()) {
      errors.dob = 'Date of Birth is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      const numberPattern = /^[0-9\b]+$/;
    if(name != 'phone'){
        setFormData({...formData,[name]: value,});
    }else if(name == 'phone' && numberPattern.test(e.target.value)){
        setFormData({...formData,[name]: value,});
    }
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const updatedWeekdays = formData.weekdays.includes(value)
      ? formData.weekdays.filter((day) => day !== value)
      : [...formData.weekdays, value];

    setFormData({
      ...formData,
      weekdays: updatedWeekdays,
    });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      dob: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Add current form data to tableData
      setTableData([...tableData, formData]);

      // Reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        weekdays: [],
        gender: '',
        dob: '',
      });

      // Clear form errors
      setFormErrors({
        name: '',
        email: '',
        phone: '',
        weekdays: '',
        gender: '',
        dob: '',
      });
    }
  };

  const handleDelete = (rownum) => {
    setTableData(prevData => {
      const updatedData = prevData.splice(rownum,1);
      return updatedData;
    });
  };

  return (
    <div>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            className="input label"
            value={formData.name}
            onChange={handleInputChange}
          />
          <br/>
          {formErrors.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}
        </label>
        <br/>
        <label>
          Email:
          <input
            type="email"
            name="email"
            className="input label"
            value={formData.email}
            onChange={handleInputChange}
          />
          <br/>
          {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
        </label>
        <br/>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            maxLength="10"
            className="input label"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <br/>
          {formErrors.phone && <span style={{ color: 'red' }}>{formErrors.phone}</span>}
        </label>
        <br/>
          <label>Weekdays:</label>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                name="weekdays"
                value={day}
                checked={formData.weekdays.includes(day)}
                onChange={handleCheckboxChange}
              />
              {day}
            </label>
          ))}
          <br/>
          {formErrors.weekdays && <span style={{ color: 'red' }}>{formErrors.weekdays}</span>}
        <br/>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleRadioChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleRadioChange}
            />
            Female
          </label>
          <br/>
          {formErrors.gender && <span style={{ color: 'red' }}>{formErrors.gender}</span>}
        <br/>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleDateChange}
          />
          <br/>
          {formErrors.dob && <span style={{ color: 'red' }}>{formErrors.dob}</span>}
        </label>
        <br/>
        <p><button type="submit">Submit</button></p>
      </form>
      <Table tableData={tableData} deleteHandler={handleDelete}/>
    </div>
  );
};

export default Form;
