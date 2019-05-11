const eventModel = require('../../models/Event')

exports.create = function(event) {
  return eventModel.create(event)
}

exports.findById = function(id) {
  return eventModel.findById(id)
}

exports.updateById = function(id, updateObject) {
  return eventModel.findByIdAndUpdate(id, updateObject, { new: true })
}

exports.getAllEvents = function() {
  return eventModel.find()
}

exports.dropCollection = function() {
  return eventModel.collection.drop()
}
