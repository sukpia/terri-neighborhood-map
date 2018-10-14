// Yelp API
// client ID: IeEd91xX4Aq_8trpsaH1pQ
// API Key: Svi8rEDIY4oPGlUPwbUI8m8cWRLwWF9x2Lv7rZWkv3oHo0SQyIaLYFrCNuq92cd3uX5D0M2RSa6xKJZBEw5yTG09zAzXHln83y-WpukEHwCrCeOKKUo3RQirkXHCW3Yx

// Using Foursquare API
// https://developer.foursquare.com/docs/api

class Helper {
	static baseURL() {
		return "https://api.foursquare.com/v2";
	}

	static auth() {
		const keys = {
			client_id: "ZVGSAX3HN0Z3YKKWKYARWCWHLTZY5IQITD5FKXYETIF2MH0X",
			client_secret: "2VIFNOCCG2WSLSPXKVP1DSTV2S443ICRX0QTNWVTBWID0NCD",
			v: "20181004"
		};

		return Object.keys(keys)
			.map(key => `${key}=${keys[key]}`)
			.join("&");
	}

	static urlBuilder(urlParams) {
		if(!urlParams) {
			return "";
		}
		return Object.keys(urlParams)
			.map(key => `${key}=${urlParams[key]}`)
			.join("&");
	}

	static headers() {
		return {
			Accept: "application/json"
		};
	}

	static simpleFetch(endPoint, method, urlParams) {
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`, requestData)
			.then(res => res.json())
			.catch(error => {
				alert(`API simpleFetch Error: ${error}`);
			});
	}

}

export default class SquareAPI {
	// Search for Venues, parameters used are:
	// near: San Francisco, CA
	// query: hotels
	// limit: up to 50
	static search(urlParams) {
		return Helper.simpleFetch("/venues/search", "GET", urlParams);
	}

	// Get the venue's name, location, photos
	static getVenueDetails(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	}

	// Get a list of photos for a venue
	static getVenuePhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}

	// Returns a list of recommended venues near the selected location, parameters used:
	// near: San Francisco, CA
	// section: food, drinks, coffee, shops, arts, outdoors, sights, trending/specials, nextVenues, topPicks
	// limit: up to 50
	static explore(params) {
		return Helper.simpleFetch("/venues/explore", "GET", params);
	}
}