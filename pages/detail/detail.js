// pages/detail/detail.js
import {fetch,login} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookContent:{},
    isLoading: false,
    time:""
  },
  onLoad: function (options) {
   this.setData({
     bookId:options.id,
     isLoading:true
   })
   this.getdata();
  },
  //拿到这本书的数据
  getdata(){
    fetch.get(`/book/${this.data.bookId}`).then(res =>{
      
      let arr = [...res.data.data.updateTime].slice(0,10);
      let str = arr.join("")
      
      this.setData({
        bookContent:res.data,
        isLoading: false,
        time:str
      });
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  jumpRead(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/menu/menu?id=${id}`,
    })
  },
  hendleCollect(){
    let bookContent = this.data.bookContent;
    if(this.data.bookContent.isCollect == 0){
      fetch.post('/collection', {
        bookId: this.data.bookId
      }).then(res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '收藏成功',
            type: 'success',
            duretion: 1000
          })
         
          bookContent.isCollect = 1
          this.setData({
            bookContent: bookContent
          })
        }
      })
    }else{
      fetch.del(`/collection/${this.data.bookId}`).then(res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '取消收藏',
            type: 'success',
            duretion: 1000
          })
          bookContent.isCollect = 0
          this.setData({
            bookContent: bookContent
          })
        }
      })
    }
   
  },
  onShareAppMessage: function () {
    return {
      title: this.data.bookContent.title,
      path: `/pages/detail/detail?id=${this.data.bookId}`,
      imageUrl: this.data.bookContent.data.img
    }
  }
})