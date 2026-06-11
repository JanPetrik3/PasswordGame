import React, { useEffect } from 'react';

interface SequenceResult {
    isValid: boolean;
    count: number;
}

interface Props {
    password: string;
    onValidationChange: (result: SequenceResult) => void;
}

const CharacterSequenceValidator: React.FC<Props> = ({ password, onValidationChange }) => {
    const validateSequence = () => {
        let sequenceCount = 0;

        for (let i = 0; i <= password.length - 4; i++) {
            const part = password.substring(i, i + 4);
            const hasLower = /[a-z]/.test(part);
            const hasUpper = /[A-Z]/.test(part);
            const hasNumber = /[0-9]/.test(part);
            const hasSpecial = /[!@#$%^&*]/.test(part);

            if (hasLower && hasUpper && hasNumber && hasSpecial) {
                sequenceCount++;
            }
        }

        return {
            isValid: sequenceCount > 0,
            count: sequenceCount
        };
    };

    const result = validateSequence();


    useEffect(() => {
        const timer = setTimeout(() => {
            onValidationChange(result);
        }, 0);

        return () => clearTimeout(timer);
    }, [password, onValidationChange]);

    return (
        <div style={{ fontSize: '0.85rem', color: result.isValid ? '#2db300' : '#888', margin: '10px 0' }}>
            <strong>Sekvenční analýza:</strong> {result.isValid
            ? `Nalezeno ${result.count} komplexních sekvencí.`
            : "Žádná komplexní sekvence (m+V+1+*) nalezena."}
        </div>
    );
};

export default CharacterSequenceValidator;