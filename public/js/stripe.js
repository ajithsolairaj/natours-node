import axios from 'axios';
const stripe = Stripe(
  'pk_test_51Ll5TdSAcnJkiozQhFSxZ0U9kZIOrZmZNXn9l7ysilmg4TmB5yahBuTYTvYzdM3Pk4n5qYcAX81kW91v5wtxN7IQ0034e5cl4q'
);

export const bookTour = async (tourId) => {
  try {
    // 1) get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
  }
};
