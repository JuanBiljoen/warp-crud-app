import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Update() {
    let navigate = useNavigate();

    // Declare states to store data for first name, last name, and contact number
    const [id, setID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    // Load data for the current contact on mount
    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setContactNumber(localStorage.getItem('Contact Number'));
    }, []);

    // Send PUT request to API to update contact data
    const updateAPIData = () => {
        axios.put(`https://643599e1537112453fdac6b5.mockapi.io/mockData/${id}`, {
            firstName,
            lastName,
            contactNumber
        }).then(() => {
            navigate('/read')
        })
    }

    // Render the form for updating contact data
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input id="contactNumber" name="contactNumber" placeholder='Contact Number' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
                </Form.Field>
                <Button primary type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
