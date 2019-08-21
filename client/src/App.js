import React, { useState, useEffect } from 'react';
import './App.css';
import openNewAuthWindow from './openWindow';
import axios from 'axios';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import EventDetail from './EventDetail';
import AllEvents from './AllEvents';

import EventForm from './EventForm';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faBullhorn, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import "bulma/sass/utilities/_all.sass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(fab, faCheckSquare, faBullhorn, faUser, faHome)

function App() {
  const [user, setUser] = useState({})
  const [allEvents, setAllEvents] = useState([])
  const [eventId, setEventId] = useState('')
  const [savedEvent, setSavedEvent] = useState({})


  function showAllEvents() {
    console.log('firing data fetch')
    if (Object.keys(user).length) {
      axios.get('/api/events')
        .then((res) => {
          console.log("IS THIS IT useEfft", res.data);
          setAllEvents(res.data)
        })
    }
  }
  function showSavedEvent() {
    console.log('firing data fetch')
    if (Object.keys(user).length) {
      axios.get(`/api/events/${eventId}`)
        .then((res) => {
          console.log("IS THIS IT useEfft", res.data);
          setSavedEvent(res.data)
        })
    }
  }

  function handleLogin(e) {
    e.preventDefault()
    var message = openNewAuthWindow('/auth/facebook')
    message.then(res => {
      setUser(res)
    }).catch(err => {
      console.log(err)
    })
  }
  handleDelete(eventId) {
    axios.delete(`/api/events/${eventId}`, {
      name: name,
      place: place,
      location: location,
      startTime: startTime,
      description: description
    }).then((response) => {
      axios.get('/api/events')
        .then(res => {
          setAllEvents(res.data)
        })
    })
    // function handleLogout(e) {
    //   e.preventDefault()
    //   // var message = openNewAuthWindow('/auth/facebook')
    //   // message.then(res => {
    //   //   setUser(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
    document.addEventListener('DOMContentLoaded', () => {

      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

          });
        });
      }

    });

    var userData = Object.keys(user).length === 0 ? <p></p> : <p>Welcome, {user.name}!</p>


    return (
      <div className="App">
        <Router>
          <section class="hero is-light is-medium has-navbar-fixed">
            <div class="hero-head">
              <nav class="navbar has-shadow  is-fixed-top">
                <div class="container is-small">
                  <div class="navbar-brand">

                    <a class="navbar-item">
                      <span class="icon is-large">
                        <FontAwesomeIcon icon="bullhorn" />
                      </span>
                      Kause
                </a>
                    <div class="navbar-burger burger" data-target="navbarMenuHeroA">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div id="navbarMenuHeroA" class="navbar-menu">
                    <div class="navbar-end">
                      <a class="navbar-item is-active">
                        <span class="icon is-large">
                          <FontAwesomeIcon icon="home" />
                        </span>

                      </a>
                      <a class="navbar-item">
                        <span class="icon is-large">
                          <FontAwesomeIcon icon="user" />
                        </span>
                        Sign Up!
                  </a>
                      <a class="navbar-item">

                        Log In
                  </a>
                      <span class="navbar-item">
                        <a class="button is-primary is-inverted">
                          <span class="icon">
                            <i class="fab fa-facebook"></i>
                          </span>
                          <a onClick={handleLogin} > Facebook</a>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
              </nav>
            </div>
            <footer class="hero-foot has-background-primary has-text-white is-medium is-fixed-bottom">
              <nav class="tabs">
                <div class="container has-text-white">
                  <ul>
                    <li class="is-active">Share</li>
                    <li><a>Site Map</a></li>
                    <li><a>Resources</a></li>
                    <li><a>About</a></li>
                    <li><a>Q/A</a></li>
                    <li><a>Contact</a></li>
                    <a href="https://bulma.io">
                      <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24"></img>
                    </a>
                  </ul>
                </div>
              </nav>
            </footer>
          </section>
          <Route exact path='/' render={() => <Home setUser={setUser} userData={userData} />} />
          <Route exact path='/events' render={() => <AllEvents allEvents={allEvents} showAllEvents={showAllEvents} handleEventEdit={handleEventEdit} handleDelete={handleDelete} />} />
          <Route exact path='/events/:id' render={() => <EventDetail savedEvent={savedEvent} showSavedEvent={showSavedEvent} />} />
          <Route exact path='/events/new' render={() => <EventForm handleSubmit={setEventId} setUser={setUser} />} />
        </Router>
        {/* <a onClick={handleLogin} href= "/auth/facebook"> Log in hello</a> */}
        {userData}
        {/* <EventForm createdEvent={savedEvents} setSavedEvents={setSavedEvents}  /> */}

      </div>
    );
  }

  export default App;

