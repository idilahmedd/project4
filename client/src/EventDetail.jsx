import React, { useEffect, useState } from 'react';
import UpdateEvent from './UpdateEvent';
import axios from 'axios';
import {
   Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab, faFacebook } from '@fortawesome/free-brands-svg-icons'

function EventDetail({ user, singleEvent, handleDelete}) {
   // state for the event
   const [event, setEvent] = useState({})

   var singleEventCopy = Object.assign({}, singleEvent);
   // console.log("Keys in singleEventCopy:", Object.keys(singleEventCopy));

   // use effect
   useEffect(() => {
      console.log('check event detail', singleEventCopy)
      // if (Object.keys(user).length) {
      //    console.log("second effect")
      //    axios.get(`/events/${singleEventCopy._id}`).then((res) => {
      //       setEvent(res.data)
      //    })
      // }
   }, [singleEventCopy])



   let content;
   // console.log("Keys in singleEventCopy:", Object.keys(singleEventCopy));
   if (Object.keys(singleEventCopy).length) {
      //there are cats
      // console.log("further down event:", singleEventCopy);
      content = (
         <>
            <div class="box" style={{ width: "300px" }}>
               <h1>{singleEventCopy.name}</h1>
               <p>Place:{singleEventCopy.place}</p>
               <p>Location: {singleEventCopy.location}</p>
               <p>Start Time: {singleEventCopy.startTime}</p>
               <p>Description: {singleEventCopy.description}</p>
               <div class="fb-share-button"
                  data-href="http://localhost:3000/events/1"
                  data-layout="button" data-size="large"><a target="_blank"rel="noopener noreferrer"
                     href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fevents%2F1&amp;src=sdkpreparse"
                     class="fb-xfbml-parse-ignore">Share</a>

            </div>
            <FontAwesomeIcon icon="facebook" />
            <button onClick={(e) => handleDelete(singleEventCopy._id)} type="submit" class="button is-primary">Delete Event</button>
            </div>
         <p>Edit your event below:</p>
         <UpdateEvent />
         <Link to='/'>
            <button type="submit" class="button is-primary"> Home</button>
         </Link>
         </>
      )
   } else {
      //no events
      content = <p>No events Saved</p>
   }
   return (
      <>
         {content}
         <p>Edit your event below:</p>
         <UpdateEvent />
         <Link to='/'>
            <button type="submit" class="button is-primary"> Home</button>
         </Link>
      </>
   );
}

export default EventDetail
