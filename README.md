# Final Project - Neighborhood Map

This is the final project for Udacity FEND nanodegree. I need to develop a single page application featuring a map of a neighborhood using React.

I started the project by following the steps in the [Webinars: Neighborhood Map (P7) Sept-30 six walk-thrus created by @Forrest (FEND)](https://www.youtube.com/playlist?list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP). Then instead of using the react-google-maps package, I decided to implement the Google Map myself and give myself some challenge.

Below is the third-party API used in this project.

- [Google Map API](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Foursquare API](https://developer.foursquare.com/)
- [react-responsive package](https://github.com/contra/react-responsive)

## To Install and Launch Project

* download the project from [this github repository](https://github.com/sukpia/terri-neighborhood-map.git)
* change directory to the downloaded folder
* install all project dependencies with `npm install`
* launch the project with `npm start`
* the project requires react-responsive package

## Required App Functionality - completed all

### Interface Design
* Responsiveness: All application components render on-screen in a responsive manner
* Usability: All application components are usable across modern desktop, table, and phone browsers.

### Application Functionality
* Location Filter: Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.
* List View: A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.
  - clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g, bouncing, color change).
  - List functionality is responsive and runs erorr free.
* Map and Markers: Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
  - Clicking a marker displays unique information about a location somewhere on the page (modal, separate div, inside an infoWindow).
  - Any additional custom functionality provided in the app functions error-free.

### Asynchronous Data Usage
* Asynchronous API Requests: Application utilizes the Google Maps API or another mapping system and at least one non-Google third-party API. All data requests are retrieved in an asynchronous manner using either the Fetch API or XMLHttpRrequest.
* Error Handling: Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an API doesn’t load there should be some visible indication on the page that it didn’t load.

### Documentation
* README: A README file is included detailing all steps required to successfully run the application.
* Comments: Comments are present and effectively explain longer code procedures.

### Location Details Functionality
* Additional Location Data: Functionality providing additional data about a location is provided and sourced from a 3rd party API. Information can be provided either in the marker’s infoWindow, or in an HTML element in the DOM (a sidebar, the list view, a modal, etc.)
  - Provide attribution for the source of additional data. For example, if using Foursquare, indicate somewhere in your UI and in your README that you are using Foursquare data.
* Error Free: Application runs without console errors.
* Usability: Functionality is presented in a usable and responsive manner.

### Accessibility
* Focus: Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus.
* Site elements are defined semantically: Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate ARIA roles are defined.
* Accessible Images: All content-related images include appropriate alternate text that clearly describes the content of the image.

### Offline Use
* Service Worker: When available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.

### Application Architecture
* Proper Use of React:
  - React code follows a reasonable component structure.
  - State control is managed appropriately: event handlers are passed as props to child components, and state is managed by parent component functions when appropriate.
  - There are at least 5 locations in the model. These may be hard-coded or retrieved from a data API.
  - There are no errors. There are no warnings that resulted from not following the best practices listed in the documentation, such as using key for list items. All code is functional and formatted properly.
  
## How do I approach the Project

1. Setup project using `create-react-app` (assuming I already installed `create-react-app`):
```sh
create-react-app terri-neighborhood-map
```
2. Add full-screen Google Map to my project as react component. Thanks to the [stackflow](https://stackoverflow.com/questions/48493960/using-google-map-in-react-component) help.
3. Add a empty sidebar with input tag.
4. Write code to manually display markers on the map.
5. Add Foursquare API and display the markers based on the search on foursquare.
6. Add Highlighted locations in the sidebars
7. Add filter location feature.
8. Add Google Map Infowindow, need to re-write Google Map component.
9. Animate marker when clicking a location on the list view.
10. Add open/close button for the sidebar.
11. Add responsive design, using [react-responsive package](https://github.com/contra/react-responsive)
12. Add Accessibility Focus and Semantics
13. fix bugs (spend a lot of time fixing bugs and I hope it is error free now.)
14. Add service worker

## Challenges in this Project
This is by far the hardest project I have encountered, I guess it is because I have to use React and third party API:
* First Challenge, I am not familiar with React structure, since I just learned React in the last few lessons at the end of the course.
* Second Challenge, is the quota limit from Foursquare, I can't debug my code while my quota exceeded so it takes longer to get the project done.
At the end, I hope I can add more functionality to the project, however, time is up.
