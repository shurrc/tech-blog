const moment = require('moment');

module.exports = {
  // convert utc date to local date, and format
  formatDate: (date) => {
    return moment(moment(moment.parseZone(date).local().format())).format('LLLL');
  },
  // check whether 2 values are equal
  isEqual: function (v1, v2) {    
    return v1 === v2;
  }
};
