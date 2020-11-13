module.exports = app=>{

  const router = require('express').Router()

  // 引入 Article 数据模型
  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')

  // 此接口用于录入新闻信息，web端不做调用
  router.get('/news/init',async(req,res)=>{

    const parent = await Category.findOne({name:'新闻分类'})

    const cats = await Category.find().where({
      // 找到新闻分类子分类数据
      parent:parent

    }).lean()

    const newsTitles = ["10月29日全服不停机更新公告", "六城共庆王者荣耀五周岁，同心筑梦祈福美好征程", "营地看庆典，福利大放送！赢荣耀水晶、内测皮肤等豪礼", "【王者共创荣耀盛典】海量精彩节目等你pick", "无限王者团携手宋茜 打破虚实演绎千面《镜城》", "吃喝玩购样样省钱，百城万店狂撒优惠", "皮肤铭文免费用，王者荣耀商户特权上新啦！", "请查收！来自【王者共创 荣耀盛典】的邀请函", "斗鱼主播邀你参与#王者土味情话#征集赢互动福利", "11月1日周年庆典活动奖励到账延迟说明", "10月29日全服不停机更新公告", "10月29日全服不停机更新公告", "10月28日体验服停机更新公告", "10月28日免费获取李小龙皮肤活动异常说明", "10月28日净化游戏环境声明及处罚公告", "10月28日外挂专项打击公告", "10月28日“演员”惩罚名单", "【美梦成真 抽内测皮肤】活动公告", "周年祈愿送永久英雄/皮肤", "王者共创，荣耀盛典，抽内测、赢永久、限定皮肤自选限时返场", "【手Q用户专属】周年庆返场皮肤免单活动", "【微信用户专属】微信小程序“游戏礼品站”购买返场皮肤抽免单活动", "五周岁庆典开启，限定皮肤李小龙免费得，还有限定皮肤返场等缤纷好礼", "获取荣耀共创卡 全英雄全皮肤翻出来", "【荣耀盛典 翻出全英雄皮肤】活动公告", "2020年秋冬赛事战令全新升级，终极奖励韩信星元皮肤等你拿！", "2020年KPL秋季赛9月16日热血开赛，主场地域化全面升级", "2020年KPL秋季赛热血来袭，线下售票9月7日12:00开启！", "2020年KGL秋季赛选手大名单公布，9月13日该我上场！", "2020年KPL秋季赛大名单公布", "王者荣耀电竞推出六大措施打造全民参与体验闭环", "2020年王者荣耀世界冠军杯总决赛门票8月10日正式开售", "8月7日【比赛服】版本更新公告"]
    
    const newsList = newsTitles.map(title=>{

      // 将分类中的数据打乱，slice(0)表示生成一个新数组
      const randomCats = cats.slice(0).sort((a,b)=>Math.random()-0.5)

      return {

        categories:randomCats.slice(0,2),

        title:title

      }

    })

    // 将文章清空 再插入数据
    await Article.deleteMany({})
    await Article.insertMany(newsList)

    res.send(newsList)
  })

  // 此接口用于录入英雄信息，web端不做调用
  router.get('/heroes/init',async(req,res)=>{
    // 先清空再插入
    await Hero.deleteMany({})

    const rawData = [
      {name:'坦克',heroes:[
        {
          "name":"阿古朵",
          "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"
        },
        {
            "name":"猪八戒",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
        },
        {
            "name":"嫦娥",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
        },
        {
            "name":"孙策",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
        },
        {
            "name":"梦奇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
        },
        {
            "name":"苏烈",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
        },
        {
            "name":"铠",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
        },
        {
            "name":"东皇太一",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
        },
        {
            "name":"太乙真人",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
        },
        {
            "name":"张飞",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
        },
        {
            "name":"牛魔",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
        },
        {
            "name":"亚瑟",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
        },
        {
            "name":"刘邦",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
        },
        {
            "name":"程咬金",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
        },
        {
            "name":"项羽",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
        },
        {
            "name":"达摩",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
        },
        {
            "name":"夏侯惇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
        },
        {
            "name":"吕布",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
        },
        {
            "name":"芈月",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
        },
        {
            "name":"白起",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
        },
        {
            "name":"钟无艳",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
        },
        {
            "name":"刘禅",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
        },
        {
            "name":"庄周",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
        },
        {
            "name":"廉颇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
        }
      ]},
      {name:'战士',heroes:[
        {
          "name":"阿古朵",
          "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"
        },
        {
            "name":"猪八戒",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
        },
        {
            "name":"嫦娥",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
        },
        {
            "name":"孙策",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
        },
        {
            "name":"梦奇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
        },
        {
            "name":"苏烈",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
        },
        {
            "name":"铠",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
        },
        {
            "name":"东皇太一",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
        },
        {
            "name":"太乙真人",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
        },
        {
            "name":"张飞",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
        },
        {
            "name":"牛魔",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
        },
        {
            "name":"亚瑟",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
        },
        {
            "name":"刘邦",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
        },
        {
            "name":"程咬金",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
        },
        {
            "name":"项羽",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
        },
        {
            "name":"达摩",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
        },
        {
            "name":"夏侯惇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
        },
        {
            "name":"吕布",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
        },
        {
            "name":"芈月",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
        },
        {
            "name":"白起",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
        },
        {
            "name":"钟无艳",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
        },
        {
            "name":"刘禅",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
        },
        {
            "name":"庄周",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
        },
        {
            "name":"廉颇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
        }
      ]},
      {name:'刺客',heroes:[
        {
          "name":"阿古朵",
          "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"
        },
        {
            "name":"猪八戒",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
        },
        {
            "name":"嫦娥",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
        },
        {
            "name":"孙策",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
        },
        {
            "name":"梦奇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
        },
        {
            "name":"苏烈",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
        },
        {
            "name":"铠",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
        },
        {
            "name":"东皇太一",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
        },
        {
            "name":"太乙真人",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
        },
        {
            "name":"张飞",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
        },
        {
            "name":"牛魔",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
        },
        {
            "name":"亚瑟",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
        },
        {
            "name":"刘邦",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
        },
        {
            "name":"程咬金",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
        },
        {
            "name":"项羽",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
        },
        {
            "name":"达摩",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
        },
        {
            "name":"夏侯惇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
        },
        {
            "name":"吕布",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
        },
        {
            "name":"芈月",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
        },
        {
            "name":"白起",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
        },
        {
            "name":"钟无艳",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
        },
        {
            "name":"刘禅",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
        },
        {
            "name":"庄周",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
        },
        {
            "name":"廉颇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
        }
      ]},
      {name:'法师',heroes:[
        {
          "name":"阿古朵",
          "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"
        },
        {
            "name":"猪八戒",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
        },
        {
            "name":"嫦娥",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
        },
        {
            "name":"孙策",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
        },
        {
            "name":"梦奇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
        },
        {
            "name":"苏烈",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
        },
        {
            "name":"铠",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
        },
        {
            "name":"东皇太一",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
        },
        {
            "name":"太乙真人",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
        },
        {
            "name":"张飞",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
        },
        {
            "name":"牛魔",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
        },
        {
            "name":"亚瑟",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
        },
        {
            "name":"刘邦",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
        },
        {
            "name":"程咬金",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
        },
        {
            "name":"项羽",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
        },
        {
            "name":"达摩",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
        },
        {
            "name":"夏侯惇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
        },
        {
            "name":"吕布",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
        },
        {
            "name":"芈月",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
        },
        {
            "name":"白起",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
        },
        {
            "name":"钟无艳",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
        },
        {
            "name":"刘禅",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
        },
        {
            "name":"庄周",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
        },
        {
            "name":"廉颇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
        }
      ]},
      {name:'射手',heroes:[
        {
          "name":"阿古朵",
          "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"
        },
        {
            "name":"猪八戒",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
        },
        {
            "name":"嫦娥",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
        },
        {
            "name":"孙策",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
        },
        {
            "name":"梦奇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
        },
        {
            "name":"苏烈",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
        },
        {
            "name":"铠",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
        },
        {
            "name":"东皇太一",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
        },
        {
            "name":"太乙真人",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
        },
        {
            "name":"张飞",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
        },
        {
            "name":"牛魔",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
        },
        {
            "name":"亚瑟",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
        },
        {
            "name":"刘邦",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
        },
        {
            "name":"程咬金",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
        },
        {
            "name":"项羽",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
        },
        {
            "name":"达摩",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
        },
        {
            "name":"夏侯惇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
        },
        {
            "name":"吕布",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
        },
        {
            "name":"芈月",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
        },
        {
            "name":"白起",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
        },
        {
            "name":"钟无艳",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
        },
        {
            "name":"刘禅",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
        },
        {
            "name":"庄周",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
        },
        {
            "name":"廉颇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
        }
      ]},
      {name:'辅助',heroes:[
        {
          "name":"阿古朵",
          "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"
        },
        {
            "name":"猪八戒",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
        },
        {
            "name":"嫦娥",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
        },
        {
            "name":"孙策",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
        },
        {
            "name":"梦奇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
        },
        {
            "name":"苏烈",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
        },
        {
            "name":"铠",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
        },
        {
            "name":"东皇太一",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
        },
        {
            "name":"太乙真人",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
        },
        {
            "name":"张飞",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
        },
        {
            "name":"牛魔",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
        },
        {
            "name":"亚瑟",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
        },
        {
            "name":"刘邦",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
        },
        {
            "name":"程咬金",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
        },
        {
            "name":"项羽",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
        },
        {
            "name":"达摩",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
        },
        {
            "name":"夏侯惇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
        },
        {
            "name":"吕布",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
        },
        {
            "name":"芈月",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
        },
        {
            "name":"白起",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
        },
        {
            "name":"钟无艳",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
        },
        {
            "name":"刘禅",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
        },
        {
            "name":"庄周",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
        },
        {
            "name":"廉颇",
            "avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
        }
      ]}
    ]
    for (const cat of rawData) {

      if(cat.name==='热门'){
        continue
      }
      // 找到英雄所属的分类
      const category = await Category.findOne({
        name:cat.name
      })

      cat.heroes = cat.heroes.map(hero=>{

        hero.categories = [category]

        return hero
      })

      // 插入数据
      await Hero.insertMany(cat.heroes)

    }

    res.send(await Hero.find())

  })  

  // 新闻列表
  router.get('/news/list',async(req,res)=>{

    // 这种方式有局限性，换一种
    // const parent = await Category.findOne({
    //   name:'新闻分类'
    // }).populate({
    //   path:'children',
    //   populate:{
    //     path:'newsList'
    //   }
    // }).lean()

    const parent = await Category.findOne({name:'新闻分类'})

    // 聚合管道查询
    const cats = await Category.aggregate([
      { $match: {parent: parent._id} },
      {
        $lookup:{
          from:'articles',// 这里为数据模型对应的集合名称
          localField:'_id',
          foreignField:'categories',
          as:'newsList'

        }
      },
      {
        $addFields:{
          newsList:{
            $slice:['$newsList',5]
          }
        }
      }
    ])

    // 获取热门分类
    const subCats = cats.map(v=>v._id)
    cats.unshift({
      name:'热门',
      newsList:await Article.find().where({
        categories:{$in:subCats}  
      }).populate('categories').limit(5).lean()
    })

    // 组装前端所需数据
    cats.map(cat=>{

      cat.newsList.map(news=>{

        news.categoryName = cat.name === '热门'? news.categories[0].name:cat.name

        return news
      })

      return cat
    })

    res.send(cats)

  })

   // 英雄列表
   router.get('/heroes/list',async(req,res)=>{

    const parent = await Category.findOne({name:'英雄分类'})

    // 聚合管道查询
    const cats = await Category.aggregate([
      { $match: {parent: parent._id} },
      {
        $lookup:{
          from:'heroes',// 这里为数据模型对应的集合名称
          localField:'_id',
          foreignField:'categories',
          as:'heroList'

        }
      }
    ])

    // 获取热门英雄
    const subCats = cats.map(v=>v._id)
    cats.unshift({
      name:'热门',
      heroList:await Hero.find().where({
        categories:{$in:subCats}  
      }).limit(10).lean()
    })


    res.send(cats)

  })

  // 文章详情
  router.get('/articles/:id',async(req,res)=>{

    const data = await Article.findById(req.params.id).lean()

    data.related = await Article.find().where({
        categories:{$in:data.categories}
    }).limit(2)

    res.send(data)
  })

  // 英雄详情
  router.get('/heroes/:id',async(req,res)=>{

    const data =  await Hero.findById(req.params.id).populate('categories').lean()


    res.send(data)
  })

  app.use('/web/api',router)
}