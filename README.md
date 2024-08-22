# GlobeTrekker

GlobeTrekker is a full-stack application that makes fitness both fun and educational! Once a user creates an account, they can set fitness mileage goals by selecting from various "trips" around the country. For example, a user with a smaller mileage goal can choose the Bright Angel Trail (8 miles), while a user with a larger mileage goal can choose the Appalachian Trail (2198 miles). Each time the user exercises (e.g. running, walking, biking, swimming), they can record those miles and view their trip progress.

If desired, the user may create a custom trip by providing a name, location and mileage goal. Users also have the option to purchase a premium upgrade for a one-time fee of $4.99, which provides them with access to international trips in addition to U.S. trips. GlobeTrekker utilizes a React frontend with a Flask API backend and is deployed via Render: https://globe-trekker.onrender.com/. The application integrates with Stripe Checkout for payment processing.

## Requirements

This application requires Python version 3.8.13.

## Installation and Usage

From the root project directory, type `pipenv install` and `pipenv shell` to activate the virtual environment and install the necessary dependencies. Once inside the virtual environment, change directory into the server folder and type `python app.py` to start the Flask API backend server. Next, open up a separate terminal and navigate to the client folder. Type `npm run dev` to start GlobeTrekker's frontend server (note: this application uses React with Vite). Once both servers are up and running, open the application in your browser and you will see the GlobeTrekker home page!

-----

## React Routes

GlobeTrekker's React frontend contains routes related to authentication, user trips, user trip entries, trip menu options and account upgrades.

### Authentication

GlobeTrekker allows users to either Sign Up (`/signup`) or Log In (`/login`). Users must provide a name, username, and password at the time of signup. The application uses Formik and Yup to validate signups and logins.

### User Trips

Once logged in, the user returns to the application's home page, where they can navigate to view their trips (`/my-trips`). This page contains summary cards of all ongoing trips specific to that user. Each card contains the trip name, location, distance goal, user progress bar (% complete and miles remaining), and a button to view the trip entries. Users may click the 'View Entries' button of a particular trip, or they can click the 'Start New Trip' button at the bottom of the page.

Users who purchase a premium upgrade will be able to view international trips, in addition to U.S. trips. Premium trips are marked with a gold star and are made available to users after they successfully complete their purchase with Stripe Checkout (see Account Upgrade section below for more information).

### Trip Entries

If a user clicks the 'View Entries' button of an individual trip card from the My Trips page, they can view all entries they have made for that trip (`/my-trips/:id`). Users may add new entries by providing the date and miles trekked. Once submitted, users can see the new entry and an updated progress bar. If needed, users can also edit or delete previous entries. The application uses Formik and Yup to validate entry additions and edits.

### Trip Menu

If a user clicks the 'Start New Trip' button from the My Trips page, they will be directed to a Trip Menu page, containing all available trips from which they can select (`/trip-menu`). GlobeTrekker contains 10 pre-set U.S. trips of varying distances and 10 pre-set international trips for premium users. Users may add a trip by clicking 'Add Trip' on the relevant trip card, or they can create a custom trip by providing a name, location and mileage goal. The application uses Formik and Yup to validate custom trips.

### Account Upgrade

If a user would like to upgrade to premium, they can navigate to the upgrade page (`/upgrade`) by clicking the Upgrade button in the top right hand corner. From here, users are directed to a Stripe-hosted payment page, where they can make a one-time payment of $4.99 to access the app's premium features.
> **Note:** This application utilizes Flask Stripe Test Mode. As such, users should provide Stripe-approved **test card details**, which mimic real credit card payments but do not involve the exchange of any real money:
> - Card number: 4242 4242 4242 4242
> - Expiration: any future date
> - CVC: any three digits
> - Zip: any five digits

After successful payment, users are directed back to their GlobeTrekker account, where they can navigate to the trips menu and view the new premium trips.

## Flask Models and RESTful Routes

GlobeTrekker's Flask API backend utilizes RESTful routing conventions based on three primary models: User, Trip and Entry. The application also contains a Stripe Checkout route.

### User

The User model inclues name, username, password hash and premium status. Passwords are hashed using the Flask-Bcrypt extension. The model contains the following constraints and validations:
- name, username and password hash cannot be null (i.e. required)
- name, username and password hash cannot be empty strings

User routes handle user authentication, session handling and premium upgrades. These can be accessed at `/api/signup`, `/api/login`, `/api/check_session`, `/api/logout` and `/api/users/<int:id>`.

### Trip

The trip model includes name, location, total_miles, image_path, boolean custom attribute and boolean premium attribute. The model contains the following constraints and validations:
- name, location and total_miles cannot be null (i.e. required)
- name and location cannot be empty strings
- total_miles cannot be negative

Trips can be accessed at `/api/trips`.

### Entry

The entry model includes date, miles, user_id and trip_id. The model contains the following constraints and validations:
- date, miles, user_id and trip_id cannot be null (i.e. required)
- miles cannot be negative

Users only need to provide date and miles for each entry, as user_id and trip_id are automatically added based on the current logged in user and the trip within which they are adding an entry.

Entry routes can be accessed at `/api/entries` and `/api/entries/<int:id>`.

> **Note:** By design, when a user adds a new trip (whether pre-set or custom), a new entry will also be automatically created behind the scenes, with date set to '0000-00-00' and miles set to 0. These entries will never be shown to the user, as 0-mile entries are always excluded. However, this action is necessary because the My Trips page is based on all trips where the user has existing entries. Thus, if a user starts a new trip but has not yet input any entries, there must be a placeholder entry to ensure the trip is properly rendered. 

### Stripe Checkout

This program processes one-time payments by creating a checkout session (`/api/create-checkout-session`) and redirecting users to a Stripe-hosted payment page. Upon successful payment, users are directed back to the GlobeTrekker application. 

-----

## Miscellaneous

Trips are predefined in the `seed.py` file in the server folder. Developers should run `python seed.py` after connecting their database.

Styling is done with Material UI.