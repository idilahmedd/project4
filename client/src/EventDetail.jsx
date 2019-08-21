import React from 'react';
import UpdateEvent from './UpdateEvent';


function EventsDetail({savedEvent}) {
   let content ;
   if (Object.keys(savedEvent).length> 0){
      //there are cats
      content = (
         <>
         <h1>{savedEvent.name}</h1>
         <p>Place:{savedEvent.place}</p>
         <p>Location: {savedEvent.location}</p>
         <p>Start Time: {savedEvent.startTime}</p>
         <p>Description: {savedEvent.description}</p>
         
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
