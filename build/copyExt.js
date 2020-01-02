const fs = require('fs');
const path = require('path');

// ext.json
fs.readFile(`${path.resolve(__dirname, '..')}/ext-${process.argv[2]}.json`, (err, data) => {
  if (err) {
    console.error(err);
  }
  // buffer 转 JSON
  let json = data.toString();
  json = JSON.parse(json);
  // console.log('fs', json, 'json---', `${path.resolve(__dirname, '..')}/ext-${process.argv[2]}.json`)
  // // 修改appId
  // json.extAppid = process.argv[2] ? process.argv[2] : ''
  // json.ext.appId = process.argv[2] ? process.argv[2] : ''
  // 修改less
  // changeVarLess(json);
  // changeVarIndex(json);
  // changeVarDetail(json);
  // cardDetail(json);
  // cardMycard(json);
  // cardPersonal(json);
  // cardThank(json);
  // changeVarCardIndex(json);
  // 把数据读出来,然后进行修改
  json = JSON.stringify(json);
  fs.writeFile(`${path.resolve(__dirname, '..')}/dist/build/mp-weixin/ext.json`, json, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('--------------------ext.json 修改成功-------------------');
  })
})

// 读取 less 变量并修改
function changeVarLess(json) {
  fs.readFile(`${path.resolve(__dirname, '..')}/src/common/less/variables.less`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
      // .replace('#29ab91', json.ext.primaryColor)
      // .replace('#eef9f7', json.ext.backgroundColorTag)
      // .replace('#34b59d', json.ext.primaryColorSup)
      // .replace('#64dbcc', json.ext.transFormColor)
    dealData = replaceColor(dealData, '@primary-color', json.ext.primaryColor)
    dealData = replaceColor(dealData, '@background-color-sup-3', json.ext.backgroundColorTag)
    dealData = replaceColor(dealData, '@primary-color-sup-1', json.ext.primaryColorSup)
    dealData = replaceColor(dealData, '@tranform-color', json.ext.transFormColor)
    // console.log(dealData)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/common/less/variables.less`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------variables.less 修改成功-------------------');
    })
  })
}
// 读取 index 变量并修改
function changeVarIndex(json) {
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/index.vue`, (err, data) => {
    if (err) {
      console.error(err);
    }
    const dealData = customerReplaceColor(data.toString(), color="#\\w{6}", json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/index.vue`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------index.vue 修改成功-------------------');
    })
  })
}
// 读取 pages/card/index 变量并修改
function changeVarCardIndex(json) {
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/card/index.vue`, (err, data) => {
    if (err) {
      console.error(err);
    }
    const dealData = customerReplaceColor(data.toString(), 'color="#\\w{6}"', json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/card/index.vue`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------card/index.vue 修改成功-------------------');
    })
    // const navdealData = navcustomerReplaceColor(data.toString(), 'navigationBarBackgroundColor: "#\\w{6}"', json.ext.primaryColorSup)
    // console.log(navdealData)
    // fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/card/index.vue`, navdealData, function (err) {
    //   if (err) {
    //     console.error(err);
    //   }
    //   console.log('--------------------card_nav/index.vue 修改成功-------------------');
    // })
  })
} 
// 读取 pages/card/index 头部 变量并修改
function changeVarDetail(json) {
  console.log('--------1')
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/card/index.vue`, (err, data) => {
    console.log('--------2')
    if (err) {
      console.error(err);
    }
    const dealData = customerReplaceColor(data.toString(), 'color="#\\w{6}"', json.ext.primaryColor)
    const navdealData = customerReplaceColor(dealData, "navigationBarBackgroundColor: '#\\w{6}'", json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/card/index.vue`, navdealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------card_nav/index.vue 修改成功-------------------');
    })
  })
}
// 读取 pages/card/detail 头部 变量并修改
function cardDetail(json) {
  console.log('--------1')
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/card/detail.vue`, (err, data) => {
    console.log('--------2')
    if (err) {
      console.error(err);
    }
    const dealData = customerReplaceColor(data.toString(), 'color="#\\w{6}"', json.ext.primaryColor)
    const navdealData = customerReplaceColor(dealData, "navigationBarBackgroundColor: '#\\w{6}'", json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/card/detail.vue`, navdealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------card_nav/detail.vue 修改成功-------------------');
    })
  })
}
// 读取 pages/card/personal 头部 变量并修改
function cardPersonal(json) {
  console.log('--------1')
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/card/personal.vue`, (err, data) => {
    console.log('--------2')
    if (err) {
      console.error(err);
    }
    // const dealData = customerReplaceColor(data.toString(), 'color="#\\w{6}"', json.ext.primaryColor)
    const navdealData = customerReplaceColor(data.toString(), "navigationBarBackgroundColor: '#\\w{6}'", json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/card/personal.vue`, navdealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------card_nav/personal.vue 修改成功-------------------');
    })
  })
}
// 读取 pages/card/mycard 头部 变量并修改
function cardMycard(json) {
  console.log('--------1')
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/card/mycard.vue`, (err, data) => {
    console.log('--------2')
    if (err) {
      console.error(err);
    }
    // const dealData = customerReplaceColor(data.toString(), 'color="#\\w{6}"', json.ext.primaryColor)
    const navdealData = customerReplaceColor(data.toString(), "navigationBarBackgroundColor: '#\\w{6}'", json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/card/mycard.vue`, navdealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------card_nav/mycard.vue 修改成功-------------------');
    })
  })
}
// 读取 pages/card/thank 头部 变量并修改
function cardThank(json) {
  console.log('--------1')
  fs.readFile(`${path.resolve(__dirname, '..')}/src/pages/card/thank.vue`, (err, data) => {
    console.log('--------2')
    if (err) {
      console.error(err);
    }
    // const dealData = customerReplaceColor(data.toString(), 'color="#\\w{6}"', json.ext.primaryColor)
    const navdealData = customerReplaceColor(data.toString(), "navigationBarBackgroundColor: '#\\w{6}'", json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/pages/card/thank.vue`, navdealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------card_nav/thank.vue 修改成功-------------------');
    })
  })
}

// 正则匹配修改颜色
function replaceColor(variables, reg, color) {
  const regs = new RegExp(reg + ': #\\w{6}', 'g')
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
  console.log(1, regs)
  variables = variables.replace(regs, ($1) => {
    console.log('$1', $1)
    return $1 = $1.replace(/#\w{6}/, $2 => $2 = color)
  })
  // console.log(variables)
  return variables
}

// 自定义匹配修改nav头部颜色
function navcustomerReplaceColor(variables, reg, color) {
  const newcolor = `'${color}'`
  console.log('--------3', newcolor)
  const regs = new RegExp(reg)
  console.log(2, regs)
  variables = variables.replace(regs, ($1) => {
    console.log('nav-$1', $1)
    console.log('---', $1.replace(/'#\w{6}'/, $2 => $2 = newcolor))
    return $1 = $1.replace(/'#\w{6}'/, $2 => $2 = newcolor)
  })
  // console.log(variables)
  return variables
}