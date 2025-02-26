const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
