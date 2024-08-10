import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { sendEmail } from '../utils/email'; // Utility function to send emails

const CreateEmployee = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const supabase = useSupabaseClient();

    const handleCreateEmployee = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email,
            password, // Use the custom password provided by the admin
            options: {
                data: {
                    name: employeeName,
                    role: role,
                },
            },
        });

        if (error) {
            console.error('Error creating employee:', error);
            return;
        }

        // Send login details via email
        await sendEmail({
            to: email,
            subject: 'Your Trackata Login Details',
            text: `Hello ${employeeName},\n\nYour username is ${email} and your password is ${password}. Please keep this information secure.`,
        });

        console.log('Employee created successfully:', data);
    };

    return (
        <div className="container">
            <h2>Create Employee</h2>
            <form onSubmit={handleCreateEmployee}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="Employee">Employee</option>
                        <option value="Employee 2.0">Employee 2.0</option>
                    </select>
                </div>
                <button type="submit">Create Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
