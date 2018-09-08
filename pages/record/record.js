// pages/record/record.js
import {fetch} from "../../utils/util.js"
let dataNum = getApp().dataNum
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    percent:"",
    pn:1
  },
  onLoad: function (options) {
  this.getData()
  },
  getData(){
    return new Promise((resolve,reject) => {
      fetch.get(`/readList`).then(res => {
       
        resolve(res)
        this.setData({
          bookList: res.data.data,
        })
      })
    })
    
  },
  onPullDownRefresh(){
    this.setData({
      pn:1
    })
     this.getData().then(() => {
    wx.stopPullDownRefresh();
  })
  },

  onShareAppMessage: function () {
  
  }
})


