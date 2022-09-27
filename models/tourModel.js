const mongoose = require('mongoose');
const { promises } = require('nodemailer/lib/xoauth2');
const slugify = require('slugify');
const validator = require('validator');
// const User = require('./userModel');
const _ = require('underscore');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: true,
      trim: true,
      maxLength: [40, 'A tour name must have less or equal to 40 characters'],
      minLength: [10, 'A tour name must have more or equal than 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'], //
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.1,
      min: [1, 'Ratings must be above 1.0'],
      max: [5, 'Ratings must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have level of Difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be either: "easy","medium", or "difficult"',
      },
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount Price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],

    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// tourSchema.index({price:1}) // single field index
tourSchema.index({ price: 1, ratingsAverage: 1 }); // compound index
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// virtual populate - only populate on get one tour (tourById)
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});
///////////// document middleware //////
// mongoose document middleware - pre save hook/middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  this.guides = _.uniq(this.guides, function (i) {
    return i._id ? i._id.toString() : i;
  });
  next();
});

// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await promises.all(guidesPromises);
//   next();
// });

// mongoose document middleware - post save hook/middleware

/////////// query middleware //////////
// without using regEx - doesn't work for all find methods like findByIdAndUpdate etc.. so works for only find() method
// tourSchema.pre('find', function (next) {
//   this.find({secretTour:{$ne:true}})
//   next();
// });

// using regular expression- works for all find methods
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.guides = _.uniq(this.guides, function (i) {
    return i._id ? i._id.toString() : i;
  });
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

/////////// aggregation middleware //////////
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { $ne: true } });
//   console.log(this.pipeline());
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
