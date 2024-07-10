type FAQ = {
  question: string;
  answer: string;
};

export const FAQInformation: FAQ[] = [
  {
    question: "How do I add a trip?",
    answer: `To make a trip in our travel application, you first need to
  log in with your account credentials. If you don't have an
  account yet, you can easily sign up for a new one. Once logged
  in, navigate to the "Create Trip" section from the main
  dashboard. Here, you'll be prompted to enter essential details
  about your trip, such as the destination, dates, and any
  specific activities or accommodations you want to include.
  After filling out all the necessary information , you can also
  invite other users to collaborate on your trip by sending them
  an invitation from within the application. This way, you and
  your friends or family can plan and manage the trip together
  seamlessly.`,
  },
  {
    question: "Can I collaborate with somebody when planning my trip?",
    answer: `Yes, you can collaborate with somebody when planning your trip
      on TravelMate. After logging into your account, navigate to
      the "My Trips" section and select the trip you want to
      collaborate on. Within the trip details, you'll find an option
      to invite collaborators. Simply enter the email addresses of
      the people you want to invite, and TravelMate will send them
      an invitation to join your trip. Once they accept the
      invitation, they will have access to view and edit the trip
      details, add activities, suggest accommodations, and more.
      This collaborative feature allows you and your travel
      companions to plan and manage every aspect of your trip
      together, ensuring everyone stays informed and involved in the
      planning process.`,
  },
  {
    question: "Can I book my hotels and trips with TravelMate?",
    answer: `No, you cannot book your hotels and trips directly through
    TravelMate. TravelMate is designed as a brainstorming app to
    help you plan and organize your trips, but it does not have
    the necessary licenses to book hotels and flights. Our
    platform focuses on providing tools for collaborative trip
    planning, allowing you to share ideas, create itineraries, and
    coordinate with your travel companions. For booking
    accommodations and flights, we recommend using licensed travel
    agencies or booking platforms.`,
  },
];
