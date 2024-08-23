# Daily Vibe

### A daily mood tracker | Designed for Roulettech Inc. (Kangacook) assessment

Daily vibe is a daily mood tracker designed to give you insight on your 'vibe' through the days, weeks, and years.

The process is simple:

1. Log in once a day.
2. Choose a vibe that best describes how you feel.
3. Write about your day (optional)

A chart is provided that provides a graphical representation of your vibe trends. Click on a point (represented as an emoji) to view your journal entry for that day.

## Important Note

For the purpose of demonstration, a demo link is provided on the landing page. The demo profile has fake data that showcases what the chart looks like over time.

The sign in and sign up features are <b>implemented</b> and <b>functional</b>. The created accounts, and all other data, are stored using the Django ORM in SQLite.

## Implementation

### Frontend

- ReactJS is used to build a Single Page Application.</br>
- TypeScript is used as the language choice</br>
- TailwindCSS is used to style the website.

### Backend

- Django is used to host the backend server
- There are 4 API endpoints:

  1.  /api/data/get_all_vibes/

          Retrieve all the vibes for signed in user

  1.  /api/data/submit_vibe/

          Submit a vibe

  1.  /api/signin/

          Sign in an existing user

  1.  /api/signup/

          Create a new user

## Running the application

Note: The frontend directory is only to see the ReactJS code. The SPA static files are hosted by Django.

1.  Download the code.

1.  Extract the files.

1.  Open your CLI.

1.  Navigate to /daily_vibe

1.  Activate the shell:

        pipenv shell
    
1.  Install dependencies:

        pipenv sync

1.  navigate to /daily_vibe/backend, then run

        python manage.py runserver

1.  This will start the Django server on http://127.0.0.1:8000

1.  The full stack application is ready to use.
