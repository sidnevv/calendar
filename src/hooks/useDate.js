import React, {useEffect, useState} from 'react'

export const useDate = (events, nav) => {
    const [dateDisplay, setDateDisplay] = useState('')
    const [days, setDays] = useState([])

    const eventForDate = date => events.find(e => e.date === date)

    useEffect(() => {
        const weekdays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
        const dt = new Date()

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('ru-Ru', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

        setDateDisplay(`${dt.toLocaleDateString('ru-RU', {month: 'long'}).toUpperCase()} ${year}`)
        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        const daysArr = []

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dayString = `${i - paddingDays}.${month + 1}.${year}`

            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: dayString
                })
            } else {
                daysArr.push({
                    value: 'padding',
                    event: null,
                    isCurrentDay: false,
                    date: ''
                })
            }
        }

        setDays(daysArr)
    }, [events, nav])

    return {
        days,
        dateDisplay
    }
}