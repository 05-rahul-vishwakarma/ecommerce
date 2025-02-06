import React, { useState } from "react";
import axios from "axios";
import { getAuthHeaders, reviewProduct } from "@/api/baseApi";
import { toast } from "react-toastify";

const ReviewForm = ({ PK, SK }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
      productId: {
        PK: PK,
        SK: SK,
      },
      rating: parseInt(rating),
      comment: comment,
    };

    try {
      const response = await axios.post(reviewProduct, reviewData, {
        headers: getAuthHeaders(),
      });
      console.log(response.data);
      toast.success("Review Submitted Successfully ✨");

      // Clear input fields after successful submission
      setUsername("");
      setEmail("");
      setRating("");
      setComment("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add review!");
    }
  };

  return (
    <div id="form-review" className="form-review pt-6">
      <div className="heading4 text-secondary">Leave A Comment</div>
      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-6"
      >
        <div className="name">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="username"
            type="text"
            placeholder="Your Name *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="rating">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="rating"
            type="number"
            placeholder="Your Rating (1-5) *"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        {/* <div className="mail">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="email"
            type="email"
            placeholder="Your Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
        <div className="col-span-full message">
          <textarea
            className="border border-line px-4 py-3 w-full rounded-lg"
            id="comment"
            name="comment"
            placeholder="Your message *"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="col-span-full sm:pt-3">
          <button
            type="submit"
            className="button-main bg-white text-secondary border border-purple"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
