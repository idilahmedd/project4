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
import { fab, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faBullhorn, faUser, faHome} from '@fortawesome/free-solid-svg-icons';
import "bulma/sass/utilities/_all.sass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(fab, faCheckSquare, faBullhorn, faUser, faHome, faFacebook)

function App() {
  const [user, setUser] = useState({})
  const [allEvents, setAllEvents] = useState([])
  const [eventId, setEventId] = useState('')
  const [singleEvent, setSingleEvent] = useState({})

  useEffect(() => {
    if (Object.keys(user).length) {
    console.log('get events for current user.')
    axios.get('/api/events')
      .then((res) => {
        console.log("all events:", res.data);
        setAllEvents(res.data)
      })
  }
  }, [user])

  useEffect(() => {
    if (Object.keys(user).length) {
    console.log("second effect")
    axios.get(`/events/${eventId}/`).then((res) => {
      setSingleEvent(res.data)
      })
    }
  }, [user,eventId])


  // function showAllEvents() {
  //   console.log('firing data fetch')
  //   if (Object.keys(user).length) {
  //     axios.get('/api/events')
  //       .then((res) => {
  //         console.log("all events:", res.data);
  //         setAllEvents(res.data)
  //       })
  //   }
  // }

  function showSingleEvent() {
    console.log('firing data fetch')
    if (Object.keys(user).length) {
      axios.get(`/api/events/${eventId}`)
        .then((res) => {
          console.log("savedEvent:", res.data);
          setSingleEvent(res.data)
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
  function handleDelete( name, location, description, place, startTime) {
    console.log("it hit the delete route!")
    axios.delete('events/:id', {
      name: name,
      place: place,
      location: location,
      startTime: startTime,
      description: description
    }).then((response) => {
      axios.get('/api/events')
        .then(res => {
          setSingleEvent(res.data)
        })
    })
  }
  function handleEditSubmit(e, name, location, description, place, startTime) {
    e.preventDefault()
    axios.put(`/api/events/${eventId}`, {
      name: name,
      place: place,
      location: location,
      startTime: startTime,
      description: description
    }).then((response) => {
      console.log("we got this from the put response:", response)
      axios.get(`/api/events/${singleEvent._id}`)
        .then((res) => {
          console.log("Where is THIS", res)
          setSingleEvent(res.data)
        })
    })
  }
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
        
          <div class="hero-head">
            <nav class="navbar has-shadow">
              <div class="container is-small">
                <div class="navbar-brand">

                  <a class="navbar-item" alt=""> 
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
                    <a class="navbar-item is-active" alt="">
                      <span class="icon is-large">
                        <FontAwesomeIcon icon="home" />
                      </span>

                    </a>
                    {/* <a class="navbar-item" alt="">
                      <span class="icon is-large">
                        <FontAwesomeIcon icon="user" />
                      </span>
                      Sign Up!
                  </a>
                    <a class="navbar-item" alt="">

                      Log In
                  </a> */}
                    <span class="navbar-item">
                      <a class="button is-primary is-inverted" alt="">
                        <span class="icon">
                          <i class="fab fa-facebook"></i>
                        </span>
                        <a onClick={handleLogin} alt=""> Facebook</a>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <hr />
            </nav>
          </div>
          <main>
          <Route exact path='/' render={() => <Home setUser={setUser} userData={userData} />} />
          <Route exact path='/events' render={() => <AllEvents allEvents={allEvents} setSingleEvent={setSingleEvent} />} />
          <Route path='/new_event' render={() => <EventForm handleSubmit={setEventId} setUser={setUser} setAllEvents={setAllEvents}/>} />
          <Route path='/events/:id' render={() => <EventDetail user={user}  singleEvent={singleEvent} handleDelete={handleDelete} handleEditSubmit={handleEditSubmit} showSingleEvent={showSingleEvent}/>} />
          </main>
          <footer class="hero-foot has-background-primary has-text-white is-medium is-fixed-bottom">
            <nav class="tabs">
              <div class="container has-text-white">
                <ul>
                  <li class="is-active">Share</li>
                  <li><a alt="">Site Map</a></li>
                  <li><a alt="">Resources</a></li>
                  <li><a alt="">About</a></li>
                  <li><a alt="">Q/A</a></li>
                  <li><a alt="">Contact</a></li>
                  <a href="https://bulma.io" alt="">
                    <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24"></img>
                  </a>
                </ul>
              </div>
            </nav>
          </footer>
        
      </Router>
      {/* <a onClick={handleLogin} href= "/auth/facebook"> Log in hello</a> */}
      {userData}
      {/* <EventForm createdEvent={savedEvents} setSavedEvents={setSavedEvents}  /> */}

    </div>
  );
}

export default App;

