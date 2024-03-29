const express = require("express");
const mongoose = require("mongoose");

const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { protect } = require("../../middleware/auth");
const projectControllers = require("./project.controllers");
const Project = require("./project.model");
const Client = require("../client/client.model");

const router = express.Router();

router.use(protect);

const projectsDefaultAggregationStages = [
  {
    $lookup: {
      from: "clients",
      localField: "client",
      foreignField: "_id",
      as: "client",
    },
  },
  {
    $project: {
      _id: 1,
      projectNr: 1,
      payment: 1,
      currency: 1,
      date: 1,
      paid: 1,
      comments: 1,
      client: { $first: "$client" },
    },
  },
];

router
  .route("/")
  /**
   * @route     GET projects/
   * @desc      Get all projects
   * @access    Private
   */
  .get(
    catchAsync(async (req, res, next) => {
      //** Return early if no user ID is provided  */
      if (!req.userId) {
        return next(new AppError(400, "User ID is required"));
      }

      //** Construct DB query based on request params */
      const aggregationPipeline = [
        {
          $match: {
            user: mongoose.Types.ObjectId(req.userId),
            deleted: { $ne: true },
          },
        },
        ...projectsDefaultAggregationStages,
      ];

      //** Search stage */
      const searchQuery = new RegExp(req.query.q, "i");

      if (Object.hasOwn(req.query, "q")) {
        aggregationPipeline.push({
          $match: {
            $or: [{ "client.name": searchQuery }, { projectNr: searchQuery }],
          },
        });
      }

      //** Sorting stage */
      if (Object.hasOwn(req.query, "sort")) {
        const sortDir = req.query.sort.startsWith("-") ? -1 : 1;
        const sortItem = req.query.sort.replace("-", "");

        if (!req.query.sort.includes("date")) {
          aggregationPipeline.push({
            $sort: { [sortItem]: sortDir, date: -1 },
          });
        } else {
          aggregationPipeline.push({
            $sort: { [sortItem]: sortDir, _id: 1 },
          });
        }
      } else {
        aggregationPipeline.push({
          $sort: { date: -1, _id: 1 },
        });
      }

      //** Pagination stage */
      if (
        Object.hasOwn(req.query, "limit") &&
        Object.hasOwn(req.query, "page")
      ) {
        aggregationPipeline.push(
          {
            $skip: (Number(req.query.page) - 1) * Number(req.query.limit),
          },
          { $limit: Number(req.query.limit) },
        );
      }

      const docs = await Project.aggregate(aggregationPipeline);

      const count = await Project.aggregate([
        {
          $match: {
            user: mongoose.Types.ObjectId(req.userId),
            deleted: { $ne: true },
          },
        },
        ...projectsDefaultAggregationStages,
        {
          $match: {
            $or: [{ "client.name": searchQuery }, { projectNr: searchQuery }],
          },
        },
        { $count: "total" },
        // { $group: { _id: null, n: { $count: {} } } },
      ]);

      res.status(200).json({
        status: "success",
        results: docs.length,
        data: { docs, allDocs: docs.length ? count[0].total : 0 },
      });
    }),
  )
  /**
   * @route     POST projects/
   * @desc      Create a project
   * @access    Private
   */
  .post(
    catchAsync(async (req, res, next) => {
      //** Return early if no user ID is provided  */
      if (!req.userId) {
        return next(new AppError(400, "User ID is required"));
      }

      //** Confirm data  */
      if (
        !req.body.payment ||
        !req.body.currency ||
        !req.body.projectNr ||
        !req.body.client ||
        !req.body.date
      ) {
        return next(new AppError(400, "All fields are required"));
      }

      //** Get a client Id or create a new client if necessary */
      let client = await Client.findOne({
        name: req.body.client,
      })
        .lean()
        .exec();

      if (!client) {
        client = await Client.create({
          name: req.body.client,
          user: req.userId,
        });
      }

      const doc = await Project.create({
        ...req.body,
        client: client._id,
        user: req.userId,
      });

      res.status(201).json({
        status: "success",
        data: doc.toJSON(),
      });
    }),
  );

router
  .route("/lastYear")
  /**
   * @route     GET projects/lastYear
   * @desc      Get projects from year ago and up till now
   * @access    Private
   */
  .get(
    catchAsync(async (req, res, next) => {
      //** Return early if no user ID is provided  */
      if (!req.userId) {
        return next(new AppError(400, "User ID is required"));
      }

      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      currentDate.setDate(1);

      const projects = await Project.find({
        user: mongoose.Types.ObjectId(req.userId),
        deleted: false,
        date: {
          $gte: currentDate,
        },
      })
        .populate({
          path: "client",
          select: "-_id -user -__v -createdAt -updatedAt",
        })
        .lean()
        .exec();

      res.status(200).json({
        status: "success",
        results: projects.length,
        data: projects,
      });
    }),
  );

router
  .route("/:id")
  /**
   * @route     GET projects/:id
   * @desc      Get a project
   * @access    Private
   */
  .get(projectControllers.getOne)
  /**
   * @route     PATCH projects/:id
   * @desc      Update a project
   * @access    Private
   */
  .patch(
    catchAsync(async (req, res, next) => {
      //** Return early if no user ID is provided  */
      if (!req.userId) {
        return next(new AppError(400, "User ID is required"));
      }

      //** Find an existing client or create a new client if necessary */
      let client = await Client.findOne({
        name: req.body.client,
      })
        .lean()
        .exec();

      if (!client) {
        client = await Client.create({
          name: req.body.client,
          user: req.body.user,
        });
      }

      //** Update a project */
      const doc = await Project.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, client: client._id },
        {
          new: true,
          runValidators: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      )
        .lean()
        .exec();

      if (!doc) {
        return next(new AppError(404, "No such project found"));
      }

      res.status(200).json({
        status: "success",
        data: doc,
      });
    }),
  )
  /**
   * @route     DELETE projects/:id
   * @desc      Delete a project
   * @access    Private
   */
  .delete(projectControllers.deleteOne);

module.exports = router;
