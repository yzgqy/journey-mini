Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    journeyLatitude: 0,
    journeyLongitude: 0,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      iconPath: '/imgs/ic_location.png',
      title: "集合地点"
    }],
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
    var journeyLatitude = options.latitude
    console.log(journeyLatitude)
    var journeyLongitude = options.longitude
    console.log(journeyLongitude)
    var temp_str1 = 'markers[0].latitude';
    var temp_str2 = 'markers[0].longitude';
    that.setData({
      // var j = parseInt("11");
      journeyLatitude: Number(journeyLatitude),
      journeyLongitude: Number(journeyLongitude),
      [temp_str1]: Number(journeyLatitude),
      [temp_str2]: Number(journeyLongitude),
    });
    console.log(that.data.markers)

    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      // type: 'wgs84',
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
