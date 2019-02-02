Page({

  /**
   * 页面的初始数据
   */
  data: {

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId=getApp().globalData.userId
    var that=this
    wx.request({
      url: 'https://njuqa.clsaa.com/api/user/' + userId,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          data:res.data.data,
         
        })
        console.log(that.data.data.birthday.substring(0,10))
      }
    })
    
  },

  update: function (event) {
    var t=this
    var id = t.data.data.id
    wx.navigateTo({
      url: './update/update?id='+id
    })
  },
})