import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const supabase = useSupabaseClient();

    useEffect(() => {
        const fetchLogs = async () => {
            const { data, error } = await supabase.from('activity_log').select('*');
            if (error) console.error('Error fetching logs:', error);
            else setLogs(data);
        };

        fetchLogs();
    }, [supabase]);

    return (
        <div className="container">
            <h2>Activity Log</h2>
            <ul>
                {logs.map((log) => (
                    <li key={log.id}>
                        {log.timestamp} - {log.action} by {log.employee_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityLog;
