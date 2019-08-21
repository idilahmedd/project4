import React from 'react';


function EventsDetail(savedEvent) {
   let content ;
   if (Object.keys(savedEvent).length> 0){
      //there are cats
      content = (
         <>
         <h1>{event.name}</h1>
         <p>Place:{event.place}</p>
         <p>Location: {event.location}</p>
         <p>Start Time: {event.startTime}</p>
         <p>Description: {event.description}</p>
         
         </>
      )
   }else {
      //no cats
      content = <p>No events Saved</p>
   }
   return (
      <>
         {content}
         <UpdateEvent />
      </>   
   );
}

export default EventsDetail
