import Issue from "../models/Issue.js";

export const createIssue = async (req, res) => {
  const { title, description, location, image } = req.body;

  try {
    if (!title || !description || !location) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const issue = await Issue.create({
      title,
      description,
      location,
      image,
      reportedBy: req.user.id,
    });

    res.status(201).json({
      message: "Issue reported succesfully",
      issue,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// fect all reported issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("reportedBy", "name email")
      .sort({ created: -1 }); //most recent first

    res.json({ issues });
  } catch (error) {
    res.status(500).json({
      error: "failed to fetch issues",
    });
  }
};

export const getIssueById = async (req, res) => {
  try {
    console.log(req.params.id);
    const issue = await Issue.findById(req.params.id).populate(
      "reportedBy",
      "username email"
    );

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    res.status(200).json({ issue });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the issue", error: error.message });
  }
};
