/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-28 16:38:09
 * @LastEditros: 
 * @LastEditTime: 2021-07-01 16:25:56
 */
const { Controller } = require('egg');

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.serverRender = require('../public/umi.server');
  }
  async index() {
    const { ctx, app } = this;
    global.host = `${ctx.request.protocol}://${ctx.request.host}`;
    global.href = ctx.request.href;
    global._cookies = ctx.helper.parseCookie(ctx);
    global._navigatorLang = ctx.helper.parseNavLang(ctx);
    // console.log(ctx)

    // 先走 eggjs 的v iew 渲染
    const htmlTemplate = await ctx.view.render('index.html');

    // 将 html 模板传到服务端渲染函数中
    // console.log(app)
    const publicPath = ctx.helper.assets.resourceBase;
    const { error, html } = await this.serverRender({
      path: ctx.url,
      publicPath,
      getInitialPropsCtx: {},
      htmlTemplate,
    });

    if (error) {
      ctx.logger.error(
        '[SSR ERROR] 渲染报错，切换至客户端渲染',
        error,
        ctx.url,
      );
    }
    ctx.type = 'text/html';
    ctx.status = 200;
    ctx.body = html;
  }
}

module.exports = HomeController;
