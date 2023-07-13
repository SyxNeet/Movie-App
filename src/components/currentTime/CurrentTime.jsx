import React, { useEffect, useState } from 'react'
import './style.scss'
function CurrentTime() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            setTime(timeString);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        <div>
            <div id='currentTime' style={{ color: '#fff', fontSize: '24px' }}>{time}</div>
        </div>
    );
}

export default CurrentTime