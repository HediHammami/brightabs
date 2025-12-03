"use client";
import React, { JSX, useState } from "react";
import { BiMapPin, BiUser } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";

interface RatingBar {
  stars: number;
  count: number;
}

interface Testimonial {
  id: number;
  rating: number; // 1 to 5
  date: string;
  name: string;
  location: string;
  isVerified: boolean;
  title: string;
  body: string;
}

interface ReviewData {
  averageRating: number;
  totalReviews: number;
  ratings: RatingBar[];
  testimonials: Testimonial[];
}

const REVIEW_DATA: ReviewData = {
  averageRating: 4.75,
  totalReviews: 3021,
  ratings: [
    { stars: 5, count: 2573 },
    { stars: 4, count: 321 },
    { stars: 3, count: 27 },
    { stars: 2, count: 16 },
    { stars: 1, count: 84 },
  ],
  testimonials: [
    {
      id: 1,
      rating: 5,
      date: "11/18/2025",
      name: "Marie-Eve Breton",
      location: "Ottawa, CA",
      isVerified: true,
      title: "Great product!!!",
      body: "Great tastes and my teeth feel really smooth and fresh.",
    },
    {
      id: 2,
      rating: 5,
      date: "11/18/2025",
      name: "Barb",
      location: "Kelowna, CA",
      isVerified: true,
      title: "Love this brand",
      body: "I love the convenience of the little packets and tablets. Easy to travel and easy to see what's left. They've done an amazing job on my teeth as well. Will continue to purchase.",
    },
    {
      id: 3,
      rating: 4,
      date: "11/18/2025",
      name: "Eva Cassetti",
      location: "Victoria, CA",
      isVerified: true,
      title: "Great product - slow arrival",
      body: "The product is always great. It is wonderful how compact it is, it tastes great, and feels healthy. Only downside was how long it took to get here. They said it was Canada Post, but knowing about the strike, that shouldn't have been an issue. It took almost 2.5 months to get to us. I almost thought I got scammed Glad I didn't",
    },
    {
      id: 4,
      rating: 4,
      date: "11/17/2025",
      name: "Audrey Leroux",
      location: "Verdun, CA",
      isVerified: true,
      title: "Fantastic for travel",
      body: "I used to carry messy tubes but these tablets are perfect. They clean just as well and leave a minty fresh feeling. Highly recommend for frequent flyers.",
    },
    {
      id: 5,
      rating: 5,
      date: "11/17/2025",
      name: "Sheila Adair",
      location: "Welland, CA",
      isVerified: true,
      title: "Best Eco Switch",
      body: "This is the best eco-friendly switch I have made. No more plastic tubes! The charcoal mint flavor is strong and satisfying.",
    },
    // Adding more dummy data for multiple pages
    {
      id: 6,
      rating: 5,
      date: "11/16/2025",
      name: "Jenna K.",
      location: "Montreal, CA",
      isVerified: true,
      title: "Never going back!",
      body: "These are incredible. Love the clean ingredients and they foam up perfectly. Highly recommend to everyone.",
    },
    {
      id: 7,
      rating: 5,
      date: "11/15/2025",
      name: "Mike D.",
      location: "Calgary, CA",
      isVerified: false,
      title: "Great fresh taste",
      body: "The spearmint flavor is so refreshing and the clean feeling lasts all day. Excellent product quality.",
    },
    {
      id: 8,
      rating: 3,
      date: "11/14/2025",
      name: "Priya S.",
      location: "Toronto, CA",
      isVerified: true,
      title: "A little strange at first",
      body: "Takes a week or two to get used to chewing them, but the result is a clean feeling that traditional paste never gave me.",
    },
  ],
};

const TESTIMONIALS_PER_PAGE = 3;

// --- HELPER COMPONENTS ---

// Component to render a star rating (e.g., 4.75 stars)
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="relative flex">
      {[...Array(5)].map((_, i) => (
        <IoMdStar key={i} className="w-5 h-5 fill-gray-300 text-gray-300" />
      ))}

      <div
        className="absolute top-0 left-0 overflow-hidden flex"
        style={{ width: `${(rating / 5) * 100}%` }}
      >
        {[...Array(5)].map((_, i) => (
          <IoMdStar
            key={i}
            className="w-5 h-5 fill-yellow-500 text-yellow-500"
          />
        ))}
      </div>
    </div>
  );
};

const FullStarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <IoMdStar
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-yellow-500 text-yellow-500"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ))}
  </div>
);

// FIX: New component to render the correct number of stars for the rating breakdown
const BreakdownStars: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex w-16 shrink-0 mr-3">
    {[...Array(5)].map((_, i) => (
      <IoMdStar
        key={i}
        className={`w-3 h-3 ${
          i < count
            ? "fill-yellow-500 text-yellow-500"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ))}
  </div>
);

// Component for the testimonial card
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between h-full">
    <div>
      <div className="flex justify-between items-start mb-3">
        <FullStarRating rating={testimonial.rating} />
        <span className="text-xs text-[#7B7B7B]">{testimonial.date}</span>
      </div>

      <div className="flex items-center mb-4">
        <BiUser className="w-4 h-4 mr-2 text-gray-500" />
        <span className="text-[#302C1D] text-base mr-2">
          {testimonial.name}
        </span>
        {testimonial.isVerified && (
          <span className="bg-[#302C1D] text-white text-xs px-2 py-0.5 rounded-md">
            Verified
          </span>
        )}
      </div>

      {/* FIX: Location with MapPin icon (placeholder for flag) */}
      <div className="flex items-center mb-2">
        <BiMapPin className="w-3 h-3 mr-1.5" />
        <p className="text-xs text-[#7B7B7B]">{testimonial.location}</p>
      </div>

      <h3 className="text-base font-bold text-[#333333] mb-2">
        {testimonial.title}
      </h3>

      <p className="text-[#333333] text-base">{testimonial.body}</p>
    </div>
  </div>
);

/**
 * Main component for the Customer Reviews section.
 */
export default function BrightabsTestimonials(): JSX.Element {
  const totalPages = Math.ceil(
    REVIEW_DATA.testimonials.length / TESTIMONIALS_PER_PAGE
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex = (currentPage - 1) * TESTIMONIALS_PER_PAGE;
  const endIndex = startIndex + TESTIMONIALS_PER_PAGE;
  const displayedTestimonials = REVIEW_DATA.testimonials.slice(
    startIndex,
    endIndex
  );

  const calculateWidth = (count: number) => {
    const maxCount = Math.max(...REVIEW_DATA.ratings.map((r) => r.count));
    return `${(count / maxCount) * 100}%`;
  };

  return (
    <div className="min-h-screen bg-[#F9F2ED] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-12">
          Customer Reviews
        </h2>

        {/* Rating Summary Block */}
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-8 md:mb-12 flex flex-col md:flex-row items-center md:items-start justify-center">
          {/* Left Side: Overall Rating */}
          <div className="flex flex-col items-center justify-center md:border-r md:pr-10 border-gray-200 mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <StarRating rating={REVIEW_DATA.averageRating} />
              <span className="ml-3 text-2xl font-bold text-gray-900">
                {REVIEW_DATA.averageRating} out of 5
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Based on {REVIEW_DATA.totalReviews} reviews
            </p>
          </div>

          {/* Right Side: Rating Breakdown Bars */}
          <div className="w-full max-w-sm md:w-auto md:pl-10">
            {REVIEW_DATA.ratings.map((rating) => (
              <div key={rating.stars} className="flex items-center mb-1">
                <BreakdownStars count={rating.stars} />

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: calculateWidth(rating.count) }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-10 text-right ml-3">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review List Header (Removed "Sort By") */}
        <div className="flex justify-start items-center mb-6 py-3 border-b border-gray-200">
          <div className="text-base font-semibold text-gray-700">
            Highest Rating
          </div>
          {/* Removed the dummy filter dropdown */}
        </div>

        {/* Testimonial Cards Grid (Uses paginated data) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-full text-gray-600 transition ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            &lt;
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-8 h-8 rounded-full font-semibold transition ${
                currentPage === index + 1
                  ? "bg-teal-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-full text-gray-600 transition ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
