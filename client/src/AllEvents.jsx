import React from 'react';


function AllEvents(props) {

   // let content;
   // if (events.length) {
   //       content = allEvents.map((event, id) => {
   //          return <h1 key={id}> {event.name} </h1>
   //       })
   // }
   var eventsData = props.allEvents.map((event, id) => {
      return <p>{event.name}</p>
   })








   // var eventsData = props.allEvents.map((event, id) => {
   //    return <p>{event.name}</p>
   // })
   return (
      <div class="eventForm">
         {eventsData}
         {/* {props.eventsData} */}
         <p>List of All saved EVENTS</p>
      </div>
   )
}

export default AllEvents
