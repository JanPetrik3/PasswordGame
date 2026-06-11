import React, { useState } from 'react';


interface Props {
    password: string;
    setPassword: (value: string) => void;
}


const PasswordInput: React.FC<Props> = ({ password, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Zadejte heslo:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Vaše heslo"
                    style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ padding: '8px', cursor: 'pointer' }}
                >
                    {showPassword ? 'Skrýt' : 'Zobrazit'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;