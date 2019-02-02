
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
        console.log(that.data.journeyList)
      },
      
    })
   
  },
  onPostTap: function (event) {
   
    var index = event.currentTarget.dataset.idx;
    wx.navigateTo({
      url: "../journey/journey-detail/journey-detail?journey=" + JSON.stringify(this.data.journeyList[index]) + "&type=index"
    })
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var page=getCurrentPages().pop()
    page.onLoad()
        // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
        // 停止下拉动作
    wx.stopPullDownRefresh();
     
  },

})