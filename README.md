# Autocomplete movies search

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes

I've skipped handling race-condition for responses, but in production environment we should cancel previous requests when we are doing a new ones, so we don't rewrite recent search results by an older response.

## Start the application

1. Set [The Movie DB](https://www.themoviedb.org/settings/api) API key to `REACT_APP_API` variable in the `.env` file.
2. In the project directory run: `npm start`

It will run the application in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

