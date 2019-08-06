import * as Koa from 'koa'
import * as serve from 'koa-static'
import * as Router from 'koa-router'
import render from './render'

const app = new Koa()
const router = new Router()

interface Context {
  status?: number,
  url?: string
}

router.get('*', async (ctx: any) => {
  const { url } = ctx
  const context:Context = {}
  const html: string = await render(url, context)
  console.log(context)
  if (context.status) {
    ctx.status = 301
    ctx.redirect(context.url)
    ctx.body = `Redirecting to ${context.url}`
  } else {
    ctx.set("Content-type", "text/html;charset=UTF-8")
    ctx.body = html
  }
})

app
  .use(serve('dist/client'))
  .use(serve('public'))
  .use(router.routes())
  .listen(23900, () => {
    console.log('Running on http://localhost:23900/')
  })
