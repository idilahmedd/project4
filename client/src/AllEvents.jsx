import React from 'react';


function AllEvents(allEvents) {

   let content;
   if (allEvents.length) {
      //there is data
      content = allEvents.map((savedEvent, id) => {
         return <p onClick={() => handleEventEdit(savedEvent.id)} key={id}>{event.name}</p>
         <button onClick={() => handleDelete(savedEvent.id)} type="submit" class="button is-primary">Delete Event</button>
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
