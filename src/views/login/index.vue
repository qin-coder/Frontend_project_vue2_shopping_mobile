<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
            v-model="mobile"
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="" />
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text" />
          <button @click="getCode" > {{ second === totalSecond ? '获取验证码' : second + '秒后重新获得验证码'}}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMessageCode, codeLogin } from '@/api/login'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      picUrl: '', // 图形验证码的url
      picKey: '', // 图形验证码的key
      totalSecond: 60, // 倒计时总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器
      picCode: '', // 用户输入的图形验证码
      mobile: '', // 用户输入的手机号
      code: '', // 用户输入的短信验证码
      msgCode: '' // 用户输入的短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key

      Toast('成功获取图形验证码')
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) return // 如果没通过，则返回
      if (!this.timer && this.second === this.totalSecond) { // 如果定时器存在并且秒数等于总秒数
        const res = await getMessageCode(this.mobile, this.picCode, this.picKey) // 发送请求
        console.log(res)
        this.$toast('验证码发送成功') // 提示
        this.timer = setInterval(() => {
          this.second--
          if (this.second === 0) {
            clearInterval(this.timer)
            this.timer = null // 清除定时器
            this.second = this.totalSecond // 重置秒数
          }
        }, 1000)
      }
    },
    // 校验 手机号码和 图形验证码 是否合法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号码')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的验证码')
        return
      }

      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      // console.log(res)
      this.$toast('登录成功')
      // 判断有无回跳地址
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  destroyed () {
    clearInterval(this.timer) // 组件销毁时清除定时器
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
