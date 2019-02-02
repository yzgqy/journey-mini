var journeysData = require('../../../data/data.js')
var userId = getApp().globalData.userId
Page({
  data: {
  joined:false,
  joinedandconfirmed:false,
  end:false
  },
  onLoad: function(option) {
    this.setData({
      journeyData: JSON.parse(option.journey),
      type:option.type
    })
    console.log(this.data.journeyData.id)
    var journeyId=this.data.journeyData.id
    var that = this
    wx.request({
      url: 'https://njuqa.clsaa.com/api/participant?userId='+userId+'&journeyId='+journeyId,
      method: 'GET',
      success: function (res) {
        console.log(res.data.data)
        var id = res.data.data[0].id
        var type=that.data.type
        var participant = res.data.data[0]
        var isConfirmed = participant.isconfirmed
        var ishome=participant.ishome
        that.setData({
          id: id
        })
        if(ishome==1){
          that.setData({
            end:true
          })
        }
        else{
          if(isConfirmed==1){
            that.setData({
              joinedandconfirmed: true
            })
          }
          else{
            if (participant.length!=0){
              that.setData({
                joined: true
              })
            }
          }
        }
      }
    })
 
  },
  quit:function(event){
    var type = event.currentTarget.dataset.type;
    var id=this.data.id
    var that=this
    console.log(id)
    wx.showModal({
      content: "确认退出？",
      title: "参与",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success:function(res){
        if(res.confirm){
          wx.request({
            url: 'https://njuqa.clsaa.com/api/participant/'+id,
            method: 'DELETE',
          })
          that.setData({
            joined: false,
            joinedandconfirmed: false,
            end: false
          })
        }
        var type=that.data.type
        wx.switchTab({
          url: '../../'+type+'/'+type,
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
      },
    
  })
  },
  onJoinTap: function(event) {
    // this.getJourneysJoinedSyc();
    // this.getJourneysJoinedAsy();is
    var joined=this.data.joined
    var end=this.data.end
    var journeyId = this.data.journeyData.id
    console.log(journeyId)
    this.showModal(joined, journeyId);
    // wx.setStorageSync('journeys_joined', journeysJoined);

    // this.setData({
    //      joined:journeyJoined
    // })
  },
  showModal: function (joined,journeyId) {
    console.log(journeyId)
    var that = this;
    var content=""
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
           if(joined==false){
           wx.request({
             url: 'https://njuqa.clsaa.com/api/participant',
             method: 'POST',
             data: {
               journeyid: journeyId,
               userid: userId,
               isinvited: 1,
               desc: "这是描述：isinvited是表示该用户是否被邀请，是为1，不是为0"
             },
           })
           that.setData({
             joined: true
           })
         }
         else{
             wx.request({
               url: 'https://njuqa.clsaa.com/api/journey/confirm?userId='+userId+'&journeyId=' + journeyId,
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
    wx.request({
      url: 'https://njuqa.clsaa.com/api/journey/home?userId='+userId+'&journeyId='+this.data.journeyData.id,
      method: 'GET',
    })
    this.setData({
      end:true
    })
  }

})