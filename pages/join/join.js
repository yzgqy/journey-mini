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
      url: 'https://njuqa.clsaa.com/api/journey?userId=' + userId+'&flag=0',
      method: 'GET',
      success: function (resp) {
        journeyList = resp.data.data
        that.setData({
          journeyList: journeyList
        })
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
      url: 'https://njuqa.clsaa.com/api/journey?userId=' + userId + '&flag=0',
      method: 'GET',
      success: function (resp) {
        journeyList =resp.data.data
        that.setData({
          journeyList: journeyList
        })
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