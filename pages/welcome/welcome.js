//index.js
//获取应用实例
const app = getApp()

Page({//注册当前页面
  data: {
    motto: 'GO！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userId:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // console.log("用户信息：" + res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          // console.log("用户信息：" + res.userInfo)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(e.detail.userInfo)
    var nickname = app.globalData.userInfo.nickName
    wx.request({
      url: "https://njuqa.clsaa.com/api/user/nickname/" + nickname,
      method: "GET",
      success: function (result) {
        app.globalData.userId = result.data.data.id;
        console.log("welcome 中设置id：")
        console.log(app.globalData.userId)
      }
    })


    
    // wx.login({
    //   success: function (res) {
    //     // console.log(res)
    //     //获取登录的临时凭证
    //     var code = res.code;
    //     //调用后端，获取微信的session_key，secret
    //     wx.request({
    //       url: "https://njuqa.clsaa.com/api/wxLogin?code=" + code,
    //       method: "POST",
    //       success: function (result) {
    //         console.log(result);
    //         console.log(result.data.data.openid);
    //         app.globalData.userInfo.openid = result.data.data.openid;
    //         // 保存用户信息到本地缓存，可以用作小程序端的拦截器
    //         // app.setGlobalUserInfo(e.detail.userInfo);
    //         // wx.redirectTo({
    //         //   url: '../index/index',
    //         // })
    //       }
    //     })
    //   }
    // })
    // console.log(this.data.userInfo);
    // console.log(app.globalData.userInfo)
  },

  onStart(event) {
    var nickname = app.globalData.userInfo.nickName
              wx.request({
                url: "https://njuqa.clsaa.com/api/user/nickname/" + nickname,
                method: "GET",
                success: function (result) {
                  app.globalData.userId = result.data.data.id;
                  console.log("go！ 中设置id：")
                  console.log(app.globalData.userId)
                }
              })
    wx.switchTab({
      url: '../index/index',
    })
  }
})