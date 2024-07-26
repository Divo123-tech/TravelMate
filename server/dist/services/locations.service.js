//import axios
import axios from "axios";
//import getAmadeusToken as it refreshes every 30 minutes
import { getAmadeusToken } from "../utils/amadeusKey.js";
//function that returns an array of countries within a given continent
const getAllCountries = async (continent, page = 1, searchQuery, limit = 10) => {
    let url = `https://restfulcountries.com/api/v1/countries`;
    if (continent != "all") {
        url += `?continent=${continent}`;
    }
    try {
        const { data } = await axios.get(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${process.env.COUNTRIES_KEY}`,
            },
        });
        //if data doesn't exist throw an error
        if (!data.data) {
            throw new Error("failed to get countries");
        }
        let countriesArray = data.data;
        // Filter and map the data only if searchQuery is provided
        if (searchQuery) {
            countriesArray = countriesArray.filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Calculate the start and end indices for pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        // Slice and map the data in one pass
        return {
            total: countriesArray.length,
            data: countriesArray.slice(startIndex, endIndex).map((country) => ({
                name: country.name,
                iso2: country.iso2,
                currency: country.currency,
                capital: country.capital,
                continent: country.continent,
            })),
        };
        //error handling
    }
    catch (err) {
        throw new Error("No Countries Found");
    }
};
//function to get all states within a given country
const getAllStates = async (country, page = 1, searchQuery) => {
    const url = "https://countriesnow.space/api/v0.1/countries/states";
    try {
        const response = await axios.post(url, { country }, {
            headers: {
                "Content-Type": "application/json",
            },
            maxBodyLength: Infinity,
        });
        //if data doesn't exist throw an error
        if (!response.data.data) {
            throw new Error("failed to get states");
        }
        let statesArray = response.data.data.states;
        // Filter and map the data only if searchQuery is provided
        if (searchQuery) {
            statesArray = statesArray.filter((state) => state.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Calculate the start and end indices for pagination
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        //Map the data of the response to return just the name
        return {
            total: statesArray.length,
            data: statesArray.slice(startIndex, endIndex).map((state) => ({
                name: state.name,
                code: state.state_code,
                countryName: response.data.data.name,
                countryCode: response.data.data.iso2,
            })),
        };
        //error handling
    }
    catch (err) {
        throw new Error("No States Found");
    }
};
//function to get all the cities within a given state and country
const getAllCities = async (state, country, page = 1, searchQuery) => {
    const url = "https://countriesnow.space/api/v0.1/countries/state/cities";
    try {
        const { data } = await axios.post(url, {
            country,
            state,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            maxBodyLength: Infinity,
        });
        //if data doesn't exist throw an error
        if (!data.data) {
            throw new Error("failed to get states");
        }
        let citiesArray = data.data;
        // Filter and map the data only if searchQuery is provided
        if (searchQuery) {
            citiesArray = citiesArray.filter((city) => city.includes(searchQuery));
        }
        // Calculate the start and end indices for pagination
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        return citiesArray.slice(startIndex, endIndex).map((city) => {
            return {
                name: city,
                country,
                state,
            };
        });
        //error handling
    }
    catch (err) {
        throw new Error("No Cities Found");
    }
};
//helper function that gets coordinates of a city from a given country
const getCoords = async (city, countryCode) => {
    const url = `https://api.tomtom.com/search/2/structuredGeocode.json?key=${process.env.TOMTOM_KEY}&municipality=${city}&countryCode=${countryCode}`;
    const response = await axios.get(url, {
        headers: {
            Accept: "application/json",
        },
    });
    //returns an object {lat: number, lon: number}
    return response.data.results[0].position;
};
//function to get All airports within a given city and country
const getAllAirports = async (city, countryCode) => {
    const url = `https://api.api-ninjas.com/v1/airports?city=${city}&country=${countryCode}`;
    try {
        const response = await axios.get(url, {
            headers: {
                "X-Api-Key": process.env.APININJA_KEY,
            },
        });
        //if data doesn't exist throw an error
        if (!response.data) {
            throw new Error("failed to get airports");
        }
        //filter the airports that are actually commercial and not air bases
        const airportsData = response.data.filter((airport) => {
            return airport.iata != "";
        });
        //if data doesn't exist throw an error
        if (airportsData.length == 0)
            throw new Error("No Airports found");
        //Map the data of the response to fit the airport interface
        return airportsData.map((airport) => {
            return {
                name: airport.name,
                iata: airport.iata,
                city,
                countryCode,
            };
        });
        //error handling
    }
    catch (err) {
        throw new Error("No Airports Found");
    }
};
//helper function for the flights function that populates the URL with the optional query parameters
const populateURLWithOptionalParams = (params, url, paramNames) => {
    //iterate through the params array
    for (let i = 0; i < params.length; i++) {
        //if the paramete exists add it to the url
        params[i] ? (url += `&${paramNames[i]}=${params[i]}`) : "";
    }
    return url;
};
//helper function that converts raw time of the flight to a url friendly time string
const convertTime = (timeRaw) => {
    let [hours, minutes] = timeRaw.split(":").map(Number);
    let totalMinutesDep = hours * 60 + minutes;
    return totalMinutesDep.toString();
};
//function that converts a duration into minutes for the flight URL
const durationToMinutes = (duration) => {
    // Use a regular expression to extract hours and minutes
    let match = duration.match(/PT(\d+H)?(\d+M)?/);
    if (match) {
        // Extract hours and minutes, defaulting to 0 if they are not present
        let hours = match[1] ? parseInt(match[1].replace("H", ""), 10) : 0;
        let minutes = match[2] ? parseInt(match[2].replace("M", ""), 10) : 0;
        // Calculate total minutes
        return hours * 60 + minutes;
        //error handling
    }
    else {
        throw new Error("Invalid duration format");
    }
};
//create the flight url that will redirect to the skyscanner site
const getFlightURL = (flight, children, infants) => {
    const departureInfo = flight.itineraries[0].segments[0].departure;
    const depIata = flight.itineraries[0].segments[0].departure.iataCode;
    const numOfSegments = flight.itineraries[0].segments.length - 1;
    const arrivalInfo = flight.itineraries[0].segments[numOfSegments].arrival;
    const arrIata = arrivalInfo.iataCode;
    const dateformatted = departureInfo.at.substring(2, 10).split("-").join("");
    const depTime = convertTime(departureInfo.at.substring(11, 16));
    const arrTime = convertTime(arrivalInfo.at.substring(11, 16));
    const cabin = flight.travelerPricings[0].fareDetailsBySegment[0].cabin;
    const duration = durationToMinutes(flight.itineraries[0].duration);
    let finalUrl = `https://www.skyscanner.com/transport/flights/${depIata}/${arrIata}/${dateformatted}/?adultsv2=1&cabinclass=${cabin}&departure-times=${depTime}-${arrTime}&duration=${duration}&childrenv2=`;
    //iterate through the parameters and populate the url accordingly
    for (let i = 0; i < children; i++) {
        if (i == 0) {
            finalUrl += "8";
        }
        else {
            finalUrl += "%7C" + 8;
        }
    }
    for (let i = 0; i < infants; i++) {
        finalUrl += "%7C" + 1;
    }
    return finalUrl;
};
//function that gets all flights on various parameters
const getAllFlights = async (origin, destination, departureDate, adults = 1, nonstop = false, children, infants, maxPrice, travelClass) => {
    let url = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&nonStop=${nonstop}&currencyCode=SGD`;
    //update the url
    const updatedUrl = populateURLWithOptionalParams([children, infants, maxPrice, travelClass], url, ["children", "infants", "maxPrice", "travelClass"]);
    try {
        const response = await axios.get(updatedUrl, {
            headers: {
                Authorization: `Bearer ${await getAmadeusToken()}`,
            },
        });
        //if data doesn't exist throw an error
        if (!response.data.data) {
            throw new Error("failed to get flights");
        }
        //Map the data of the response to fit the flight interface
        return response.data.data.map((flight) => {
            return {
                origin,
                destination,
                duration: flight.itineraries[0].duration.substring(2),
                stops: flight.itineraries[0].segments.length - 1,
                departureDate: flight.itineraries[0].segments[0].departure.at,
                arrivalDate: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at,
                cabin: flight.travelerPricings[0].fareDetailsBySegment[0].cabin,
                url: getFlightURL(flight, children || 0, infants || 0),
            };
        });
    }
    catch (err) {
        throw new Error(err);
    }
};
//function that returns an array of all hotels within a city and country code
const getAllHotels = async (city, countryCode) => {
    //use destructuring to get the latitude and longitude from getCoords
    const { lat, lon } = await getCoords(city, countryCode);
    const url = `https://api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}&radius=10&radiusUnit=KM&hotelSource=ALL`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${await getAmadeusToken()}`,
            },
        });
        //if data doesn't exist throw an error
        if (!response.data.data) {
            throw new Error("failed to get hotels");
        }
        //Map the data of the response to fit the hotel interface
        return response.data.data.map((hotel) => {
            return {
                name: hotel.name
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" "),
                id: hotel.hotelId,
                url: `https://www.tripadvisor.com/Search?q=${hotel.name.replaceAll(" ", "+")}`,
                city,
                countryCode,
            };
        });
        //error handling
    }
    catch (err) {
        throw new Error(err);
    }
};
//function that returns an array of attractions from a given city or country
const getAllAttractions = async (city, countryCode, category) => {
    try {
        const { lon, lat } = await getCoords(city, countryCode);
        //trip advisor
        const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${lat}%2C${lon}&key=${process.env.TRIPADV_KEY}&category=${category}&language=en`;
        const response = await axios.get(url, {
            headers: { accept: "application/json" },
        });
        //if data doesn't exist throw an error
        if (!response.data.data) {
            throw new Error("failed to get attractions");
        }
        //Map the data of the response to fit the attraction interface
        return response.data.data.map((destination) => {
            return {
                name: destination.name,
                id: destination.location_id,
                address: destination.address_obj.address_string,
                city,
                countryCode,
                country: destination.address_obj.country,
                url: `https://www.tripadvisor.com/Search?q=${destination.name.replaceAll(" ", "+")}+${city}`,
            };
        });
        //error handling
    }
    catch (err) {
        throw new Error(err);
    }
};
//function that returns an array of videos
const getYoutubeVideos = async (city) => {
    try {
        const response = await axios.get(`https://youtube-search-and-download.p.rapidapi.com/search?query=Things to do in ${city}`, {
            headers: {
                "x-rapidapi-key": process.env.YT_KEY,
                "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
            },
        });
        //if data doesn't exist throw an error
        if (!response.data.contents) {
            throw new Error("failed to get videos");
        }
        //takes only the first 10 videos and maps the results to fit the video interface
        return response.data.contents.slice(0, 10).map((video) => {
            return {
                url: `https://www.youtube.com/embed/${video.video.videoId}`,
                title: video.video.title,
                views: video.video.viewCountText,
            };
        });
    }
    catch (err) {
        throw new Error(err);
    }
};
//function that returns details of a country
const getCountryVisa = async (countryCodeFrom, countryCodeTo) => {
    //get the current year
    const visaURL = `https://rough-sun-2523.fly.dev/api/${countryCodeTo}/${countryCodeFrom}`;
    try {
        const visaStatus = (await axios.get(visaURL)).data;
        return {
            visaStatus: visaStatus.category,
            visaDuration: visaStatus.dur,
        };
    }
    catch (err) {
        throw new Error("failed to get details");
    }
};
const getCountryExchangeRate = async (currencyFrom, currencyTo) => {
    const excRateURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyFrom.toLowerCase()}.json`;
    try {
        const exchangeRate = (await axios.get(excRateURL)).data;
        return exchangeRate[currencyFrom.toLowerCase()][currencyTo.toLowerCase()];
    }
    catch (err) {
        throw new Error("failed to get details");
    }
};
const getLocationTime = async (city, countryCode) => {
    const { lon, lat } = await getCoords(city, countryCode);
    const response = await axios.get(`https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`);
    return {
        date: response.data.date,
        time: response.data.time,
        timeZone: response.data.timeZone,
    };
};
export default {
    getAllCountries,
    getAllStates,
    getAllCities,
    getCoords,
    getAllAirports,
    getAllFlights,
    getAllHotels,
    getAllAttractions,
    getYoutubeVideos,
    getCountryVisa,
    getCountryExchangeRate,
    getLocationTime,
};
//# sourceMappingURL=locations.service.js.map