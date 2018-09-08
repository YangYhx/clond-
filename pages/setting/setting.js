// pages/setting/setting.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      this.setData({
        userInfo: app.globalData.userInfo
      })
    
    
  },

  onPullDownRefresh: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.stopPullDownRefresh();
  },

  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})