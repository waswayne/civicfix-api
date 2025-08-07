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

//update issue by id
export const updateIssue = async (req,res) => {
    try {
       const updateIssue = await Issue.findByIdAndUpdate(
        req.params.id.trim(), req.body, { new: true, runValidators: true }
    ).populate('reportedBy', 'name email');

    if (!updateIssue) {
        return res.status(404).json({message: 'Issue not found'})
    }

    res.status(200).json({ issue: updateIssue })
    } catch (error) {
        res.status(500).json({
            message: "Error updating issue",
            error: error.message
        })
    }
}

//delete issue by Id
export const deleteIssue = async (req,res) => {
    try {
        const deleteIssue = await Issue.findByIdAndDelete(req.params.id.trim())

        if (!deleteIssue) {
            return res.status(404).json({message: 'Issue noy found'})
        }

        res.status(200).json({ message: 'Issue deleted succeesfully'})
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting issue',
            error: error.message
        })
    }
}