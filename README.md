It is a web based Javascript applicatoin built wth NodeJs on server side, hadnlebars as templating engine.
### Features

- Make a rest api call to /api/v2/tickets api and fetches all the tickets;
- Pages through the results when there are more than 25 tickets.


## Project Structure
- It has routes folder which has all the app routes.
- It has pwd.env which store all the env variables like api url, authroisation variable,port
- It has tests folder which has the unit tests
- It has utilities folder which as util.js with some utilities
- The main app code is in the app.js file.
- The public fol;der has static files like css
- The views folder has files relaed to handlebar files





##Installation
1. **git clone** https://github.com/vishalveerareddy/Zendesk-Coding-Challenge
2. Run **npm install**
3. Open **pwd.env** file and edit the property ZENDESK_EMAIL_AUTH variable to Basic email:password  in bsae 64 format
4. Edit th property ZENDESK_API_BASE_URL with url of zendesk admin
5. Change the PORT variable if needed
6. Run the application with **node app.js**
7. Goto **locahost:port** and see the list of tickets
8. Click on each ticket to view it in detail
