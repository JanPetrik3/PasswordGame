import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import CharacterSequenceValidator from './CharacterSequenceValidator';
import PasswordTimeValidator from './PasswordTimeValidator';
import CountryFlagValidator from './CountryFlagValidator';
import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
    const [password, setPassword] = useState('');
    const [seqResult, setSeqResult] = useState({ isValid: false, count: 0 });
    const [timeResult, setTimeResult] = useState({ isTooFast: false, durationSeconds: 0 });


    const [isCountryValid, setIsCountryValid] = useState(false);


    const evaluatePassword = (pass: string): string => {
        if (pass.length === 0) return 'Zadejte heslo';
        const hasValidLength = pass.length >= 8;
        const hasUpper = /[A-Z]/.test(pass);
        const hasNumber = /[0-9]/.test(pass);
        const hasSpecial = /[!@#$%^&*]/.test(pass);

        const score = [hasValidLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
        if (score <= 1) return 'Slabé';
        if (score <= 3) return 'Střední';
        return 'Silné';
    };

    const passwordStrength = evaluatePassword(password);


    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);


    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword((prevPassword) => {
                const action = Math.random() < 0.5 ? 'add' : 'remove';
                if (action === 'add') {
                    return prevPassword + '😜';
                } else {
                    if (prevPassword.length === 0) return prevPassword;
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
                }
            });
        }, 10000);
        return () => clearInterval(sabotageInterval);
    }, []);

    const getStrengthColor = (strength: string) => {
        if (strength === 'Silné') return 'green';
        if (strength === 'Střední') return 'orange';
        if (strength === 'Slabé') return 'red';
        return '#888';
    };

    return (
        <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>Pokročilý Password Checker</h2>

            {}
            <PasswordInput password={password} setPassword={setPassword} />

            <PasswordStrength password={password} />

            <hr />

            <CharacterSequenceValidator
                password={password}
                onValidationChange={setSeqResult}
            />

            <PasswordTimeValidator
                password={password}
                onTimeValidationChange={setTimeResult}
            />

            {}
            <CountryFlagValidator
                password={password}
                onValidationChange={setIsCountryValid}
            />

            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #eee' }}>
                <h4>Systémový status:</h4>

                <p style={{ marginBottom: '10px' }}>
                    Aktuální síla:{' '}
                    <strong style={{ color: getStrengthColor(passwordStrength) }}>
                        {passwordStrength}
                    </strong>
                </p>

                {}
                <p style={{ color: isCountryValid ? 'green' : 'red' }}>
                    {isCountryValid ? '✅ Pasová kontrola schválena.' : '❌ Pasová kontrola: Neplatná země v hesle.'}
                </p>

                {timeResult.isTooFast && (
                    <p style={{ color: 'red' }}>⚠️ Varování: Heslo zadáno příliš rychle (možný bot)!</p>
                )}
                {seqResult.isValid ? (
                    <p style={{ color: 'green' }}>✅ Skvělá struktura: Obsahuje komplexní sekvence.</p>
                ) : (
                    <p style={{ color: 'orange' }}>💡 Tip: Zkuste proložit znaky (např. aB1*).</p>
                )}
            </div>
        </div>
    );
};

export default App;