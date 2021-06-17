/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-06-17 09:50:11
 * @LastEditros: 
 * @LastEditTime: 2021-06-17 16:08:09
 */
const Subscription = require('egg').Subscription;
const { SitemapStream, streamToPromise } = require( 'sitemap' )
const fs  = require('fs')
const fetch = require('node-fetch')
const dayjs = require('dayjs')
const { Readable } = require( 'stream' )
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  page = 1
  links = [
    {
      url: '/',
      changefreq: 'monthly',
      priority: 0.3
    }
  ]


  static get schedule() {
    return {
      cron: '0 0 0 * * *', // 每天晚上0点 0分 定时执行
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  async getListByPage () {
      const res = await fetch(`https://blog.laughingzhu.cn/front/blog/get_list?page=${this.page}&per_page=10`)
      const result = await res.json()

      if(result.data.page_count >= this.page) {
        for (let i = 0; i < result.data.list.length; i ++) {
          this.links.push({
            url: `/detail/${result.data.list[i].id}`,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: dayjs.unix(result.data.list[i].updated_at).utc(true).format()
          })          
        }

        if(this.page === result.data.page_count) return false;

        ++this.page
        return await this.getListByPage(this.page)
      }
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe () {

    await this.getListByPage()
    let stream = new SitemapStream({
      hostname: 'https://laughingzhu.cn',
      cacheTime: 600000, // 600sec, cache purge period
    });
    return streamToPromise(Readable.from(this.links).pipe(stream)).then((data) =>
      
      fs.writeFileSync("app/public/sitemap.xml", data.toString())
    )

    // const res = await this.ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });

    // this.ctx.app.cache = res.data;
  }
}

module.exports = UpdateCache;