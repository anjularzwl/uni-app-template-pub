const fs = require('fs');
const path = require('path')
const axios = require('axios')
// const api = require('../src/core/api/index')
const qs = require('qs')
function read() {
  fs.readFile(`${path.resolve(__dirname, '..')}/dist/build/mp-weixin/ext.json`, (err, data) => {
    if (err) {
      console.error(err);
    }
    // buffer 转 JSON
    let json = data.toString();
    json = JSON.parse(json);
    // 发审核地址
    const examineUrl = `https://oss.nextxx.cn/esenwxmp/mapi/code/submit-audit/${json.extAppid}`
    // console.log('JSON------', json, examineUrl)
    const newPath = `${path.resolve(__dirname, '..')}/dist/build/mp-weixin`
    console.log(newPath)
    axios.get(`http://127.0.0.1:65438/upload?projectpath=${encodeURIComponent(newPath)}&version=v2.5.7&desc=big2.5.7`).then(res => {
      console.log('rrrrrrrrrrr', res)
      // https://oss.nextxx.cn/
      // https://wxapp.esenyun.com/esenwxmp/mapi/code/submit-audit
      // 大飞 18116352283 123456
      //大晨哥 18916611603 qazwsxedc
      const data = {
        grant_type: 'password',
        scope: 'internal',
        username: '18916611603',
        password: 'qazwsxedc'
      }
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic ZGVza3RvcF9vc3NfYXBwOjZXNzZqNDJHaTd2UQ==' },
        data: qs.stringify(data),
        url: 'https://wxapp.esenyun.com/esenuaa/oauth/token',
      }
      axios(options).then(res => {
        console.log('获取token成功', res.data)
        axios.post(examineUrl, {}, {
          headers: { 'Accept-Encoding': 'gzip, deflate', 'Authorization': `Bearer ${res.data.access_token}` }
        }).then(resq => {
          console.log('发审成功', resq.data)
        }).catch(fails => {
          console.log('发审失败', fails)
        })
      }).catch(fail =>{
        console.log('获取token失败', fail)
      })
    }).catch(e => {
      console.log('error', e)
    })
  })
}
read();

