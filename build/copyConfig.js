const fs = require('fs');
const path = require('path');
// 复制project.config.json
function copy() {
  fs.readFile(`${path.resolve(__dirname, '..')}/project.config.json`, (err, data) => {
    if (err) {
      console.error(err);
    }
    // buffer 转 JSON
    let json = data.toString();
    json = JSON.parse(json);
    delete json.miniprogramRoot
    //把数据读出来,然后进行修改
    json = JSON.stringify(json);
    fs.writeFile(`${path.resolve(__dirname, '..')}/dist/project.config.json`, json, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------project.config.json 复制到dist成功');
    })
  })
}
copy();
