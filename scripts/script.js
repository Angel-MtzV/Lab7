// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let body = document.querySelector("body");
let h1 = document.querySelector("h1");
let jEntry = document.querySelector("main");

let journalEntries = jEntry.children;
let imgEl = document.querySelector("img[alt=settings]");


imgEl.onclick = function () {
  setState("{settings}");
  body.className = "settings";
  h1.innerHTML = "Settings";
}

h1.onclick = function() {
  setState("{home}");
  body.className = "";
  h1.innerHTML = "Journal Entries";
}

jEntry.addEventListener('click', function(event) {
  let index = 0;

  for(let i = 0; i < journalEntries.length; i++){
    if(journalEntries[i] == event.target){
      index = i + 1;
    }
  }

  body.className = "single-entry";
  h1.innerHTML = "Entry " + index;
  setState("{entry}", index);
  document.querySelector('entry-page').remove();
   
  let entryPost = document.createElement('entry-page');

  entryPost.entry = jEntry.children[index-1].entry;

  body.appendChild(entryPost);

});

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});
