// pages/readContent/readContent.js
import {
  fetch
} from "../../utils/util.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: "",
    article: {},
    title: "",
    isLoading: true,
    catalog: [],
    isShow: false,
    bookId: "",
    font: 40,
    index: ""
  },


  onLoad: function(options) {
    this.setData({
      articleId: options.id,
      bookId: options.bookId,
    })
    this.getData();
    this.getCatalog();
  },

  //请求markdown文件，并转换为内容

  getData() {
    return new Promise((resolve,reject) => {
      fetch.get(`/article/${this.data.articleId}`).then(res => {
        this.setData({
          article: res.data.data.article.content,
          index: res.data.data.article.index,
          title: res.data.data.title,
          isLoading: false
        })
        resolve(res)
      }).catch(err => {
        wx.showModal({
          title: '获取失败',
          content: '请返回重试',
        })
        this.setData({
          isLoading: false
        })
      })

    })
    
  },
  getCatalog() {
    return new Promise((resolve,reject) => {
      fetch.get(`/titles/${this.data.bookId}`).then(res => {
        this.setData({
          isLoading: true,
          catalog: res.data.data,
        })
        resolve(res)
      })
    })
    
  },
  toggleCatalog() {
    let isShow = !this.data.isShow;
    this.setData({
      isShow
    })
  },
  handleGet(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      articleId: id,
      isShow: !this.data.isShow
    })
    this.getData()
  },
  //字体大小的缩减
  handleAdd() {
    if (this.data.font >= 60) {
      wx.showModal({
        title: '已经够大了',
        content: '请注意保护眼睛视力',
      })
    } else {
      this.setData({
        font: this.data.font + 2
      })
    }
  },
  handleReduce() {
    if (this.data.font <= 20) {
      wx.showModal({
        title: '已经够小了',
        content: '请注意保护眼睛视力',
      })
    } else {
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  //章节的跳转
  articleNext() {
    let catalog = this.data.catalog;
    if (this.data.index + 1 >= catalog.length) {
      wx.showModal({
        title: '提示',
        content: '已经是后一张了',
      })
    } else {
      this.setData({
        isLoading: true
      })
      let id = catalog[this.data.index + 1]._id;
      this.setData({
        articleId: id,
        isLoading: false
      })
      this.getData();
    }


  },
  articleback() {
    let catalog = this.data.catalog;
    if (this.data.index - 1 <= 0) {
      wx.showModal({
        title: '提示',
        content: '已经到第一章了',
      })
    } else {
      this.setData({
        isLoading:true
      })
      let id = catalog[this.data.index - 1]._id;
      this.setData({
        articleId: id,
        isLoading: false
      })
      this.getData();
    }
  },
  onPullDownRefresh(){
    Promise.all[this.getData(),this.getCatalog].then(()=>{
      wx.stopPullDownRefresh()
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})