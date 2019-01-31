Page({
  data: {
  
    theme: "",
    money:"",
    endTime:"",
    assemblyPoint:"",
    desc: "",
    texts: "",

  },
  onLoad: function () {
  },


  userThemeInput: function (e) {
    //设置主题
    this.setData({
      theme: e.detail.value
    })
  },
  userMoneyInput: function (e) {
    //设置预算
    this.setData({
      money: e.detail.value
    })
  },
  userEndTimeInput: function (e) {
    //设置结束时间
    this.setData({
      endTime: e.detail.value
    })
  },
  userAssemblyPointInput: function (e) {
    //设置集合地点
    this.setData({
      assemblyPoint: e.detail.value
    })
  },
  userDescInput: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  
  submit: function () { //提交input信息到后台
    var theme = this.data.theme;
    console.log(theme)
    var money = this.data.money;
    console.log(money)
    var endTime = this.data.endTime;
    console.log(endTime)
    var assemblyPoint = this.data.assemblyPoint;
    console.log(assemblyPoint)
    var desc = this.data.desc;
    console.log(desc)

    wx.navigateBack({
      url: '../join',
    })
  }
})
