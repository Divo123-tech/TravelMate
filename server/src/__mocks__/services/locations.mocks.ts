export const mockVideoResponse = {
  total: 2,
  data: [
    {
      url: "https://www.youtube.com/embed/abc123",
      title: "Things to do in Paris",
      channel: "Travel Channel",
      views: "1M views",
      date: "2 months ago",
      length: "10:30",
      type: "videos",
    },
    {
      url: "https://www.youtube.com/embed/def456",
      title: "Paris City Guide",
      channel: "City Guides",
      views: "500K views",
      date: "1 year ago",
      length: "15:45",
      type: "videos",
    },
  ],
};

export const mockFlightReponse = {
  total: 2,
  data: [
    {
      origin: "NYC",
      destination: "LAX",
      duration: "05:30",
      stops: 0,
      departureDate: "2023-07-01T08:00:00",
      arrivalDate: "2023-07-01T13:30:00",
      cabin: "ECONOMY",
      url: "https://example.com/flight1",
      price: 300,
      airline: "Example Airlines",
      currency: "USD",
      type: "flights",
    },
    {
      origin: "NYC",
      destination: "LAX",
      duration: "06:00",
      stops: 1,
      departureDate: "2023-07-01T10:00:00",
      arrivalDate: "2023-07-01T16:00:00",
      cabin: "ECONOMY",
      url: "https://example.com/flight2",
      price: 250,
      airline: "Another Airlines",
      currency: "USD",
      type: "flights",
    },
  ],
};

export const mockAttractionResponse = {
  all: {
    total: 2,
    data: [
      {
        name: "Eiffel Tower",
        id: "188151",
        address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
        city: "Paris",
        country: "France",
        url: "https://www.tripadvisor.com/Search?q=Eiffel+Tower+Paris",
        type: "activities",
      },
      {
        name: "Louvre Museum",
        id: "188757",
        address: "Rue de Rivoli, 75001 Paris, France",
        city: "Paris",
        country: "France",
        url: "https://www.tripadvisor.com/Search?q=Louvre+Museum+Paris",
        type: "activities",
      },
    ],
  },
  query: {
    total: 1,
    data: [
      {
        name: "Eiffel Tower",
        id: "188151",
        address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
        city: "Paris",
        country: "France",
        url: "https://www.tripadvisor.com/Search?q=Eiffel+Tower+Paris",
        type: "activities",
      },
    ],
  },
};
