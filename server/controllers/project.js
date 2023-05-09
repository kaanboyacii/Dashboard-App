import { createError } from "../error.js";
import User from "../models/User.js"
import Project from "../models/Project.js";

export const addProject = async (req, res, next) => {
    const newProject = new Project({ userId: req.user.id, ...req.body });
    try {
        const savedProject = await newProject.save();
        res.status(200).json(savedProject)
    } catch (err) {
        next(err)
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return next(createError(404, "Project not found !"));
        if (req.user.id === project.userId) {
            const updatedProject = await Project.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                },
            );
            res.status(200).json(updatedProject)
        } else {
            return next(createError(403, "You can update only your Project!"));
        }
    } catch (err) {
        next(err)
    }
};


export const deleteProject = async (req, res, next) => {
    try {
        const Project = await Project.findById(req.params.id)
        if (!Project) return next(createError(404, "Project not found !"));
        if (req.user.id === Project.userId) {
            const updatedProject = await Project.findByIdAndDelete(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                },
            );
            res.status(200).json("Project has been deleted.")
        } else {
            return next(createError(403, "You can delete only your Project!"));
        }
    } catch (error) {

    }
};

export const getAllProject = async (req, res, next) => {
    try {
        const Projects = await Project.find({});
        res.status(200).json(Projects);
    } catch (err) {
        next(err);
    }
};


export const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        next(err)
    }
};

export const getProjectsByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const Projects = await Project.find({ userId });
        res.status(200).json(Projects);
    } catch (err) {
        next(err);
    }
};

export const random = async (req, res, next) => {
    try {
        const Projects = await Project.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(Projects);
    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const Projects = await Project.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(Projects);
    } catch (err) {
        next(err);
    }
};