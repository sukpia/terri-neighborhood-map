# Neighborhood Map Project

This is the final project for Udacity FEND nanodegree. I need to develop a single page application featuring a map of a neighborhood using React.

I started the project by following the steps in the [Webinars: Neighborhood Map (P7) Sept-30 six walk-thrus created by @Forrest (FEND)](https://www.youtube.com/playlist?list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP). Then instead of using the react-google-maps package, I decided to implement the Google Map myself.

Below is the third-party API used in this project.

- [Google Map API](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Foursquare API](https://developer.foursquare.com/)

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
13. fix bugs
14. Add service worker

