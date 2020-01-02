class CardSettings {
  constructor(settings) {
    this.settings = settings
    this.settingMap = {
      'normal': {
        width: 345,
        height: 408,
        views: [{
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/e8a032f928f14442b749765fc4511980.png',
            top: 0,
            left: 0,
            width: 345,
            height: 408
          },
          {
            type: 'image',
            url: this.settings.avatar,
            top: 17,
            left: 24,
            width: 60,
            height: 60
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180903/976f9a82b45a4893a78341856f2e55bf.png',
            top: 17,
            left: 24,
            width: 60,
            height: 60
          },
          {
            type: 'text',
            content: this.settings.name,
            fontSize: 16,
            color: '#333',
            textAlign: 'right',
            top: 20,
            left: 320,
            bolder: true
          },
          {
            type: 'text',
            content: this.settings.position,
            fontSize: 12,
            color: '#999999',
            textAlign: 'right',
            top: 45,
            left: 320
          },
          {
            type: 'text',
            content: this.settings.company,
            fontSize: 12,
            color: '#999999',
            textAlign: 'right',
            top: 65,
            left: 320
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180903/54bf4fe814b74c35b61e9cccd1f207fc.png',
            top: 145,
            left: 26,
            width: 10,
            height: 10
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180903/d8ff3145474c437eab8f6221eebea309.png',
            top: 165,
            left: 26,
            width: 10,
            height: 10
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180903/79aff3dd50194135a907ed5e2f1bf135.png',
            top: 185,
            left: 26,
            width: 10,
            height: 10
          },
          {
            type: 'text',
            content: this.settings.mobile,
            fontSize: 12,
            color: '#89A9CC',
            textAlign: 'left',
            top: 141,
            left: 45
          },
          {
            type: 'text',
            content: this.settings.mail || '暂无邮箱',
            fontSize: 12,
            color: '#89A9CC',
            textAlign: 'left',
            top: 161,
            left: 45
          },
          {
            type: 'text',
            content: this.settings.address || '暂无地址',
            fontSize: 12,
            color: '#89A9CC',
            textAlign: 'left',
            top: 181,
            left: 45
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180920/345ebcb024974c249bf5595b884c0b8a.png',
            top: 250,
            left: 145,
            width: 60,
            height: 60
          },
          {
            type: 'text',
            content: '二维码功能暂未开放',
            fontSize: 12,
            color: '#CCCCCC',
            textAlign: 'left',
            top: 340,
            left: 126
          }
        ]
      },
      'card-1': {
        width: 345,
        height: 500,
        views: [{
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png',
            top: 0,
            left: 0,
            width: 345,
            height: 500
          },
          {
            type: 'image',
            url: `${this.settings.avatar}?x-oss-process=image/resize,m_fill,h_370,w_325`,
            top: 10,
            left: 10,
            width: 325,
            height: 370
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180911/249a16cb424b46ad82d7acd2497e49ff.png',
            top: 248,
            left: 25,
            width: 183,
            height: 100
          },
          {
            type: 'text',
            content: this.settings.name || '暂无',
            fontSize: 28,
            color: '#ffffff',
            textAlign: 'left',
            top: 253,
            left: 34,
            bolder: false
          },
          {
            type: 'text',
            content: this.settings.position || '暂无',
            fontSize: 16,
            color: '#ffffff',
            textAlign: 'left',
            top: 295,
            left: 34
          },
          {
            type: 'text',
            content: this.settings.company || '暂无',
            fontSize: 16,
            color: '#ffffff',
            textAlign: 'left',
            top: 319,
            left: 34
          },
          {
            type: 'text',
            content: this.settings.mobile || '暂无',
            fontSize: 12,
            color: '#333',
            textAlign: 'left',
            top: 410,
            left: 10
          },
          {
            type: 'text',
            content: this.settings.mail || '暂无邮箱',
            fontSize: 12,
            color: '#333',
            textAlign: 'left',
            top: 436,
            left: 10
          },
          {
            type: 'text',
            content: this.settings.address || '暂无地址',
            fontSize: 12,
            color: '#333',
            textAlign: 'left',
            top: 461,
            left: 10
          },
          {
            type: 'image',
            url: this.settings.wxappQrCode,
            top: 401,
            left: 239,
            width: 87,
            height: 84
          }
        ]
      },
      'card-2': {
        width: 345,
        height: 500,
        views: [{
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png',
            top: 0,
            left: 0,
            width: 345,
            height: 500
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180926/bb43cc23b3504a5db7bd3a66352bf808.png',
            top: 0,
            left: 0,
            width: 345,
            height: 400
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png?x-oss-process=image/resize,m_fill,h_95,w_95/circle,r_95/format,png',
            top: 36,
            left: 125,
            width: 95,
            height: 95
          },
          {
            type: 'image',
            url: `${this.settings.avatar}?x-oss-process=image/resize,m_fill,h_90,w_90/circle,r_90/format,png`,
            top: 39,
            left: 128,
            width: 90,
            height: 90
          },
          {
            type: 'text',
            content: this.settings.name || '暂无',
            fontSize: 28,
            color: '#ffffff',
            textAlign: 'center',
            top: 140,
            left: 175,
            bolder: false
          },
          {
            type: 'text',
            content: this.settings.position || '暂无',
            fontSize: 12,
            color: '#ffffff',
            textAlign: 'center',
            top: 180,
            left: 175
          },
          {
            type: 'text',
            content: this.settings.mobile || '暂无',
            fontSize: 18,
            color: '#ffffff',
            textAlign: 'center',
            top: 205,
            left: 175
          },
          {
            type: 'text',
            content: this.settings.mail || '暂无邮箱',
            fontSize: 14,
            color: '#ffffff',
            textAlign: 'center',
            top: 262,
            left: 175
          },
          {
            type: 'text',
            content: this.settings.address || '暂无地址',
            fontSize: 14,
            color: '#ffffff',
            textAlign: 'center',
            top: 280,
            left: 175
          },
          {
            type: 'text',
            content: this.settings.company || '暂无',
            fontSize: 14,
            color: '#ffffff',
            textAlign: 'center',
            top: 360,
            left: 175
          },
          {
            type: 'image',
            url: this.settings.wxappQrCode,
            top: 406,
            left: 239,
            width: 87,
            height: 84
          }
        ]
      },
      'card-3': {
        width: 345,
        height: 500,
        views: [{
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png',
            top: 0,
            left: 0,
            width: 345,
            height: 500
          },
          {
            type: 'image',
            url: `${this.settings.avatar}?x-oss-process=image/resize,m_fill,h_325,w_300`,
            top: 15,
            left: 23,
            width: 300,
            height: 325
          },
          {
            type: 'text',
            content: this.settings.name || '暂无',
            fontSize: 18,
            color: '#333',
            textAlign: 'left',
            top: 350,
            left: 23,
            bolder: false
          },
          {
            type: 'text',
            content: this.settings.position || '暂无',
            fontSize: 12,
            color: '#999999',
            textAlign: 'left',
            top: 357,
            left: this.settings.name.length * 20.5 + 23
          },
          {
            type: 'text',
            content: this.settings.mobile || '暂无',
            fontSize: 14,
            color: '#333',
            textAlign: 'left',
            top: 377,
            left: 23
          },
          {
            type: 'text',
            content: this.settings.company || '暂无',
            // content: '啊实打实大阿萨德爱尚',
            fontSize: 12,
            color: '#333',
            textAlign: 'right',
            top: 420,
            left: 322
          },
          {
            type: 'text',
            content: this.settings.mail || '暂无邮箱',
            fontSize: 12,
            color: '#333',
            textAlign: 'right',
            top: 440,
            left: 322
          },
          {
            type: 'text',
            content: this.settings.address || '暂无地址',
            fontSize: 12,
            color: '#333',
            textAlign: 'right',
            top: 460,
            left: 322
          },
          {
            type: 'image',
            url: this.settings.wxappQrCode,
            top: 406,
            left: 23,
            width: 87,
            height: 84
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180926/798822c5c58f4f439124c9689b3bc0a8.png?x-oss-process=image/resize,m_fill,h_142,w_59',
            top: 355,
            left: 265,
            width: 59,
            height: 142
          }
        ]
      },
      'card-4': {
        width: 345,
        height: 500,
        views: [{
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png',
            top: 0,
            left: 0,
            width: 345,
            height: 500
          },
          {
            type: 'image',
            url: `${this.settings.avatar}?x-oss-process=image/resize,m_fill,h_244,w_225`,
            top: 20,
            left: 14,
            width: 225,
            height: 244
          },
          {
            type: 'image',
            url: `https://img.esenyun.com/images/20180926/993d7c2c5d8243ce8293754f4e0cda9e.png`,
            top: 0,
            left: 265,
            width: 80,
            height: 80
          },
          {
            type: 'image',
            url: `https://img.esenyun.com/images/20180926/b79f0e9277f643138998d2b9a771e62e.png`,
            top: 275,
            left: 0,
            width: 80,
            height: 80
          },
          {
            type: 'text',
            content: this.settings.name || '暂无',
            fontSize: 28,
            color: '#333',
            textAlign: 'left',
            top: 70,
            left: 280,
            width: 25,
            lineHeight: 35,
            MaxLineNumber: 10,
            breakWord: true,
            bolder: false
          },
          {
            type: 'text',
            content: this.settings.position || '暂无',
            fontSize: 14,
            color: '#999999',
            textAlign: 'left',
            width: 10,
            lineHeight: 20,
            MaxLineNumber: 10,
            breakWord: true,
            top: this.settings.name.length * 38.3 + 70,
            left: 286
          },
          {
            type: 'text',
            content: this.settings.mobile || '暂无',
            fontSize: 14,
            color: '#333',
            textAlign: 'right',
            top: 300,
            left: 322
          },
          {
            type: 'text',
            content: this.settings.company || '暂无',
            fontSize: 12,
            color: '#333',
            textAlign: 'right',
            top: 325,
            left: 322
          },
          {
            type: 'text',
            content: this.settings.mail || '暂无邮箱',
            fontSize: 12,
            color: '#333',
            textAlign: 'right',
            top: 350,
            left: 322
          },
          {
            type: 'text',
            content: this.settings.address || '暂无地址',
            fontSize: 12,
            color: '#333',
            textAlign: 'right',
            top: 375,
            left: 322
          },
          {
            type: 'image',
            url: this.settings.wxappQrCode,
            top: 406,
            left: 240,
            width: 87,
            height: 84
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180926/573e3a4b01794405b444adf176d687e9.png',
            top: 419,
            left: 20,
            width: 59,
            height: 80
          }
        ]
      },
      'card-5': {
        width: 345,
        height: 500,
        views: [{
            type: 'image',
            url: 'https://img.esenyun.com/images/20180926/4d813aca108642c6a05461f41f82a79f.png',
            top: 0,
            left: 0,
            width: 345,
            height: 500
          },
          {
            type: 'image',
            url: `${this.settings.avatar}?x-oss-process=image/resize,m_fill,h_75,w_75/circle,r_75/format,png`,
            top: 57,
            left: 245,
            width: 75,
            height: 75
          },
          {
            type: 'text',
            content: this.settings.name || '暂无',
            fontSize: 28,
            color: '#333',
            textAlign: 'right',
            top: 150,
            left: 310,
            bolder: false
          },
          {
            type: 'text',
            content: this.settings.position || '暂无',
            fontSize: 16,
            color: '#333',
            textAlign: 'right',
            top: 190,
            left: 310
          },
          {
            type: 'text',
            content: this.settings.mobile || '暂无',
            fontSize: 12,
            color: '#333',
            textAlign: 'right',
            top: 215,
            left: 310
          },
          {
            type: 'text',
            content: this.settings.mail || '暂无邮箱',
            fontSize: 12,
            color: '#333',
            textAlign: 'left',
            top: 335,
            left: 15
          },
          {
            type: 'text',
            content: this.settings.address || '暂无地址',
            fontSize: 12,
            color: '#333',
            textAlign: 'leftleft',
            top: 360,
            left: 15
          },
          {
            type: 'text',
            content: this.settings.company || '暂无',
            fontSize: 12,
            color: '#333',
            textAlign: 'left',
            top: 385,
            left: 15
          },
          {
            type: 'image',
            url: this.settings.wxappQrCode,
            top: 406,
            left: 230,
            width: 87,
            height: 84
          }
        ]
      },
      'card-6': {
        width: 345,
        height: 500,
        views: [{
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png',
            top: 0,
            left: 0,
            width: 345,
            height: 500
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180926/9d3a23cf0bb34e689fd56b32d94baf84.png',
            top: 0,
            left: 0,
            width: 345,
            height: 395
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png',
            top: 38,
            left: 228,
            width: 95,
            height: 95
          },
          {
            type: 'image',
            url: `${this.settings.avatar}?x-oss-process=image/resize,m_fill,h_90,w_90`,
            top: 40,
            left: 230,
            width: 90,
            height: 90
          },
          {
            type: 'text',
            content: this.settings.name || '暂无',
            fontSize: 28,
            color: '#fff',
            textAlign: 'right',
            top: 145,
            left: 322,
            bolder: false
          },
          {
            type: 'text',
            content: this.settings.mobile || '暂无',
            fontSize: 18,
            color: '#fff',
            textAlign: 'right',
            top: 195,
            left: 322
          },
          {
            type: 'text',
            content: this.settings.position || '暂无',
            fontSize: 12,
            color: '#fff',
            textAlign: 'right',
            top: 230,
            left: 322
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20181010/ebfdb49d70564f7d99bfe88ba89a482c.png',
            top: 300,
            left: 20,
            width: 18,
            height: 18
          },
          {
            type: 'text',
            content: this.settings.mail || '暂无邮箱',
            fontSize: 12,
            color: '#fff',
            textAlign: 'left',
            top: 300,
            left: 45
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20181010/d4fde64543754e0e8f761f9a0f5cffb0.png',
            top: 325,
            left: 20,
            width: 18,
            height: 18
          },
          {
            type: 'text',
            content: this.settings.address || '暂无',
            fontSize: 14,
            color: '#fff',
            textAlign: 'left',
            top: 325,
            left: 45
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20181010/a51416a5b2e94e15a253441dc004c130.png',
            top: 352,
            left: 20,
            width: 18,
            height: 18
          },
          {
            type: 'text',
            content: this.settings.company || '暂无地址',
            fontSize: 12,
            color: '#fff',
            textAlign: 'left',
            top: 352,
            left: 45
          },
          {
            type: 'image',
            url: this.settings.wxappQrCode,
            top: 406,
            left: 240,
            width: 87,
            height: 84
          }
        ]
      },
      'card-7': {
        width: 345,
        height: 500,
        views: [{
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png',
            top: 0,
            left: 0,
            width: 345,
            height: 500
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180926/2045e7d715cc408dbbc9ea72b1db723a.png',
            top: 10,
            left: 10,
            width: 325,
            height: 385
          },
          {
            type: 'image',
            url: 'https://img.esenyun.com/images/20180906/19c57ca407264d0a8da8e9fa13536dda.png?x-oss-process=image/resize,m_fill,h_94,w_94/circle,r_94/format,png',
            top: 37,
            left: 25,
            width: 94,
            height: 94
          },
          {
            type: 'image',
            url: `${this.settings.avatar}?x-oss-process=image/resize,m_fill,h_90,w_90/circle,r_90/format,png`,
            top: 39,
            left: 27,
            width: 90,
            height: 90
          },
          {
            type: 'text',
            content: this.settings.name || '暂无',
            fontSize: 28,
            color: '#fff',
            textAlign: 'left',
            top: 140,
            left: 58,
            width: 25,
            lineHeight: 35,
            MaxLineNumber: 10,
            breakWord: true,
            bolder: false
          },
          {
            type: 'text',
            content: this.settings.position || '暂无',
            fontSize: 14,
            color: '#fff',
            textAlign: 'right',
            top: 295,
            left: 320
          },
          {
            type: 'text',
            content: this.settings.mobile || '暂无',
            fontSize: 14,
            color: '#fff',
            textAlign: 'right',
            top: 325,
            left: 320
          },
          {
            type: 'text',
            content: this.settings.company || '暂无',
            fontSize: 16,
            color: '#fff',
            textAlign: 'right',
            top: 355,
            left: 320
          },
          {
            type: 'text',
            content: this.settings.mail || '暂无邮箱',
            fontSize: 12,
            color: '#333',
            textAlign: 'left',
            top: 420,
            left: 12
          },
          {
            type: 'text',
            content: this.settings.address || '暂无地址',
            fontSize: 12,
            color: '#333',
            textAlign: 'left',
            top: 450,
            left: 12
          },
          {
            type: 'image',
            url: this.settings.wxappQrCode,
            top: 405,
            left: 239,
            width: 87,
            height: 84
          }
        ]
      },
    }
  }
  outPutPicSettings(type) {
    if (!this.settings.wxappQrCode) {
      this.settingMap[type].views.pop()
    }
    console.log(this.settingMap[type])
    return this.settingMap[type]
  }
}

export default CardSettings
