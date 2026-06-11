import React from 'react';

interface Props {
    password: string;
}

const PasswordStrength: React.FC<Props> = ({ password }) => {
    const criteria = [
        { label: 'Minimálně 8 znaků', met: password.length >= 8 },
        { label: 'Velké písmeno', met: /[A-Z]/.test(password) },
        { label: 'Číslo', met: /[0-9]/.test(password) },
        { label: 'Speciální znak (!@#$%^&*)', met: /[!@#$%^&*]/.test(password) },
    ];

    const strengthScore = criteria.filter(c => c.met).length;

    const getStrengthMeta = () => {
        if (password.length === 0) return { label: 'Zadejte heslo', color: '#e0e0e0', width: '0%' };
        if (strengthScore <= 1) return { label: 'Slabé', color: '#ff4d4d', width: '33%' };
        if (strengthScore <= 3) return { label: 'Střední', color: '#ffa64d', width: '66%' };
        return { label: 'Silné', color: '#2db300', width: '100%' };
    };

    const { label, color, width } = getStrengthMeta();

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                Síla hesla: <span style={{ color }}>{label}</span>
            </div>

            <div style={{ width: '100%', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width, height: '100%', backgroundColor: color, transition: 'width 0.3s ease' }} />
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                {criteria.map((c, index) => (
                    <li key={index} style={{ color: c.met ? '#2db300' : '#888', fontSize: '0.9rem', marginBottom: '4px' }}>
                        {c.met ? '✓' : '○'} {c.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default PasswordStrength;