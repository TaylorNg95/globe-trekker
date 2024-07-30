# GlobeTrekker

<!-- This Python Command Line Interface (CLI) application allows sports teams and/or individual competitors to track and manage their matches. The program utilizes SQLite3 and object-relational mapping (ORM) methods to manage opponent and match models. The program has full CRUD capabilities, allowing for users to view, add, delete, and update opponent data and match data. Match records consist of the following details: ID (unique identifier), match date (MM-DD-YY), match outcome (1 = win, 0 = loss), and opponent ID (unique identifier created for each new opponent record). -->

## Requirements

<!-- This application requires Python version 3.8.13. -->

## Installation and Usage

<!-- From the root project directory, type 'pipenv install' and 'pipenv shell' to activate your virtual environment and install the necessary dependencies. To run this application, change directory into the 'lib' folder. Within this folder, you will see the following: run.py, helpers.py, cli.py, and models folder (contains __init__.py and match and opponent models). From the lib directory, type './run.py' to start the program. This will initiate the command line interface, which runs from the 'cli.py' file. You should see a welcome message that says 'WELCOME TO YOUR MATCH LOG!' along with an options menu from which you can select any of 12 options. You will always be redirected back to this menu after making a selection and following the necessary instruction(s). Exit the program at any time by typing 'exit' from the options menu. -->

-----

## React Routes

[Overview: authentication, user trips, user trip entries, trip menu]

    ### Authentication - '/login' and '/signup'
    ### User trips - '/my-trips'
    ### Trip entries - '/my-trips/:id'
    ### Trip menu - '/trip-menu'

## Flask Models and RESTful Routes

[Overview: TBD]

    ### User
        1. Attributes: name, username, password (Bcrypt)
        2. Routes: GET, POST
    ### Trip
        1. Name, location, total_miles, image_path, custom
        2. Routes: GET, POST
    ### Entry
        1. Date, miles, user_id, trip_id
        2. Routes: GET, POST, PATCH, DELETE

-----

## Seed Data

[Overview: starting with 10 trips, 2 users, 2 sample entries]

<!-- NEED TO EXPLAIN THAT TRIPS GET ASSIGNED TO USER WITH 0 MILES INITIATION -->