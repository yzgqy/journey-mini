// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '47IBZ-QMA6I-JOWGH-5DSHJ-KGEDO-NSF44' // 必填
});
Page({

  data: {
    assemblyPoint: "南京大学(鼓楼校区)",
    latitude: 32.054888,
    longitude: 118.779479,
    hiddenName: false
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
getsuggest: function(e) {
  var _this = this;
  //调用关键词提示接口
  this.setData({
    hiddenName: false
  });  
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
    },
    complete: function (res) {
      console.log(res);
    }
  });
}
})