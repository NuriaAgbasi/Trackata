import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import Background from '../components/background.tsx';
import bcrypt from 'bcryptjs';
import emailjs from 'emailjs-com';

const CreateEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const { data } = await supabase.from('employees').select('*');
        setEmployees(data);
    };

    const sendEmail = (name, password) => {
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const userId = process.env.REACT_APP_EMAILJS_USER_ID;

        const templateParams = {
            to_name: name,
            name: name,
            password: password,
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then((response) => {
                console.log('Email sent successfully:', response.status, response.text);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    const handleCreateEmployee = async () => {

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from('employees').insert([{ name, password: hashedPassword, role, pages }]);
        if (error) {
            console.error('Error creating employee:', error);
        } else {
            fetchEmployees();
            sendEmail(name, password);
            logActivity(data[0].id, 'Employee created');
        }
    };

    const logActivity = async (employeeId, activity) => {
        const { error } = await supabase.from('activity_logs').insert([{ employee_id: employeeId, activity }]);
        if (error) console.error('Error logging activity:', error);
    };

    return (
        <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Employee Management
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    Customize your App
                </p>
            </header>
            <div>
                <div>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input type="text" placeholder="Pages (comma separated)" value={pages} onChange={(e) => setPages(e.target.value.split(','))} />
                    <button onClick={handleCreateEmployee}>Create Employee</button>
                </div>
                <ul>
                    {employees.map((employee) => (
                        <li key={employee.id}>{employee.name} - {employee.role}</li>
                    ))}
                </ul>
            </div>
        </Background>
    );
};

export default CreateEmployee;
