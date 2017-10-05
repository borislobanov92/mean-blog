const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// Validate Function to check title length
let titleLengthChecker = (title) => {
    // Check title exists
    if (!title) { return false; }

    // Check the length of title string
    return (title.length > 5 || title.length < 50);
};

// Validate Function to check if valid e-mail format
let alphaNumericTitleChecker = (title) => {
    // Check if e-mail exists
    if (!title) { return false; }

    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title); // Return regular expression test results (true or false)
};

// Array of Email Validators
const titleValidators = [
    // First Email Validator
    {
        validator: titleLengthChecker,
        message: 'Title must be at least 5 characters but no more than 50'
    },
    // Second Email Validator
    {
        validator: alphaNumericTitleChecker,
        message: 'Title must be alphanumeric'
    }
];

// Validate Function to check post body length
let bodyLengthChecker = (body) => {
    // Check if body exists
    if (!body) { return false; }

    // Check length of body string
    return (body.length > 5 && body.length < 500);
};


// Array of body validators
const bodyValidators = [
    // First Username validator
    {
        validator: bodyLengthChecker,
        message: 'Post body must be at least 5 characters but no more than 500'
    }
];

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
    // Check if comment exists
    if (!comment[0]) { return false; }

    // Check comment length
    return (comment[0].length > 1 || comment[0].length < 200);
};

// Array of comment validators
const commentValidators = [
    // First comment validator
    {
        validator: commentLengthChecker,
        message: 'Comment must not exceed 200 characters'
    }
];

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: titleValidators
    },
    body: {
        type: String,
        required: true,
        validate: bodyValidators
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: Array
    },
    dislikes: {
        type: Number,
        default: 0
    },
    dislikedBy: {
        type: Array
    },
    comments: [{
        comment: {
            type: String,
            validate: commentValidators
        },
        commentator: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Blog', blogSchema);