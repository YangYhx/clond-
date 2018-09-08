// pages/person/person.js
import {fetch , login } from "../../utils/util.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    let _this = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              _this.setData({
                userInfo: res.userInfo,
                canIUse:false
              })
              app.globalData.userInfo = res.userInfo;
            }
          })
        } 
      }
    })
  },
  bindGetUserInfo: function (e) {
    wx.login({
      success() {
        wx.getUserInfo({
          success() {
            _this.setData({
              userInfo: e.detail.userInfo,
              canIUse: false
            })
            app.globalData.userInfo = e.detail.userInfo;
          }
        })
      }
    })
  },
  

  collectJump(){
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  info(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  onShareAppMessage: function () {
  
  }
})