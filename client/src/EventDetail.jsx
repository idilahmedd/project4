import React, { useEffect } from 'react';
import UpdateEvent from './UpdateEvent';
import axios from 'axios';
import {
   Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab, faFacebook } from '@fortawesome/free-brands-svg-icons'

function EventsDetail({ showSavedEvent, eventId, savedEvent, handleDelete }) {

   useEffect(() => {
      console.log("second effect")
      axios.get(`/events/${eventId}/`).then((response) => {
         showSavedEvent()
      })
   }, [eventId])


   let content;
   if (Object.keys(savedEvent).length > 0) {
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
   } else {
      //no events
      content = <p>No events Saved

      </p>
   }
   return (
      <>
         {content}

         <div class="box" style={{ width: "300px" }}>
            <h1>Walk for Brest Cancer</h1>
            <p>Place: DownTown Seattle</p>
            <p>Location: Seattle</p>
            <p>Start Time: 12pm</p>
            <p>Description: Come Support</p>
            <div class="fb-share-button"
               data-href="http://localhost:3000/events/1"
               data-layout="button" data-size="large"><a target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fevents%2F1&amp;src=sdkpreparse"
                  class="fb-xfbml-parse-ignore">Share</a>

            </div>
            <FontAwesomeIcon icon="facebook" />
            <button onClick={(e) => handleDelete(eventId)} type="submit" class="button is-primary">Delete Event</button>
         </div>
         <p>Edit your event below:</p>
         <UpdateEvent />
         <Link to='/'>
            <button type="submit" class="button is-primary"> Home</button>
         </Link>
      </>
   );
}

export default EventsDetail
