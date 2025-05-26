# DevTinder

- Created a Vite + React application
- Remove unnecessary code and created a hello world app
- Install tailwind css
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx seperate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body component
- Create a footer
- Create a login page

- Install axios
- CORS - install cors in backend => add middleware to with configurations: origin, credentials: true
- Whenever you're making API call so pass axios => { withCredentials: true }

- Install Redux Toolkit: https://redux-toolkit.js.org/tutorials/quick-start'
- Install react-redux + @redux/toolkit => configureStore => Provider => createSlice => add reducer to store
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in browser
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and add the feed in the store
- Build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page - See all my connections
- New Page - See all my connection requests
- Feature - Accept/Reject Connection Request
- Send/ignore user cards from feed
- Signup New User
- E2E Testing

# Deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-60-204-43.eu-north-1.compute.amazonaws.com
- install the same app node version on the server

Body
NavBar
Route=/ => Feed
Route=/login => Login
Route=/connections => Connections
Route=/profile => Profile
