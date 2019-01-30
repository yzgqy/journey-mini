var journeysData = require('../../data/data.js')

Page({
  data: {
  },
  onLoad: function () {

    this.setData({
      journeyList: journeysData.journeyList
    });
  },

  onPostTap: function (event) {
    var journeyId = event.currentTarget.dataset.journeyid;
    wx.navigateTo({
      url: "../journey/journey-detail/journey-detail?id=" + journeyId
    })
  },

})