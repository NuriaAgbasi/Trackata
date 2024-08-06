import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import Background from '../components/background.tsx'

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        const { data } = await supabase.from('activity_logs').select('*').order('timestamp', { ascending: false });
        setLogs(data);
    };

    return (
        <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Activity Logs
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    See what your Employee does
                </p>
            </header>
            <div>
                <ul>
                    {logs.map((log) => (
                        <li key={log.id}>{log.timestamp} - {log.activity}</li>
                    ))}
                </ul>
            </div>
        </Background>
    );
};

export default ActivityLogs;
