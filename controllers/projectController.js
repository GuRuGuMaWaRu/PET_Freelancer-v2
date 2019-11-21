const Client = require("../models/Client");
const Project = require("../models/Project");

module.exports = {
  create: async (req, res) => {
    const shopData = req.body;

    if (shopData.newClient.length > 0) {
      const oldClient = await Client.findOne({ name: shopData.newClient });

      if (!oldClient) {
        const newClient = new Client({
          name: shopData.newClient
        });

        shopData.client = newClient._id;

        await newClient.save();
      } else {
        shopData.client = oldClient._id;
      }
    }
    await Project.create(shopData);
    res.status(201).json({ message: "Project saved." });
  },
  index: async (req, res) => {
    try {
      const projects = await Project.find({ deleted: { $ne: true } })
        .populate("client")
        .sort({ date: -1 });

      res.status(200).json(projects);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const projectId = req.params.id;
    console.log(projectId);
    try {
      const project = await Project.findById(projectId);
      console.log(project);
      await Project.findOneAndUpdate({ _id: projectId }, { deleted: true });
      const updatedProject = await Project.findById(projectId);
      console.log(updatedProject);
      res.status(200).json({ message: "Project deleted." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
};
