import React, { useState, useEffect, useRef } from 'react';

interface TimeResult {
    isTooFast: boolean;
    durationSeconds: number;
}

interface Props {
    password: string;
    onTimeValidationChange: (result: TimeResult) => void;
}

const PasswordTimeValidator: React.FC<Props> = ({ password, onTimeValidationChange }) => {

    const [displayDuration, setDisplayDuration] = useState('0.00');


    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {

        if (password.length === 1 && !startTimeRef.current) {
            startTimeRef.current = Date.now();
        }
        if (password.length === 0) {
            startTimeRef.current = null;
        }


        const now = Date.now();
        const duration = startTimeRef.current ? (now - startTimeRef.current) / 1000 : 0;
        const isTooFast = password.length > 5 && duration < 1.5;
        const durationString = duration.toFixed(2);


        setDisplayDuration(durationString);


        const timer = setTimeout(() => {
            onTimeValidationChange({
                isTooFast,
                durationSeconds: parseFloat(durationString),
            });
        }, 0);

        return () => clearTimeout(timer);
    }, [password, onTimeValidationChange]);

    return (
        <div style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginTop: '10px' }}>
            <span style={{ color: '#666' }}>Doba psaní: </span>
            {}
            <strong>{displayDuration}s</strong>
        </div>
    );
};

export default PasswordTimeValidator;