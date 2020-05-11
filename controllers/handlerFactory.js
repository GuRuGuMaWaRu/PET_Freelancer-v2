const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllDocs = Model =>
  catchAsync(async (req, res, next) => {
    const filter = {};

    if (req.userId) {
      filter.user = req.userId;
    }

    const docs = await Model.find(filter);

    res
      .status(200)
      .json({ status: "success", results: docs.length, data: { data: docs } });
  });
