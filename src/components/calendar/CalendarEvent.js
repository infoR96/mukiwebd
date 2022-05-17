import React from 'react'

export const CalendarEvent = ({ event }) => {
    console.log('solucionar: ',event)

    const { title, user } = event;

    return (
        <div>
            <strong> { title } </strong>
            <span> { user.name } </span>
        </div>
    )
}
