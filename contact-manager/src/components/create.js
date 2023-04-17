import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css"

export default function Create() {

    // useNavigate hook to navigate between pages
    const navigate = useNavigate();

    // initialize states for the form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    // function to post the form data to the mock API
    const postData = () => {
        axios
            .post("https://643599e1537112453fdac6b5.mockapi.io/mockData", {
                firstName: firstName,
                lastName: lastName,
                contactNumber: contactNumber,
            })
            .then(() => {
                navigate('/read'); // navigate to the Read page after successful submission
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // render the form fields and submit button
    return (
        <Form className="create-form">
            <Form.Field>
                <label className='create-label'>First Name</label>
                <input
                    id="first-name-input"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label className='create-label'>Last Name</label>
                <input
                    id="last-name-input"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label className='create-label'>Contact Number</label>
                <input
                    id="contact-number-input"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
            </Form.Field>
            <Button primary onClick={postData} type="submit">
                Submit
            </Button>
        </Form>
    );
}
