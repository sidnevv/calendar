import React, {useEffect, useState} from "react";
import {CalendarHeader} from "../CalendarHeader";
import {Day} from "../Day";
import {NewEventModal} from "../NewEventModal";
import {DeleteEventModal} from "../DeleteEventModal";
import {useDate} from "../hooks/useDate";

export const App = () => {
    const [nav, setNav] = useState(0)
    const [clicked, setClicked] = useState()
    const [events, setEvents] = useState(
        localStorage.getItem('events')
            ? JSON.parse(localStorage.getItem('events'))
            : []
    )

    const eventForDate = date => events.find(e => e.date === date)

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events))
    }, [events])

    const {days, dateDisplay} = useDate(events, nav)

    return (
        <>
            <div id="container">
                <CalendarHeader
                    dateDisplay={dateDisplay}
                    onNext={() => setNav(nav + 1)}
                    onBack={() => setNav(nav - 1)}
                />

                <div id="weekdays">
                    <div>Понедельник</div>
                    <div>Вторник</div>
                    <div>Среда</div>
                    <div>Четверг</div>
                    <div>Пятница</div>
                    <div>Суббота</div>
                    <div>Воскресенье</div>
                </div>

                <div id="calendar">
                    {days.map((d, index) => (
                        <Day
                            key={index}
                            day={d}
                            onClick={() => {
                                console.log('Click!')
                                if (d.value !== 'padding') {
                                    setClicked(d.date)
                                }
                            }}
                        />
                    ))}
                </div>
            </div>

            {
                clicked && !eventForDate(clicked) &&
                <NewEventModal
                    onClose={() => setClicked(null)}
                    onSave={title => {
                        setEvents([...events, {title, date: clicked}])
                        setClicked(null)
                    }}
                />
            }

            {
                clicked && eventForDate(clicked) &&
                <DeleteEventModal
                    eventText={eventForDate(clicked).title}
                    onClose={() => setClicked(null)}
                    onDelete={() => {
                        setEvents(events.filter(e => e.date !== clicked))
                        setClicked(null)
                    }}
                />
            }
        </>
    )
}
