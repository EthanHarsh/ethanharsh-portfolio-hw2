const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    slug: String,
    author: String,
    description: String,
    type: String,
    keywords: Array,
    url: String,
    repo: String,
    heroimg: String,
    storageTime: {
        type: Date,
        required: true,
        default: Date.now
    }
});


//MIDDLEWARE
projectSchema.pre('save', function(next) {
   // this.slug = slugify(this.name, { lower: true });
   console.log(this.name);
    this.author = 'Ethan Harsh';
    this.storageTime = Date.now;
    next();
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;