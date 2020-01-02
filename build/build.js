const fs = require('fs');
const path = require('path');

function changeJson(id, params) {
  let appId
  if (process.env.NODE_ENV === 'dev') {
    appId = 'wx548a07eaf3ba54cf'
  }
  if (process.env.NODE_ENV === 'test') {
    appId = 'wx61bb8e43195c7ac5'
  }
  if (process.env.NODE_ENV === 'production') {
    appId = 'wx3bc009c34c8a1040'
  }
  // package.json
//   fs.readFile(`${path.resolve(__dirname, '..')}/project.config.json`, (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     // buffer 转 JSON
//     let json = data.toString();
//     json = JSON.parse(json);
//     // 修改appId
//     json.appid = appId
//     //把数据读出来,然后进行修改
//     json = JSON.stringify(json);
//      // 修改less
//      changeVarLess();
//      changeVarIndex();
//      changeVarDetail();
//      changeVarCardIndex();
//     //console.log(str);
//     fs.writeFile(`${path.resolve(__dirname, '..')}/project.config.json`, json, function (err) {
//       if (err) {
//         console.error(err);
//       }
//       console.log('--------------------package.json 修改成功-------------------');
//     })
//   })
}
  // 修改less
  // changeVarLess();
  // changeVarIndex();
  // changeVarDetail();
  // changeVarCardIndex();
// 读取 less 变量并修改
function changeVarLess(json) {
  fs.readFile(`${path.resolve(__dirname, '..')}/src/common/less/variables.less`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceColor(dealData, '@primary-color', '#29ab91')
    dealData = replaceColor(dealData, '@background-color-sup-3', '#eef9f7')
    dealData = replaceColor(dealData, '@primary-color-sup-1', '#34b59d')
    dealData = replaceColor(dealData, '@tranform-color', '#29ab91')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/common/less/variables.less`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------variables.less 修改成功-------------------');
    })
  })
  // 改回去svg的颜色
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/resource.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', '#29AB91')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/resource.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------resource.svg 修改回去成功-------------------');
    })
  })
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/reservation.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', '#29AB91')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/reservation.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------reservation.svg 修改回去成功-------------------');
    })
  })
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/vocation.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', '#29AB91')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/vocation.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------vocation.svg 修改回去成功-------------------');
    })
  })
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/sample.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', '#29AB91')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/sample.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------sample.svg 修改回去成功-------------------');
    })
  })
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/faq.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', '#29AB91')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/faq.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------faq.svg 修改回去成功-------------------');
    })
  })
}
// 读取 index 变量并修改
function changeVarIndex(json) {
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/index.vue`, (err, data) => {
    if (err) {
      console.error(err);
    }
    const dealData = customerReplaceColor(data.toString(), 'color="#\\w{6}"', '#34b59d')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/index.vue`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------index.vue 修改成功-------------------');
    })
  })
}
// 读取 card/index 变量并修改
function changeVarCardIndex(json) {
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/card/index.vue`, (err, data) => {
    if (err) {
      console.error(err);
    }
    const dealData = customerReplaceColor(data.toString(), 'color="#\\w{6}"', '#34b59d')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/card/index.vue`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------card/index.vue 修改成功-------------------');
    })
  })
}
// 读取 detail 变量并修改
function changeVarDetail(json) {
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/detail.vue`, (err, data) => {
    if (err) {
      console.error(err);
    }
    const dealData = customerReplaceColor(data.toString(), 'navigationBarBackgroundColor: "#\\w{6}"', '#5ECACE')
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/detail.vue`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------detail.vue 修改成功-------------------');
    })
  })
}
// 复制project.config.json
function copy() {

}

// 正则匹配修改颜色
function replaceColor(variables, reg, color) {
  const regs = new RegExp(reg + ': #\\w{6}')
  console.log(regs)
  variables = variables.replace(regs, ($1) => {
    console.log($1)
    return $1 = $1.replace(/#\w{6}/, ($2) => $2 = color)
  })
  // console.log(variables)
  return variables
}

// 自定义匹配修改颜色
function customerReplaceColor(variables, reg, color) {
  const regs = new RegExp(reg)
  console.log(regs)
  variables = variables.replace(regs, ($1) => {
    console.log($1)
    return $1 = $1.replace(/#\w{6}/, $2 => $2 = color)
  })
  // console.log(variables)
  return variables
}

// 匹配svg颜色
function replaceSvgColor(variables, reg, color) {
  const regs = new RegExp(reg + `="#\\w{6}"`, 'g')
  console.log('1', regs)
  variables = variables.replace(regs, ($1) => {
    console.log('$1', $1)
    return $1 = $1.replace(/#\w{6}/, ($2) => $2 = color)
  })
  console.log('2', variables)
  return variables
}

changeJson() //执行一下;
