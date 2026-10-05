/**
 * The Google reviews, word for word, as the profile showed them on
 * 2026-10-02 (owner's browser check), all five stars. Google gives only
 * relative dates, so none is stored. Read by /reviews and by the city pages;
 * never edit a text, never add one that is not on the profile.
 */
export interface GoogleReview {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: "Ekaterina Bykova",
    rating: 5,
    text: "I needed to organize a move from one apartment to another, and the team handled it 100%. From the initial communication to the final unloading of my belongings, everything was top-notch. They did everything quickly, efficiently, and with great care for both my things and me as a client. Thank you so much!",
  },
  {
    name: "Bianca Sa",
    rating: 5,
    text: "Everything was amazing. Really appreciate the help",
  },
  {
    name: "Katerina Ko",
    rating: 5,
    text: "Thank you so much for the amazing service! Honest, reliably, accommodating. Can’t recommend enough, 5 star!!!!",
  },
  {
    name: "Ivan Berezovskii",
    rating: 5,
    text: "Excellent team! They are reliable, punctual, and do a great job every time. Very professional and easy to work with. I’ve trusted them for several years now and highly recommend their services.",
  },
  {
    name: "Owen Parker",
    rating: 5,
    text: "Great moving experience! They handled everything with care, were fast, and very friendly",
  },
  {
    name: "Raha Mad",
    rating: 5,
    text: "Excellent service from start to finish. They communicated well, arrived on time, and moved everything safely. Truly professional movers.",
  },
  {
    name: "Andrei Oho",
    rating: 5,
    text: "Eugene and his team are really professionals. They did everything very carefully and quickly without stress. All my furniture was delivered in full safety.",
  },
  {
    name: "Tatiana Romanova",
    rating: 5,
    text: "Eugene is fantastic!! Definitely would recommend and will use them again!! Very professional and excellent at communicating.",
  },
  {
    name: "Andrey",
    rating: 5,
    text: "Eugene and his team did a flawless job. They arrived at the meeting point on time and delivered everything on time and with great disposition. I will certainly use them again, they are a trustworthy team!",
  },
];
