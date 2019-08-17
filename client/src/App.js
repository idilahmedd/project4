import React, {useState, useEffect} from 'react';
import './App.css';
import openNewAuthWindow from './openWindow';
import axios from 'axios';

function App() {
  
  const [user, setUser]= useState({})
  const [events, setEvents] = useState([])
  const [eventId, setEventId] = useState('')

  useEffect(() => {
    console.log('firing data fetch')
    if (Object.keys(user).length) {
      axios.get(`/api/user/events`)
        .then((res)=>{
          console.log(res.data);
        })
    }
  }, [user])

  function handleLogin(e) {
    e.preventDefault()
    var message = openNewAuthWindow('/auth/facebook')
    message.then(res => {
      setUser(res)
    }).catch(err => {
      console.log(err)
    })
  }
  
  //var userData =Object.keys(user).length === 0 ? <p>No user</p> : <p>{user.facebookId}</p> 
  // var eventsData = events.map((event, id) => {
  //   return <p>{event.name}</p>
  // })
  var eventsData = <p>event data</p>
    
  return (
    <div className="App">
      <a onClick={handleLogin} href= "/auth/facebook"> Log in hello</a>
      {/* {userData} */}
      <p>Heeloo</p>
      {eventsData}
      {/* <eventDetail /> */}
    </div>
  );
}

export default App;

