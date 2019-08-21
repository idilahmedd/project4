import React, { useState} from 'react'
import axios from 'axios';
import {
   Link
} from 'react-router-dom';

function UpdateEvent({user, handleEditSubmit}) {
   const [name, setNewName] = useState("");
   const [location, setNewLocation] = useState("");
   const [description, setNewDescription] = useState("");
   const [place, setNewPlace] = useState("");
   const [startTime, setNewStartTime] = useState('');
   
   
   return (
      <div>
         <div class="container is-large has-text-centered ">
         <div class="columns ">
            <form class="form-horizontal" >
               <fieldset class="inputBox">
                  {/* <!-- Text input--> */}
                  <div class="column is-narrow">
                     <div class="box"style={{width: "300px"}}>
                     <div class="field">
                        <label class="label is-medium" for="textinput-0">Event Name</label>
                        <div class="control">
                           <input class="input is-medium" value={name} onChange={e => setNewName(e.target.value)} placeholder="Event Name" type="text" name="name" required></input>
                        </div>
                     </div>
                     {/* <!-- Text input--> */}
                     <div class="field">
                        <label class="label is-medium" for="textinput-1">Place</label>
                        <div class="control">
                           <input class="input is-medium" value={place} onChange={e => setNewPlace(e.target.value)} placeholder="ex. Volunteer Park" type="text" name="place"></input>
                        </div>
                     </div>
                     {/* <!-- Text input--> */}
                     <div class="field">
                        <label class="label is-medium" for="textinput-2">Location</label>
                        <div class="control">
                           <input class="input is-medium" value={location} onChange={e => setNewLocation(e.target.value)} placeholder="address" type="text" name="location" required></input>
                        </div>
                     </div>
                     {/* <!-- Text input--> */}
                     <div class="field">
                        <label class="label is-medium" for="textinput-3">Start Time</label>
                        <div class="control">
                           <input class="input is-medium" value={startTime} onChange={e => setNewStartTime(e.target.value)} placeholder="Time" type="text" name="startTime" required ></input>
                        </div>
                     </div>
                     </div>
                  </div>
               </fieldset>
            </form>
            <form class="form-horizontal" >
               <fieldset class="descriptionBox">

                  {/* <!-- Form Name -->
            <legend>Form Name</legend> */}

                  {/* <!-- Textarea --> */}
                     <div class="column ">
                        <div class="box" style={{width: "600px"}}>
                        <div class="field">
                        <label class="label" for="textarea-1">Description</label>
                        <div class="control">
                           <textarea class="textarea" value={description} onChange={e => setNewDescription(e.target.value)}id="textarea-1" name="textarea-1">tell us about your event...</textarea>
                        </div>
                        {/* <!-- Button --> */}
                        <div class="field" style={{padding: "20px"}}>
                           
                           <div class="control">
                           <Link to='/events/:id'>
                              <button onClick={(e) => handleEditSubmit(e, name, location, description, place, startTime)} type="submit" class="button is-primary">Add to Events</button>
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

      </div>
   )
}

export default UpdateEvent;
