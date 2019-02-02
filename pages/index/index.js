
Page({
  data: {
  },
  onLoad: function () {
    var that=this
    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey',
      method: 'GET',
      success: function (res) {
        that.setData({
          journeyList: res.data.data
        })
      }
    })
   
  },
  onPostTap: function (event) {
    var index = event.currentTarget.dataset.idx;
    wx.navigateTo({
      url: "../journey/journey-detail/journey-detail?journey=" + JSON.stringify(this.data.journeyList[index])
    })
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey',
      method: 'GET',
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          journeyList: res.data.data
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

})