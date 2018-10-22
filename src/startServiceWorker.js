// Get service worker help from walk-thru Webinar:
// https://www.youtube.com/watch?v=LvQe7xrUh7I&index=6&list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s&t=0s

export default function startServiceWorker() {
	if('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js', {scope: '/'})
		.then(function(reg) {
			console.log('Registration succeeded!', reg);
		})
		.catch(function(error) {
			console.log('Registration failed with' + error);
		});
	}
}