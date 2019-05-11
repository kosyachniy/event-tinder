const mongoose = require('mongoose')
const connection = require('../config/db.js')

const EventSchema = mongoose.Schema(
  {
    sourceUrl: {
      type: String
    },

    title: {
      type: String
    },

    img: {
      local: {
        type: String
      },
      web: {
        type: String
      }
    },

    description: {
      type: String
    },

    date: {
      day: {
        type: String
      },
      month: {
        type: String
      },
      year: {
        type: String
      }
    },

    time: {
      start: {
        hour: {
          type: String
        },
        minute: {
          type: String
        }
      },
      end: {
        hour: {
          type: String
        },
        minute: {
          type: String
        }
      }
    },

    tags: {
      type: [String]
    },

    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Event = connection.model('Event', EventSchema)

module.exports = Event
