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
  // 修改less
  changeVarLess(json);
  // 修改svg里面的颜色
  changeSvg(json)
})
function changeSvg(json) {
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/resource.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/resource.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------resource.svg 修改成功-------------------');
    })
  })
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/reservation.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/reservation.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------reservation.svg 修改成功-------------------');
    })
  })
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/vocation.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/vocation.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------vocation.svg 修改成功-------------------');
    })
  })
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/sample.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/sample.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------sample.svg 修改成功-------------------');
    })
  })
  fs.readFile(`${path.resolve(__dirname, '..')}/src/static/faq.svg`, (err, data) => {
    if (err) {
      console.error(err);
    }
    let dealData = data.toString()
    dealData = replaceSvgColor(dealData, 'fill', json.ext.primaryColor)
    fs.writeFile(`${path.resolve(__dirname, '..')}/src/static/faq.svg`, dealData, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------faq.svg 修改成功-------------------');
    })
  })
}
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
  console.log(1, regs)
  variables = variables.replace(regs, ($1) => {
    console.log('$1', $1)
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