var journeysData = require('../../../data/data.js')
const app = getApp()
Page({
  data: {
    latitude:"",
    longitude:"",
    joined: false,
    joinedandconfirmed: false,
    end: false,
    userId: app.globalData.userId
  },
  onLoad: function(option) {
    this.setData({
      journeyData: JSON.parse(option.journey),
      type: option.type
    })
    var starttime = new Date(this.data.journeyData.starttime).toLocaleString()
    var endtime = new Date(this.data.journeyData.endtime).toLocaleString()
    this.setData({
      starttime: starttime,
      endtime: endtime,
    })

    var userId = app.globalData.userId
    var journeyId=this.data.journeyData.id
    var that = this
    wx.request({
      url: 'https://njuqa.clsaa.com/api/participant?userId=' + userId + '&journeyId=' + journeyId,
      method: 'GET',
      success: function (res) {
        console.log(userId)
        console.log("参与者信息")
        console.log(res.data.data)
        if (res.data.data[0] != null){
        var id = res.data.data[0].id
        var type = that.data.type
        var participant = res.data.data[0]
        var isConfirmed = participant.isconfirmed
        var ishome = participant.ishome
        that.setData({
          id: id
        })
        if (ishome == 1) {
          that.setData({
            end: true
          })
        }
        else {
          if (isConfirmed == 1) {
            that.setData({
              joinedandconfirmed: true
            })
          }
          else {
            if (participant.length != 0) {
              that.setData({
                joined: true
              })
            }
          }
        }
      }
      }
    })

    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey/' + journeyId,
      method: 'GET',
      success: function (res) {
        console.log(res.data.data)
        var journey = res.data.data.journey
        var schedulingList = res.data.data.participantList
        var participantList = res.data.data.participantList
        console.log("旅游详情信息")
        console.log(journey)
        console.log(journeyId)
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
  // onJoinTap: function(event) {
  //   // this.getJourneysJoinedSyc();
  //   // this.getJourneysJoinedAsy();
  //   var journeyId = this.data.journeyData.id
  //   console.log(journeyId)
  //   // var userId ='190201BNCWDKG9AW'
  //   var journeysJoined = wx.getStorageSync('journeys_joined');
  //   var journeyJoined = journeysJoined[this.data.currentJourneyId];
  //   journeyJoined = !journeyJoined;
  //   journeysJoined[this.data.currentJourneyId] = journeyJoined;
  //   this.showModal(journeysJoined, journeyJoined);
  //   wx.request({
  //     url: 'https://njuqa.clsaa.com/api/participant',
  //     method: 'POST',
  //     data:{
  //         journeyid:journeyId,
  //         userid:userId,
  //         isinvited:1,
  //         desc: "这是描述：isinvited是表示该用户是否被邀请，是为1，不是为0"
  //     }
  //   })
   

  //   // wx.setStorageSync('journeys_joined', journeysJoined);

  //   // this.setData({
  //   //      joined:journeyJoined
  //   // })
  // },

  quit: function (event) {
    var type = event.currentTarget.dataset.type;
    var id = this.data.id
    var that = this
    console.log(id)
    wx.showModal({
      content: "确认退出？",
      title: "参与",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://njuqa.clsaa.com/api/participant/' + id,
            method: 'DELETE',
          })
          that.setData({
            joined: false,
            joinedandconfirmed: false,
            end: false
          })
        }
        var type = that.data.type
        wx.switchTab({
          url: '../../' + type + '/' + type,
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
      },

    })
  },
  
  onJoinTap: function (event) {
    // this.getJourneysJoinedSyc();
    // this.getJourneysJoinedAsy();is
    var joined = this.data.joined
    var end = this.data.end
    var journeyId = this.data.journeyData.id
    console.log(journeyId)
    this.showModal(joined, journeyId);
    // wx.setStorageSync('journeys_joined', journeysJoined);

    // this.setData({
    //      joined:journeyJoined
    // })
  },
  showModal: function (joined, journeyId) {
    console.log(journeyId)
    var that = this;
    var content = ""
    if (joined == false) {
      content = "确认加入项目？"
    }
    else {
      content = "确认参加？"
    }
    wx.showModal({
      title: "参与",
      content: content,
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          if (joined == false) {
            wx.request({
              url: 'https://njuqa.clsaa.com/api/participant',
              method: 'POST',
              data: {
                journeyid: journeyId,
                userid: that.data.userId,
                isinvited: 1,
                desc: "这是描述：isinvited是表示该用户是否被邀请，是为1，不是为0"
              },
            })
            that.setData({
              joined: true
            })
          }
          else {
            wx.request({
              url: 'https://njuqa.clsaa.com/api/journey/confirm?userId=' + that.data.userId + '&journeyId=' + journeyId,
              method: 'GET'

            })
            that.setData({
              joined: true,
              joinedandconfirmed: true
            })
          }
        }
      }

    })

  },

  onEndTap: function (event) {
    var userId = app.globalData.userId
    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey/home?userId=' + this.data.userId + '&journeyId=' + this.data.journeyData.id,
      method: 'GET',
      success: function (res) {
        i = 1
      },
      error: function (res) {
        i=1
      }
    })
    
    this.setData({
      end: true
    })
  }

})