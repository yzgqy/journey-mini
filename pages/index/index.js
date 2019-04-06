const app = getApp()
Page({
  data: {
  },
  onLoad: function () {

    var nickname = app.globalData.userInfo.nickName
    var gender = app.globalData.userInfo.gender
    var city = app.globalData.userInfo.city
    var avatar = app.globalData.userInfo.avatarUrl
    var id = app.globalData.userId
    console.log(nickname)
    console.log(gender)
    console.log(city)
    console.log(avatar)
    console.log(id)
    wx.request({
      url: 'https://njuqa.clsaa.com/api/user',
      method: 'PUT',
      data: {
        id: id,
        nickname: nickname,
        gender: gender,
        city: city
      }

    })

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

  onShow: function () {
    var nickname = app.globalData.userInfo.nickName
    var gender = app.globalData.userInfo.gender
    var city = app.globalData.userInfo.city
    var avatar = app.globalData.userInfo.avatarUrl
    var id = app.globalData.userId
    console.log(nickname)
    console.log(gender)
    console.log(city)
    console.log(avatar)
    console.log(id)
    wx.request({
      url: 'https://njuqa.clsaa.com/api/user',
      method: 'PUT',
      data: {
        id: id,
        nickname: nickname,
        gender: gender,
        city: city
      }

    })
    var that = this
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
      url: "../journey/journey-detail/journey-detail?journey=" + JSON.stringify(this.data.journeyList[index]) + "&type=index"
    })
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var page = getCurrentPages().pop()
    page.search()
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();

  },

  searchInput(e) {
    this.setData({
      code: e.detail.value
    })
  },

  search: function(){
    var code = this.data.code
    var nickname = app.globalData.userInfo.nickName
    var gender = app.globalData.userInfo.gender
    var city = app.globalData.userInfo.city
    var avatar = app.globalData.userInfo.avatarUrl
    var id = app.globalData.userId
    if(code == "" || code == undefined){
      wx.request({
        url: 'https://njuqa.clsaa.com/api/user',
        method: 'PUT',
        data: {
          id: id,
          nickname: nickname,
          gender: gender,
          city: city
        }
      })
      var that = this
      wx.request({
        url: 'https://njuqa.clsaa.com/api/journey',
        method: 'GET',
        success: function (res) {
          for(var i =0;i <res.data.data.length;i++)
            if (!res.data.data.desc)
              res.data.data[i].desc=''
          that.setData({
            journeyList: res.data.data
          })
        }
      })
    }

    else{
      wx.request({
        url: 'https://njuqa.clsaa.com/api/user',
        method: 'PUT',
        data: {
          id: id,
          nickname: nickname,
          gender: gender,
          city: city
        }
      })
      var that = this
      wx.request({
        url: 'https://njuqa.clsaa.com/api/journey/code/' + code,
        method: 'GET',
        success: function (res) {
          for (var i = 0; i < res.data.data.length; i++)
            if (!res.data.data.desc)
              res.data.data[i].desc = ''
          that.setData({
            journeyList: res.data.data
          })
        }
      }) 
    }
  }

})