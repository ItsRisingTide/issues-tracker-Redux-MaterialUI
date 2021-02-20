It's an issue-tracker app.
Check it out : https://reminder-app-itsrisingtide.netlify.app

Here I use Redux-thunk for async data fetching, and besides that I decided to try MaterialUI as a design tool.

Redux-thunk:
- enabled hot-reloading of the root reducer, so whenever I pass a new reducer to `combineReducers` it's appering in redux-devtools instantly 
- I tried async fetching without Redux (by defining the scope of async function in useEffect)
  and with it (by adding Redux middleware, for `redux-thunk` `@reduxjs/toolkit` automatically add your thunks to the store
  so you just need to create your "async action" in the slice you export) 
  
  the redux way for async fetching seems way better: you can instantly pass errors or data to the state, the logic of manipulating with data 
  is held in redux all together and I feel making `useEffect` only dispatch actions for fetching is much more convinient
  (if component re-renders for some reason instead of fetching data again, we can easily check it in the store and avoid fetching it again)

MaterialUI:

- I really liked the idea of theme object where all design parameters are held and can be easily accessed;
