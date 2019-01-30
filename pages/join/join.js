Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "王博",
    birthday: "1995.04.27",
    gender: "男",
    desc: "null",
    phone: "18851750813",
    city: "江苏南京",
    school: "南京大学",
    createAt: "2019.01.28",
    updateAt: "2019.01.28"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  update: function (event) {
    wx.navigateTo({
      url: './join/join',
    })
  },
})