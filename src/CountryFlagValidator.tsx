import React, { useState, useEffect } from 'react';

interface Props {
    password: string;
    onValidationChange: (isValid: boolean) => void;
}

const CountryFlagValidator: React.FC<Props> = ({ password, onValidationChange }) => {

    const countries = [
        "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
    ];


    const [selectedCountry] = useState(() => {
        return countries[Math.floor(Math.random() * countries.length)];
    });


    const isCountryInPassword = password.toLowerCase().includes(selectedCountry.toLowerCase());


    useEffect(() => {
        onValidationChange(isCountryInPassword);
    }, [isCountryInPassword, onValidationChange]);

    const flagUrl = `https://flagcdn.com/w160/${selectedCountry.toLowerCase()}.png`;

    return (
        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', margin: '15px 0', textAlign: 'center' }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Geografické ověření:</strong>

            {}
            <img
                src={flagUrl}
                alt={`Vlajka státu ${selectedCountry}`}
                style={{ height: '50px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}
            />

            {}
            {isCountryInPassword ? (
                <p style={{ color: 'green', fontSize: '0.9rem' }}>
                    ✅ Výborně! Heslo obsahuje zkratku státu <strong>{selectedCountry}</strong>.
                </p>
            ) : (
                <p style={{ color: 'red', fontSize: '0.9rem' }}>
                    ❌ Heslo musí obsahovat dvoupísmennou zkratku země na obrázku (<strong>{selectedCountry}</strong>).
                </p>
            )}
        </div>
    );
};

export default CountryFlagValidator;