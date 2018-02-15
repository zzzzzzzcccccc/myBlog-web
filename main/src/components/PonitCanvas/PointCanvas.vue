<template>
  <canvas id="canvas"></canvas>
</template>

<script>
  export default {
    props: {
      lineColor: {
        type: String,
        default: '#333'
      },
      pointColor: {
        type: String,
        default: '#333'
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        const { lineColor, pointColor } = this
        const canvas = document.querySelector('#canvas')
        const ctx = canvas.getContext('2d')
        const ware = { x: null, y: null, max: 20000 }
        const dots = []
        let nDots
        const resize = () => {
          canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
        const setXY = () => {
          window.onmousemove = (e) => {
            e = e || window.event
            ware.x = e.clientX
            ware.y = e.clientY
          }
          window.onmouseout = (e) => {
            ware.x = null
            ware.y = null
          }
        }
        const setDots = () => {
          for (let i = 0; i < 300; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const xa = Math.random() * 2 - 1
            const ya = Math.random() * 2 - 1
            const max = parseInt(canvas.width * 2)

            dots.push({ x, y, xa, ya, max })
          }
        }
        const RAF = (function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60)
          }
        })()
        const animate = () => {
          nDots = [ware].concat(dots)
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          dots.forEach((dot) => {
            // 粒子位移
            dot.x += dot.xa
            dot.y += dot.ya
            // 遇到边界将加速度反向
            dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1
            dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1
            // 绘制点
            ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1)
            ctx.fillStyle = pointColor
            // 循环比对粒子间的距离
            for (let i = 0; i < nDots.length; i++) {
              const d2 = nDots[i]

              if (dot === d2 || d2.x === null || d2.y === null) continue

              const xc = dot.x - d2.x
              const yc = dot.y - d2.y
              // 两个粒子之间的距离
              const dis = xc * xc + yc * yc
              // 距离比
              let ratio

              if (dis <  d2.max) {
                // 如果是鼠标，则让粒子向鼠标的位置移动
                if (d2 === ware && dis > (d2.max / 2)) {
                  dot.x -= xc * 0.03
                  dot.y -= yc * 0.03
                }
                // 计算距离比
                ratio = (d2.max - dis) / d2.max
                // 画线
                ctx.beginPath()
                ctx.lineWidth = ratio / 2
                ctx.strokeStyle = lineColor
                ctx.moveTo(dot.x, dot.y)
                ctx.lineTo(d2.x, d2.y)
                ctx.stroke()
              }
            }
            // 将已经计算过的粒子从数组中删除
            nDots.splice(nDots.indexOf(dot), 1)
          })

          RAF(animate)
        }

        window.onresize = resize

        resize()
        setXY()
        setDots()

        setTimeout(() => {
          animate()
        }, 100)
      }
    }
  }
</script>
