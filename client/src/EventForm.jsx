import React, { useState } from "react";
import axios from 'axios';
import {
   Link
} from 'react-router-dom';

function EventForm({ setAllEvents, user }) {
   const [name, setName] = useState("");
   const [location, setLocation] = useState("");
   const [description, setDescription] = useState("");
   const [place, setPlace] = useState("");
   const [startTime, setStartTime] = useState('');


   function handleSubmit(e, name, location, description, place, startTime) {
      // e.preventDefault()
      console.log("The LOCATION:", location)
      axios.post('/api/events', {
         location: location,
         name: name,
         startTime: startTime,
         place: place,
         description: description,
      }).then((response) => {
         console.log("we got this from the post response:", response)
         axios.get('/api/events')
            .then(res => {
               console.log("this is the next GET request result:", res)
               console.log(res.data);
               setAllEvents(res.data);
            })
      })
   }
   return (
      <div class="container is-large has-text-centered ">
         <div class="columns ">
            <form class="form-horizontal" >
               <fieldset class="inputBox">
                  <div class="column is-narrow">
                     <div class="box" style={{ width: "300px" }}>
                        <div class="field">
                           <label class="label is-medium" for="textinput-0">Event Name</label>
                           <div class="control">
                              <input class="input is-medium" value={name} onChange={e => setName(e.target.value)} placeholder="Event Name" type="text" name="name" required></input>
                           </div>
                        </div>
                        <div class="field">
                           <label class="label is-medium" for="textinput-1">Place</label>
                           <div class="control">
                              <input class="input is-medium" value={place} onChange={e => setPlace(e.target.value)} placeholder="ex. Volunteer Park" type="text" name="place"></input>
                           </div>
                        </div>
                        <div class="field">
                           <label class="label is-medium" for="textinput-2">Location</label>
                           <div class="control">
                              <input class="input is-medium" value={location} onChange={e => setLocation(e.target.value)} placeholder="address" type="text" name="location" required></input>
                           </div>
                        </div>
                        <div class="field">
                           <label class="label is-medium" for="textinput-3">Start Time</label>
                           <div class="control">
                              <input class="input is-medium" value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="Time" type="text" name="startTime" required ></input>
                           </div>
                        </div>
                     </div>
                  </div>
               </fieldset>
            </form>
            <form class="form-horizontal" >
               <fieldset class="descriptionBox">
                  <div class="column ">
                     <div class="box" style={{ width: "600px" }}>
                        <div class="field">
                           <label class="label" for="textarea-1">Description</label>
                           <div class="control">
                              <textarea class="textarea" value={description} onChange={e => setDescription(e.target.value)} id="textarea-1" name="textarea-1">tell us about your event...</textarea>
                           </div>
                           {/* <!-- Button --> */}
                           <div class="field" style={{ padding: "20px" }}>
                              <div class="control">
                                 <Link to="/events">
                                    <button onClick={(e) => handleSubmit(e, name, location, description, place, startTime)} type="submit" class="button is-primary">Add to Events</button>
                                 </Link>
                                 <Link to='/'>
                                    <button type="submit" class="button is-primary"> Home</button>
                                 </Link>
                                 <Link to='/events'>
                                    <button type="submit" class="button is-primary"> All Events</button>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </fieldset>
            </form>
         </div>
      </div>
   )
}

export default EventForm;