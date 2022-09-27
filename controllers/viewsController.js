const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const AppError = require('./../utils/appError');

exports.getTourPage = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   "connect-src 'self' https://www.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    // )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});
exports.getOverviewPage = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'Exciting tours for adventurous people',
    tours,
  });
});

exports.getLoginPage = catchAsync(async (req, res, next) => {
  // console.log(req.user);
  if (req.user) {
    res.redirect('/');
  } else {
    res.status(200).render('login', {
      title: 'Login',
    });
  }
});

exports.getForgotPasswordPage = catchAsync(async (req, res, next) => {
  // console.log(req.user);
  if (req.user) {
    res.redirect('/');
  } else {
    res.status(200).render('forgotPassword', {
      title: 'Forgot Password',
    });
  }
});

exports.getResetPasswordPage = catchAsync(async (req, res, next) => {
  // console.log(req.user);
  const token = req.params.token;
  if (req.user) {
    res.redirect('/');
  } else {
    res.status(200).render('resetPassword', {
      title: 'Reset Password',
      token,
    });
  }
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};

exports.getSignupFormPage = catchAsync(async (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.status(200).render('signup', {
      title: 'create your account!',
    });
  }
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  console.log(bookings);

  // 2) find tours
  const tourIDs = bookings.map((el) => el.tour);
  console.log('tourIdss', tourIDs);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});
