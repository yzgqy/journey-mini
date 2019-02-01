var journeysData = require('../../../data/data.js')
var app = getApp();
Page({
  data: {

  },
  onLoad: function(option) {
    var journeyId = option.id;
    this.data.currentJourneyId = journeyId;
    var journeyData = journeysData.journeyList[journeyId];
    this.setData({
      journeyData: journeyData
    })

    var journeysJoined = wx.getStorageSync('journeys_joined')
    if (journeysJoined) {
      var journeyJoined = journeysJoined[journeyId]
      this.setData({
        joined: journeyJoined
      })
    } else {
      var journeysJoined = {};
      journeysJoined[journeyId] = false;
      wx.setStorageSync('journeys_joined', journeysJoined);
    }

    var journeysEnd = wx.getStorageSync('journeys_end')
    if (journeysEnd) {
      var journeyEnd = journeysEnd[journeyId];
  
      this.setData({
        end: journeyEnd,
      })
    } else {
      var journeysEnd = {};
      journeysEnd[journeyId] = false;
      wx.setStorageSync('journeys_end', journeysEnd);
    }
  },

  onJoinTap: function(event) {
    // this.getJourneysJoinedSyc();
    // this.getJourneysJoinedAsy();
    var journeysJoined = wx.getStorageSync('journeys_joined');
    var journeyJoined = journeysJoined[this.data.currentJourneyId];

    journeyJoined = !journeyJoined;
    journeysJoined[this.data.currentJourneyId] = journeyJoined;
    this.showModal(journeysJoined,journeyJoined);

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