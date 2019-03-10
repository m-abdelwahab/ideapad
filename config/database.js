if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://7ookaboi:7ookaboi99@ds239873.mlab.com:39873/ideapad-prod'
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/ideapad-dev'
  }
}