import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Title Required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Description Required'),
    amount: Yup.number().positive().required('Amount required'),
    claim_type: Yup.string().required('Type required'),
    user_id: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('UserID Required'),
  });

const ClaimsForm = () => {

    const [formStatus, setFormStatus] = useState({
        success: false,
        message: ''
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            amount: '',
            claim_type: '',
            user_id: '',
        },
        validationSchema: SignupSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log(values);
            // Sending the form data to the server
            axios.post('/api/claims', values)
                .then(response => {
                    console.log('Claim submitted successfully:', response.data);
                    setSubmitting(false);
                    // Set the form submission status to success and update the message
                    setFormStatus({ success: true, message: 'Claim submitted successfully!' });
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                    setSubmitting(false);
                    // Set the form submission status to failure and update the error message
                    setFormStatus({ success: false, message: 'Failed to save data. Please try again.' });
                });
        }
    });

    // Styles
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '20px', // for spacing between items
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
    };

    const labelStyle = {
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px 20px',
        background: '#007BFF',
        color: '#fff',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.3s',
    };

    return (
        <div>
        <form onSubmit={formik.handleSubmit} style={formStyle}>
            <label htmlFor="title" style={labelStyle}>Title</label>
            <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                style={inputStyle}
            />
            <label htmlFor="description" style={labelStyle}>Description</label>
            <input
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
                style={inputStyle}
            />
            <label htmlFor="amount" style={labelStyle}>Amount</label>
            <input
                id="amount"
                name="amount"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.amount}
                style={inputStyle}
            />
            <label htmlFor="claim_type" style={labelStyle}>Claim Type</label>
            <select 
                id="claim_type"
                name="claim_type"
                onChange={formik.handleChange}
                value={formik.values.claim_type}
                style={inputStyle} >
                <option value="" label="Select claim type" />
                <option value="type1" label="Type 1" />
                <option value="type2" label="Type 2" />
                <option value="type3" label="Type 3" />
            </select>
            <label htmlFor="user_id" style={labelStyle}>User ID</label>
            <input
                id="user_id"
                name="user_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.user_id}
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Submit</button>
        </form>
            {/* Render the form submission message if it exists */}
            {formStatus.message && (
                <div style={{
                    padding: '15px',
                    borderRadius: '5px',
                    margin: '20px 0',
                    backgroundColor: formStatus.success ? '#d4edda' : '#f8d7da',
                    color: formStatus.success ? '#155724' : '#721c24'
                }}>
                    {formStatus.message}
                </div>
            )}
        </div>
    );
};

export default ClaimsForm;
