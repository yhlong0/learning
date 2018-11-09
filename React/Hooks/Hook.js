import React, { useState } from 'react';
import Row from './Row';

export default function Greeting(props) {
    const [name, setName] = useState('Mary');
    const [surname, setSurname] = useState('Peter');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleSurnameChange(e) {
        setSurname(e.target.value);
    }

    return (
        <section>
            <Row label="Name">
                <input 
                    value={name}
                    onChange={handleNameChange}
                />
            </Row>
            <Row label="Surname">
                <input
                    value={surname}
                    onChange={handleSurnameChange}
                />
            </Row>
        </section>
    );
}