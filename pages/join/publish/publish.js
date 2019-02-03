var util = require("../../../utils/util.js");

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
    //设置电话
    this.setData({
      endTime: util.js_date_time(e.detail.value)
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
    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey',
      method: 'POST',
    
      data: {
        journey:{
          theme:theme,
          money:money,
          endtime:endTime,
          assemblypoint:assemblyPoint,
          desc:desc,
          starttime:endTime,
          sponsorid:'190201BCZ28GZ1WH',
          ispublic:1,
          isfind:0,
          cover: "/cover/xx.png",
          place: "游玩地点",
        },
        schedulingList: [
          {
            "starttime": 1549007987,
            "endtime": 1549007987,
            "activityname": "活动名称"
          }, {
            "starttime": 1549007987,
            "endtime": 1549007987,
            "activityname": "活动名称"
          }]
      }

    })
  }
})
