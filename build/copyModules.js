const fs = require('fs');
const path = require('path');

const pages = [
  {
    name: 'canvas',
    path: 'card'
  },
  {
    name: 'choose',
    path: 'card'
  },
  {
    name: 'createCard',
    path: 'card'
  },
  {
    name: 'detail',
    path: 'card'
  },
  {
    name: 'groupDetail',
    path: 'card'
  },
  {
    name: 'index',
    path: 'card'
  },
  {
    name: 'mycard',
    path: 'card'
  },
  {
    name: 'personal',
    path: 'card'
  },
  {
    name: 'teamSpecific',
    path: 'card'
  },
  {
    name: 'thank',
    path: 'card'
  },
  {
    name: 'thankChoose',
    path: 'card'
  },
  {
    name: 'thankDetail',
    path: 'card'
  },
  {
    name: 'thankList',
    path: 'card'
  },
  {
    name: 'underMore',
    path: 'card'
  },
  {
    name: 'userPhone',
    path: 'card'
  }
]
const components = ['canvasDraw', 'card', 'cardList', 'swiperCard']
const share = ['picSettings']

/**
 *  移动文件到page
 *
 * @param {string} item  文件名
 */
function copyPage(item) {
  fs.writeFileSync(`${path.resolve(__dirname, '..')}/src/pages/${item.path}/${item.name}.vue`, fs.readFileSync(`${path.resolve(__dirname, '..')}/node_modules/esen-vcard/${item.name}.vue`))
  console.log(`${item.name} 页面移动完成`)
}

/**
 *  移动文件到components
 *
 * @param {string} name  文件名
 */
function copyComponent(name) {
  fs.writeFileSync(`${path.resolve(__dirname, '..')}/src/components/${name}.vue`, fs.readFileSync(`${path.resolve(__dirname, '..')}/node_modules/esen-vcard/${name}.vue`))
  console.log(`${name} 组件移动完成`)
}
/**
 *  移动文件到share
 *
 * @param {string} name  文件名
 */
// function copyShare(name) {
//   fs.writeFileSync(`${path.resolve(__dirname, '..')}/src/share/${name}.js`, fs.readFileSync(`${path.resolve(__dirname, '..')}/node_modules/esen-vcard/${name}.js`))
//   console.log(`${name} 组件移动完成`)
// }


function mkdir() {
  const dirPath = `${path.resolve(__dirname, '..')}/src/pages/card`
  fs.exists(dirPath, function (exists) {
    if (!exists) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log('创建文件夹出错！');
        } else {
          for (let index = 0; index < pages.length; index++) {
            const element = pages[index]
            copyPage(element)
          }
          for (let index = 0; index < components.length; index++) {
            const element = components[index]
            copyComponent(element)
          }
          for (let index = 0; index < share.length; index++) {
            const element = share[index]
            // copyShare(element)
          }
        }
      });
      console.log('不存在')
    } else {
      console.log('文件夹-已存在！');
      for (let index = 0; index < pages.length; index++) {
        const element = pages[index]
        copyPage(element)
      }
      for (let index = 0; index < components.length; index++) {
        const element = components[index]
        copyComponent(element)
      }
      for (let index = 0; index < share.length; index++) {
        const element = share[index]
        // copyShare(element)
      }
    }
  });
}

mkdir()
