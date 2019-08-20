
import React from 'react';
import "bulma/sass/utilities/_all.sass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   Link
} from 'react-router-dom';
// import openNewAuthWindow from './openWindow';
// import axios from 'axios';

function Home(props) {
   
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
   
   
   // var userData =Object.keys(user).length === 0 ? <p></p> : <h2>Welcome {user.name}</h2> 

   return (

      
      <section class="hero is-light is-medium ">
         {/* <div class="hero-head">
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
                              <a onClick={props.handleLogin} > Facebook</a>
                           </a>
                        </span>
                     </div>
                  </div>
               </div>
            <hr />
            </nav>
         </div> */}
         <section class="hero-body" >
            <div class="container  is-large has-text-centered">
               <h1 class="title">
                  Kause
            </h1>
               <h2 class="subtitle">
                  The ultimate site to create and find you next great event!
               </h2>
               {props.userData}
            </div>
         </section>
         <section id="currencies  has-background-white">
            <div class="section is-large">
               <div class="container is-small">
                  <div class="columns">
                     <div class="column">
                        <img src="./kauseLogo.png"></img>
                     </div>
                     <div class="column2">
                        <h1 class="title has-text-dark has-text-centered " >Want to create your own Event?</h1>
                        <Link to="/events/new">
                        <button class="button is-primary has-text-dark is-rounded is-large is-outlined ">Start Here!</button>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* <footer class="hero-foot has-background-primary has-text-white is-medium">
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
         </footer> */}


      </section>
   )
}

export default Home
