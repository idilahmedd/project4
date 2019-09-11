import React, { useEffect } from 'react';
import axios from 'axios';
import {
   Link
} from 'react-router-dom';


function AllEvents({ allEvents, setSingleEvent}) {


   // useEffect(() => {
   //    console.log("all events for user: ", allEvents)
      // axios.get('/events/').then((response) => {
      //    showAllEvents()
      // })
   // }, [])

   let content;
   if (allEvents.length) {
      //there is data
      content = allEvents.map((event, index) => {
         return <div key={index}>
               <h3>{event.name}</h3>
               <h4>Location: {event.location}</h4>
               <h4>Start: {event.startTime} </h4>
               <p>Description: <br/></p>
               <p>{event.description}</p>
               <Link to={`events/${event._id}`}>
                  <button type="submit" class="button is-primary" onClick={() => {setSingleEvent(event)}}> Details</button>
               </Link>
            </div>
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
