import React from 'react';


function AllEvents({allEvents,handleDelete}) {

   let content;
   if (allEvents.length) {
      //there is data
      content = allEvents.map((savedEvent, id) => {
         return <div><button onClick={() => handleDelete(savedEvent.id)} type="submit" class="button is-primary">Delete Event</button></div>
      })
   } else {
      //no data
      content = <p>No Events!</p>
   }
   return (
      <div className="All">
         {content}
      </div>
   );
}

export default AllEvents
