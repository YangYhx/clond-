// pages/collection/collection.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()

  },
  getdata(){
    return new Promise((resolve,reject) => {
      fetch.get(`/collection`).then(res => {
        
        this.setData({
          collectData: res.data.data
        })
        resolve(res)
      })
    })

  },
  jumpDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  onPullDownRefresh: function () {
    this.getdata().then(() => {
      wx.stopPullDownRefresh();
    })

  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})