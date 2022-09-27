// const viewController = require('./../controllers/viewsController');
const viewController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');
const express = require('express');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverviewPage
);

router.get(
  '/tour/:slug',
  authController.isLoggedIn,
  viewController.getTourPage
);

router.get(
  '/signup',
  authController.isLoggedIn,
  viewController.getSignupFormPage
);

router.get('/login', authController.isLoggedIn, viewController.getLoginPage);
router.get(
  '/forgot-password',
  authController.isLoggedIn,
  viewController.getForgotPasswordPage
);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);
router.get(
  '/resetPassword/:token',
  authController.isLoggedIn,
  viewController.getResetPasswordPage
);

module.exports = router;
