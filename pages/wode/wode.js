import request from '../../utils/loginInfo'
import {
  compareDates
} from '../../utils/validate'
import {
  userCenter
} from '../../api/login.js'
Page({
  data: {
    rightPosition: "",
    overlayShow: false,
    show: false,
    avatarUrl: "",
    name: "xx",
    id: "00000",
    view_point: "0",
    userInfo: {},
    vipTimeTips: "",
    vip_type: 0,
    vip_end_time: "",
    mySet: [{
        'name': "我的卡券",
        'img': "../../static/img/wodeqiaquan.png",
      },
      {
        'name': "充值记录",
        'img': "../../static/img/chongzhijilu.png",
      },
      {
        'name': "消费明细",
        'img': "../../static/img/xiaofeimingxi.png",
      },
      {
        'name': "联系客服",
        'img': "../../static/img/kefu.png",
      },
      {
        'name': "设置",
        'img': "../../static/img/shezhi.png",
      },
      {
        'name': "收藏小程序",
        'img': "../../static/img/shoucang.png",
      }
    ]
  },
  // 充值按钮
  goRecharge() {
    wx.navigateTo({
      url: '/packageDetails/pages/recharge/recharge',
    })
  },
  //跳转修改昵称头像页面
  goUserInfo() {
    wx.navigateTo({
      url: '/packageDetails/pages/updateUserinfo/updateUserinfo',
    })
  },
  // 复制功能
  copyText(e) {
    let key = e.currentTarget.dataset.copy_text;
    console.log(e.currentTarget.dataset)
    wx.setClipboardData({ //设置系统剪贴板的内容
      data: key,
      success(res) {
        console.log(res, key);
        wx.getClipboardData({ // 获取系统剪贴板的内容
          success(res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
  onClickHide() {
    this.setData({
      overlayShow: false
    });
  },
  /**
   * 点击我的预约等板块后进行页面跳转
   */
  onMySet: function (e) {
    switch (e.currentTarget.dataset.type) {
      case "我的卡券":
        wx.navigateTo({
          url: '/packageDetails/pages/cardPage/cardPage',
        })
        break;
      case "充值记录":
        wx.navigateTo({
          url: '/packageDetails/pages/transactionDetails/transactionDetails?tabs=1',
        })
        break;
      case "消费明细":
        wx.navigateTo({
          url: '/packageDetails/pages/transactionDetails/transactionDetails?tabs=0',
        })
        break;
      case "联系客服":
        wx.showToast({
          title: '联系客服',
          icon: "none"
        })
        break;
      case "设置":
        wx.navigateTo({
          url: '/packageDetails/pages/setPage/setPage',
        })
        break;
      case "收藏小程序":
        const {
          right
        } = wx.getMenuButtonBoundingClientRect()
        this.setData({
          overlayShow: true,
          rightPosition: right
        });
        break;
      default:
        break;
    }
  },
  gomemberPage() {
    wx.navigateTo({
      url: '/packageDetails/pages/member/member',
    })
  },
  getsignPage() {
    wx.navigateTo({
      url: '/packageDetails/pages/signPage/signPage',
    })
  },
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  // 绑定手机号
  getPhoneNumber(e) {
    request.getPhone(e.detail.code)
    console.log(e.detail.code) // 动态令牌
    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    console.log(e.detail.errno) // 错误码（失败时返回）
  },
  //退出登录
  loginOut() {
    wx.removeStorageSync('token')
    wx.clearStorage()
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.initUserinfo()
  },
  // 初始化用户信息
  async initUserinfo() {
    try {
      const {
        msg,
        code,
        data
      } = await userCenter({})
      if (code === 200) {
        const storageUseInfo = wx.getStorageSync('userInfo')
        if (data) {
          this.setData({
            avatarUrl: data.avatar_url,
            name: data.nickname,
            id: storageUseInfo.id,
            view_point: data.view_point,
            vip_type: data.vip_type,
            vip_end_time: data.vip_end_time,
            vipTimeTips: compareDates(data.vip_end_time)
          })
        }
      } else {
        wx.showToast({
          title: msg,
          icon: "error"
        })
      }
    } finally {
      wx.stopPullDownRefresh()
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.userInfo = wx.getStorageSync('userInfo')
    this.initUserinfo()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.initUserinfo()
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