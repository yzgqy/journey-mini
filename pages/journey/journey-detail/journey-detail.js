var journeysData = require('../../../data/data.js')
var app = getApp();
Page({
  data: {
    latitude:"",
    longitude:"",
  },
  onLoad: function(option) {
    this.setData({
      journeyData: JSON.parse(option.journey),
    })
    var journeyId=this.data.journeyData.id
    var that = this
    wx.request({
      url: 'https://njuqa.clsaa.com/api/participant?userId=190201BNCWDKG9AW&journeyId='+journeyId,
      method: 'GET',
      success: function (res) {
        var participant = res.data.data
        console.log(participant)
        if (participant.length==0){
          that.setData({
            joined:false
          })
        }
        else{
          console.log(1)
          that.setData({
            joined: true
          })
        }
      }
    })

    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey/' + journeyId,
      method: 'GET',
      success: function (res) {
        var journey = res.data.data.journey
        var schedulingList = res.data.data.participantList
        var participantList = res.data.data.participantList
        console.log(journey)
        that.setData({
          latitude: journey.latitude,
          longitude: journey.longitude,
        })
      }
    })
  },
  onjoinMap: function (event){
    var latitude = this.data.latitude
    var longitude = this.data.longitude
    console.log(latitude)
    console.log(longitude)
    wx.navigateTo({
      url: '/pages/map/map?latitude=' + latitude + "&longitude=" + longitude,
    })
  },
  onJoinTap: function(event) {
    // this.getJourneysJoinedSyc();
    // this.getJourneysJoinedAsy();
    var journeyId = this.data.journeyData.id
    console.log(journeyId)
    var userId ='190201BNCWDKG9AW'
    var journeysJoined = wx.getStorageSync('journeys_joined');
    var journeyJoined = journeysJoined[this.data.currentJourneyId];
    journeyJoined = !journeyJoined;
    journeysJoined[this.data.currentJourneyId] = journeyJoined;
    this.showModal(journeysJoined, journeyJoined);
    wx.request({
      url: 'https://njuqa.clsaa.com/api/participant',
      method: 'POST',
      data:{
          journeyid:journeyId,
          userid:userId,
          isinvited:1,
          desc: "这是描述：isinvited是表示该用户是否被邀请，是为1，不是为0"
      }
    })
   

    // wx.setStorageSync('journeys_joined', journeysJoined);

    // this.setData({
    //      joined:journeyJoined
    // })
  },

  showModal: function (journeysJoined, journeyJoined) {
    var that = this;
    wx.showModal({
      title: "参与",
      content: journeyJoined ? "确认参与？" : "确认推出？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync('journeys_joined', journeysJoined);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            joined: journeyJoined
          })
        }
      }
    })
  },

  onEndTap: function (event) {
    var journeysEnd = wx.getStorageSync('journeys_end');
    var journeyEnd = journeysEnd[this.data.currentJourneyId];

    journeyEnd = !journeyEnd;
    journeysEnd[this.data.currentJourneyId] = journeyEnd;

    wx.setStorageSync('journeys_end', journeysEnd);

    this.setData({
      end:journeyEnd
    })
  }

})