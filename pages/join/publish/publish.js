// 引入SDK核心类
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '47IBZ-QMA6I-JOWGH-5DSHJ-KGEDO-NSF44' // 必填
});

const app = getApp()

Page({
  data: {
  
    theme: "",
    money:"",
    startTime: "",
    endTime:"",
    desc: "",
    texts: "",
    assemblyPoint: "",
    latitude: 0,
    longitude: 0,
    hiddenName: false,

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
  userStartTimeInput: function (e) {
    //设置开始时间
    this.setData({
      startTime: e.detail.value
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
    endTime = endTime.substring(0, 19);
    endTime = endTime.replace(/-/g, '/');
    var timestamp1 = new Date(endTime).getTime();

    console.log(timestamp1)

    var startTime = this.data.startTime;
    startTime = startTime.substring(0, 19);
    startTime = startTime.replace(/-/g, '/');
    var timestamp2 = new Date(startTime).getTime();

    console.log(timestamp2)

    var assemblyPoint = this.data.assemblyPoint;
    console.log(assemblyPoint)
    var desc = this.data.desc;
    console.log(desc)
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey',
      method: 'POST',
    
      data: {
        journey:{
          theme:theme,
          money:money,
          endtime: timestamp1,
          assemblypoint:assemblyPoint,
          desc:desc,
          starttime: timestamp2,
          sponsorid: app.globalData.userId,
          ispublic:1,
          isfind:0,
          cover: "/cover/xx.png",
          place: "游玩地点",
          latitude: latitude,
          longitude: longitude,
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
    //wx.navigateBack({
      //url: '../join',
      //url: '/pages/index/index',
    //})
    // wx.navigateTo({
    //   url: '/pages/index/index'
    // })

    wx.navigateBack({
      delta: 2   //默认值是1
    })
  },

  //数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        console.log(this.data.suggestion[i].title)
        console.log(this.data.suggestion[i].latitude)
        console.log(this.data.suggestion[i].longitude)
        this.setData({
          backfill: this.data.suggestion[i].title,
          latitude: this.data.suggestion[i].latitude,
          longitude: this.data.suggestion[i].longitude,
          hiddenName: true
        });
      }
    }
  },

  //触发关键词输入提示事件
getsuggest: function (e) {
    var _this = this;
  this.setData({
    hiddenName: false
  });
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function (error) {
        console.error(error);
        var sug = [];
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
})
