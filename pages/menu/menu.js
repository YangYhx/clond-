// pages/menu/menu.js
import {fetch} from "../../utils/util.js"
Page({


  data: {
   bookId:"",
   menuList:[],
   isLoading:true
  },

  onLoad: function (options) {
    
    this.setData({
      bookId:options.id,
    })
    this.getData();
  },
  getData(){
    return new Promise((resolve,reject) => {
      fetch.get(`/titles/${this.data.bookId}`).then(res => {
        this.setData({
          menuList: res.data.data,
          isLoading: false
        })
        resolve(res)
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
    })
   
  },
  onPullDownRefresh(){
    this.getData().then(() => {
      wx.stopPullDownRefresh();
    })

  },
  

  onShareAppMessage: function () {
  
  }
})