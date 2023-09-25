# Trip Planner

A trip planning application to stay organize and ensuring all the preparations are completed for each trip.

## User Stories
AAU, I want to
- View all the trips I created
- Have an "add trip" page, and be able to enter
    - Trip Name
    - Trip Dates
    - Trip description
- See each trip's details on the show page
- Have the ability to add tasks on the trip details page
    - Booking flights, Airbnb, buy grocery, etc.
- Add attendants of the trip on the details page
- Let other people make comments on the details page
- Only be able to make any updates when logged in

#### Completed
- Setup connection and files
    - models, controllers/routers, ejs
    - basic CSS
- Setup trips/index
- Setup trips/show
- Setup trip/new
- Add upcoming & past section with sorting by dates
- Add edit and delete trip features
- Implement OAuth
- Add comments section & styling
- Add tasks section with add and delete buttons
- Add attendants section & styling

#### Ice Box
- Assign Tasks to attendants
- Send email notifications when attendent is added to the trip
- Like feature in comments section

##### HTML
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Merriweather:wght@300&display=swap" rel="stylesheet">
```
##### CSS
```css
font-family: 'Dancing Script', cursive;
font-family: 'Merriweather', serif;
```

## Technologies Used:
- Express.js
- Mongoose
- MongoDB
- EJS
- JavaScript
- CSS

## App
#### All Trips/index
![layout wireframe](https://i.imgur.com/TFh2Ahc.png)
#### Add Trip page/new
![layout wireframe](https://i.imgur.com/zfAU61f.png)
#### Trip Details/show
![layout wireframe](https://i.imgur.com/xpTcrq5.png)
#### ERD
![layout wireframe](https://i.imgur.com/rfPfWaf.png)

## [Link to Trip Planner](https://tripplanner.fly.dev/)