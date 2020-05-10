const Client = require("../models/clientModel");
const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Middleware
// exports.createNewClient = catchAsync(async (req, res, next) =>

// );

// @route     GET projects/
// @desc      Get all projects
// @access    Private
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({
    user: req.userId
  });

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: {
      projects
    }
  });
});

// @route     GET projects/:id
// @desc      Get project
// @access    Private
exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.userId // _id is unique enough, should I really search by user?
  }).select("client currency date payment projectNr _id");

  if (!project) {
    return next(new AppError("No project found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { project }
  });
});

// @route     POST projects/withClient/
// @desc      Create project and (possibly) client
// @access    Private
exports.createProjectWithClient = catchAsync(async (req, res, next) => {
  let newClient = null;

  //--> Create new client OR get existing client id
  if (req.body.newClient && req.body.newClient.trim().length > 0) {
    const existingClient = await Client.findOne({
      name: req.body.newClient,
      user: req.userId
    });

    if (!existingClient) {
      newClient = new Client({
        name: req.body.newClient,
        user: req.userId
      });

      req.body.client = newClient._id;

      await newClient.save();
    } else {
      req.body.client = existingClient._id;
    }
  }
  //--> Create & save new project
  const project = new Project({
    ...req.body,
    user: req.userId
  });
  await project.save();

  //--> Get newly created project from DB
  const newProject = await Project.findOne({
    _id: project._id,
    user: req.userId
  })
    .populate("client")
    .select("client currency date payment projectNr _id");

  res.status(201).json({ status: "success", data: { newProject, newClient } });
});

// @route     PATCH projects/withClient/:id
// @desc      Update project and (possibly) client
// @access    Private
exports.updateProjectWithClient = catchAsync(async (req, res, next) => {
  let newClient = null;

  //--> Create new client OR get existing client id
  if (req.body.newClient && req.body.newClient.trim().length > 0) {
    const existingClient = await Client.findOne({
      name: req.body.newClient,
      user: req.userId
    });

    if (!existingClient) {
      newClient = new Client({
        name: req.body.newClient,
        user: req.userId
      });

      req.body.client = newClient._id;

      await newClient.save();
    } else {
      req.body.client = existingClient._id;
    }
  }

  //--> Update project
  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.userId
    },
    req.body,
    { new: true }
  );

  if (!updatedProject) {
    return next(new AppError("No project found with this ID", 404));
  }

  res
    .status(200)
    .json({ status: "success", data: { updatedProject, newClient } });
  // .json({ status: "success", data: null });
});

// @route     DELETE projects/:id
// @desc      Delete project
// @access    Private
exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { deleted: true },
    { new: true }
  );

  if (!project) {
    return next(new AppError("No project found with this ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});
