// 登陆相关接口请求
import request from '@/utils/request'
// 1.获取图片验证码
export const getPicCode = () => {
  request.get('/captcha/image')
  // console.log(res)
  return request.get('/captcha/image')
}
// 2.获取手机验证码
export const getMessageCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }

  })
}
// 3.登陆
export const codeLogin = (mobile, smsCode) => {
  return request.post('passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
