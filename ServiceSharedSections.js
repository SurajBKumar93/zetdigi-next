import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');
        try {
            const response = await axios.post('/api/contact', {
                name,
                email,
                message
            });
            if (response.status === 200) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
            <button type="submit">Submit</button>
            {status === 'success' && <p>Message sent successfully!</p>}
            {status === 'error' && <p>There was an error sending your message.</p>}
        </form>
    );
};

export default ContactForm;
