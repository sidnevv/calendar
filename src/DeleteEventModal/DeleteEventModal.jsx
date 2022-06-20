import React from 'react';

export const DeleteEventModal = ({ onDelete, eventText, onClose }) => {
    return (
        <>
            <div id="deleteEventModal">
                <h2>Event</h2>

                <p id="eventText">{eventText}</p>

                <button onClick={onDelete} id="deleteButton">Удалить</button>
                <button onClick={onClose} id="cancelButton">Закрыть</button>
            </div>

            <div id="modalBackDrop"></div>
        </>
    );
};