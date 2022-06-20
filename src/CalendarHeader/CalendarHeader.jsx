import React from 'react';

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
    return (
        <div id="header">
            <div id="monthDisplay">{dateDisplay}</div>
            <div>
                <button onClick={onBack} id="backButton">Пред.</button>
                <button onClick={onNext} id="nextButton">След.</button>
            </div>
        </div>
    );
};
