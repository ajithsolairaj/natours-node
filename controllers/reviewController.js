const Review = require('./../models/reviewModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Tour = require('./../models/tourModel');
const handlerFactory = require('./handlerFactory');

exports.setTourUserIds = catchAsync(async (req, res, next) => {
  // allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  req.body.user = req.user.id;

  if (!(await Tour.findById(req.body.tour)))
    return next(
      new AppError('No matching Tour Found,A review should belong to Tour', 400)
    );
  next();
});

exports.getAllReviews = handlerFactory.getAll(Review);
exports.getReviews = handlerFactory.getOne(Review);
exports.postReviews = handlerFactory.createOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
