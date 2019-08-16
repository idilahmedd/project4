import React, {useState, useEffect} from 'react';
import './App.css';
import openNewAuthWindow from './openWindow';
import axios from 'axios';
//import eventDetail from './eventDetail';

//We had to define this because TS needs to know 
// the shape of our user model
export interface IUser {
  _id?: string;
  facebookId: number;
}
export interface IRepo {
  name: string
}
//A functional component must be of type  React.FC
const App: React.FC = () => {
  //useState can be used as a generic, using IUSER from above
  const [user, setUser]= useState<IUser>({} as IUser)
  const [repos, setRepos] = useState<IRepo[]>([])

  useEffect(() => {
    console.log('firing data fetch')
    if (Object.keys(user).length) {
      axios.get(`/api/user/events`)
        .then((res)=>{
          console.log(res.data);
        })
    }
  }, [user])

  function handleLogin(e: React.MouseEvent): void{
    e.preventDefault()
    var message: Promise<IUser> = openNewAuthWindow('/auth/facebook')
    message.then(res => {
      setUser(res)
    }).catch(err => {
      console.log(err)
    })
  }
  
  var userData =Object.keys(user).length === 0 ? <p>No user</p> : <p>{user.facebookId}</p> 
  var repoData = repos.map((repo, id) => {
    return <p>{repo.name}</p>
    })
  return (
    <div className="App">
      <a onClick={handleLogin} href= "/auth/facebook"> Log in hello</a>
      {userData}
      <p>Heeloo</p>
      {repoData}
      {/* <eventDetail /> */}
    </div>
  );
}

export default App;
