const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // BUILD QUERY
    // 1a) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach(el => delete queryObj[el]);

    if (req.userId) {
      queryObj.user = req.userId;
    }

    // 1b) Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    );

    let query = Model.find(JSON.parse(queryString));

    // 2) Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    console.log(JSON.parse(queryString));

    const docs = await query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: { data: docs }
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const filter = { _id: req.params.id };

    if (req.userId) {
      filter.user = req.userId;
    }

    const doc = await Model.findOne(filter);

    if (!doc) {
      return next(new AppError("No doc found with this ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { data: doc }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError("No doc found with this ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { data: doc }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const filter = { _id: req.params.id };

    if (req.userId) {
      filter.user = req.userId;
    }

    const doc = await Model.findOneAndUpdate(
      filter,
      { deleted: true },
      { new: true }
    );

    if (!doc) {
      return next(new AppError("No doc found with this ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const body = { ...req.body };
    if (req.userId) {
      body.user = req.userId;
    }

    const doc = await Model.create(body);
    res.status(201).json({
      status: "success",
      data: { data: doc }
    });
  });
