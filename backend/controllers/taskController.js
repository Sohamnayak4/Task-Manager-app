const Task = require('../models/Task');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, dueDate, status } = req.body;
  if (!title || !description || !dueDate) {
    return next(new AppError('Title, description, and due date are required', 400));
  }
  
  const task = await Task.create({ 
    title, 
    description, 
    dueDate, 
    status, 
    user: req.user.id 
  });
  res.status(201).json(task);
});

exports.getTasks = catchAsync(async (req, res) => {
  const { status, sortBy, sortOrder, search } = req.query;
  const query = { user: req.user.id };

  // Filter by status
  if (status) {
    query.status = status;
  }

  // Search by title or description
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // Determine sort options
  let sort = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  } else {
    sort.dueDate = 1; // Default sort by dueDate ascending
  }

  const tasks = await Task.find(query).sort(sort);
  res.json(tasks);
});


exports.getTaskById = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) {
    return next(new AppError('Task not found', 404));
  }
  res.json(task);
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { title, description, dueDate, status } = req.body;
  if (!title || !description || !dueDate) {
    return next(new AppError('Title, description, and due date are required', 400));
  }

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, description, dueDate, status },
    { new: true, runValidators: true }
  );
  if (!task) {
    return next(new AppError('Task not found or unauthorized', 404));
  }
  res.json(task);
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) {
    return next(new AppError('Task not found or unauthorized', 404));
  }
  res.json({ message: 'Task deleted successfully' });
});
