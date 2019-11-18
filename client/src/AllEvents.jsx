import React, { useEffect } from 'react';
import axios from 'axios';
import {
   Link
} from 'react-router-dom';
import "bulma/sass/utilities/_all.sass";

function AllEvents({ allEvents, setSingleEvent }) {
   let content;
   if (allEvents.length) {
      content = allEvents.map((event, index) => {
         return <div key={index}>
            <div class="block">
               <article class="message">
            <div class="box is-danger">
                     <h1 class="title">{event.name}d</h1>
                     <h2 class="subtitle">Location: {event.location}</h2>
                     <h4>Start: {event.startTime} </h4>
                     <p>Description: <br /></p>
                     <p>{event.description}</p>
                     <Link to={`events/${event._id}`}>
                        <button type="submit" class="button is-primary" onClick={() => { setSingleEvent(event) }}> Details</button>
                     </Link>
                  </div>
               </article>
               </div>
            </div>
            
      })
   } else {
      content = <p>No Events!</p>
   }
   return (
      <div className="All">
         {content}
      </div>
   );
}
{/* <div class="tile is-ancestor">
   <div class="tile is-parent">
      <article class="tile is-child box">
         <p class="title">Hello World</p>
         <p class="subtitle">What is up?</p>
      </article>
   </div>
   <div class="tile is-parent">
      <article class="tile is-child box">
         <p class="title">Foo</p>
         <p class="subtitle">Bar</p>
      </article>
   </div>
   <div class="tile is-parent">
      <article class="tile is-child box">
         <p class="title">Third column</p>
         <p class="subtitle">With some content</p>
         <div class="content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
         </div>
      </article>
   </div>
</div> */}

export default AllEvents
