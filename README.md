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
- git clone apps on server
- Frontend

  - cd <project folder>
  - install dependencies: npm install
  - npm run build
  - Install nginx
    - sudo apt update
    - sudo apt install nginx
  - Start nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
  - copy code from dist(build files) to /var/www/html/ -> (nginx http server)
    - cd devTinder-web
    - sudo scp -r dist/\* /var/www/html/
    - enable port :80 of your instance => instances -> security group -> Inbound rules -> add inbound rule

- Backend

  - cd <project folder>
  - install dependencies: npm install
  - updated DB password
  - allowed ec2 instance public IP on mongodb server
  - installed pm2: npm install pm2 -g
  - pm2 start npm -- start
  - logs: pm2 logs
  - clear pm2 logs: pm2 flush <process-name>
  - pm2 list, pm2 stop <process-name>, pm2 delete <process-name>
  - reassign the process name: pm2 start npm --name "devtinderbackend" -- start
  - nginx config: edit in: /etc/nginx/sites-available/default
  - restart nginx: sudo systemctl restart nginx

  Frontend = http://13.60.204.43:80/
  Backend = http://13.60.204.43:7777/

  Frontend = devtinder.com
  Backend = devtinder.com:7777 => devtiner.com/api

  nginx config: edit in: /etc/nginx/sites-available/default

  server_name 13.60.204.43;

  # Proxy requests for the /api path to the Node.js application

      location /api {
          # The address of your Node.js application
          proxy_pass http://127.0.0.1:7777;

          # These headers are important for the backend application to correctly identify the client and original request details
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;

          # Optional: Adjust timeouts if your API calls are long-running
          proxy_connect_timeout 60s;
          proxy_send_timeout 60s;
          proxy_read_timeout 60s;

          # Optional: If you need to handle websockets
          # proxy_http_version 1.1;
          # proxy_set_header Upgrade $http_upgrade;
          # proxy_set_header Connection "upgrade";
      }

  restart nginx: sudo systemctl restart nginx

- modify the base url in front end project to '/api'

# Adding a custom Domain name

- purchased domain name from godaddy
- signup on cloudflare and add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated
- DNS record: A -> devtinder.in 13.60.204.43
- Enable SSL for website

# Sending Emails via SES

- Create a IAM user
- Give Access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address identity
- Install AWS SDK = v3
  - Code example: https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Setup SesClient
- Access Credentials should be created in IAm under SecurityCredentials Tab
- Add the credentials to the env file
- Write code for SESClient
- Write code for Sending email address
- Make the email dynamic by passing more params to the run function

# Cron Jobs

- install the npm package: node-cron -> npm i node-cron
- Learning about cron expressions syntax - crontab.guru
- create a file in utils in server code called cronjob.js
- Schedule an connection request reminder email for each day morning
  - date-fns
  - Find all the unique email Id who have got connection Request in previous day
  - Send Email
  - Explore queue mechanism to send bulk emails: bee-queue and bull npm packages
  - Amazon SES Bulk Emails
  - Make send Email function dynamic

Body
NavBar
Route=/ => Feed
Route=/login => Login
Route=/connections => Connections
Route=/profile => Profile

# Real Time Chat using Websocket(socket.io)

- Build the UI for a chat window on /chat/:targetUserID
- create server from http module in backend
- Setup socket.io in backend
- npm i socket.io
- Setup frontend socket.io-client
- Initialise the chat
- createSocketConnection
- Listen to events
- Homework,
  - Improve the UI
  - Fix security bug
    - auth in web sockets
    - Can I send messages to a person how is not my friend
