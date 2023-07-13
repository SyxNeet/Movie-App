import React, { useState } from 'react'
import './style.scss'
function SwitchTab({ data, onTabChange }) {

    const [selected, setSelected] = useState(0)
    const [left, setLeft] = useState(0)

    const handleSwitchTab = (data, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelected(index)
        }, 1000);
        onTabChange(data)
    }
    return (
        <div className='switchingTabs'>
            <div className='tabItems'>
                {data.map((data, index) => (
                    <span
                        className={`tabItem ${selected === index ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleSwitchTab(data, index)}
                    >
                        {data}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />
            </div>

        </div>
    )
}

export default SwitchTab