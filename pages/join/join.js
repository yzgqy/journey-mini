Page({
  data: {

  },
  onLoad: function () {
    this.setData({
      journeyList: []
    })
    var journeyList = this.data.journeyList
    var that = this;
    var userId = getApp().globalData.userId
    wx.request({
      url: 'https://njuqa.clsaa.com/api/participant?userId=' + userId,
      method: 'GET',
      success: function (res) {
        var length = res.data.data.length
        for (var i = 0; i < length; i++) {
          var journeyid = res.data.data[i].journeyid
          wx.request({
            url: 'https://njuqa.clsaa.com/api/journey/' + journeyid,
            method: 'GET',
            success: function (resp) {
              journeyList.push(resp.data.data.journey)
              that.setData({
                journeyList: journeyList
              })
            }
          })
        }
      }

    })
    console.log(that.data.journeyList)
  },

  onShow: function () {
    this.setData({
      journeyList: []
    })
    var journeyList = this.data.journeyList
    var that = this;
    var userId = getApp().globalData.userId
    wx.request({
      url: 'https://njuqa.clsaa.com/api/participant?userId=' + userId,
      method: 'GET',
      success: function (res) {
        var length = res.data.data.length
        for (var i = 0; i < length; i++) {
          var journeyid = res.data.data[i].journeyid
          wx.request({
            url: 'https://njuqa.clsaa.com/api/journey/' + journeyid,
            method: 'GET',
            success: function (resp) {
              journeyList.push(resp.data.data.journey)
              that.setData({
                journeyList: journeyList
              })
            }
          })
        }
      }
    })
    console.log(that.data.journeyList)
  },


  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var page = getCurrentPages().pop()
    page.onLoad()
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  onPostTap: function (event) {
    var index = event.currentTarget.dataset.idx;
    wx.navigateTo({
      url: "../journey/journey-detail/journey-detail?journey=" + JSON.stringify(this.data.journeyList[index]) + "&type=join"
    })
  },

  publish: function (event) {
    wx.navigateTo({
      url: './publish/publish',
    })
  },

})