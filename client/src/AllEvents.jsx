import React from 'react';
import EventForm from './EventForm';

function AllEvents(props) {
   var eventsData = props.allEvents.map((event, id) => {
      return <p>{event.name}</p>
   })
   return (
      <div class="eventForm">
         {props.userData}
         {props.eventsData}
         <EventForm handleSubmit={props.setAllEvents} setUser={props.setUser} eventsData={eventsData} />
      </div>
   )
}

export default AllEvents
