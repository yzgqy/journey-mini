Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    // markers: [{
    //   id: 1,
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   name: 'T.I.T 创意园'
    // }],
    // covers: [{
    //   latitude: 23.099994,
    //   longitude: 113.344520,
    //   iconPath: '/imgage/location.png'
    // }, {
    //   latitude: 23.099994,
    //   longitude: 113.304520,
    //   iconPath: '/imgage/location.png'
    // }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },

  chooseLocation: function () {
    var that = this
    this.mapCtx.moveToLocation(),
    // 地图选择
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  
  onLoad: function (options) {
    var that = this
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        //根据坐标获取当前位置名称，显示在顶部，腾讯地图逆地址解析
        console.log(res.latitude);
        console.log(res.longitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
      },
    })
  },
})
