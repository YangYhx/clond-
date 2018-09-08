//app.js
import {login} from "./utils/util.js"
App({
  globalData: {
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    console.log(this.globalData.userInfo)
  },
})