var journeysData = require('../../../data/data.js')

Page({
  data: {
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey?userId=190201BCZ28GZ1WH&flag=1',
      method: 'GET',
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          journeyList: res.data.data
        })
      }
    })
  },

  onPostTap: function (event) {
    var journeyId = event.currentTarget.dataset.journeyid;
    wx.navigateTo({
      url: "../../journey/journey-detail/journey-detail?id=" + journeyId
    })
  },

})