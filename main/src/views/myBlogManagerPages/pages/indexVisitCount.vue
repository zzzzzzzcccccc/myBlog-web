<template>
  <div>

    <div class="item-header">
      <div class="item-header-path">
        <el-row>
          <el-col :span="6"><el-date-picker class="w100" @change="bindDatePicker" v-model="dateScope" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker></el-col>
          <el-col :span="1"><el-button icon="el-icon-search" size="mini" type="primary" round plain @click="onReady(searchData)"></el-button></el-col>
          <el-col :span="1"><el-button icon="el-icon-delete" size="mini" type="danger" round plain @click="searchDataClear"></el-button></el-col>
        </el-row>
      </div>
      <div class="item-header-button">
      </div>
    </div>

    <div style="margin: 36px 0"></div>

    <div class="item-body">
      <div class="item-body-chart" id="chart"></div>
    </div>

  </div>
</template>

<script>
  import { indexService } from '../../../utils/service'
  import { clearObj } from '../../../utils/public'

  export default {
    data () {
      return {
        chart: null,
        dateScope: null,
        searchData: {
          startTime: null,
          endTime: null
        }
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady (searchData) {
        this.doGetData(searchData)
      },
      doGetData (searchData={}) {
        indexService.visitCountList({
          searchData,
          cb: data => {
            this.drawChart(this.setData(data))
          }
        })
      },
      bindDatePicker (val) {
        if (val === null) {
          this.searchDataClear()
        } else {
          this.searchData.startTime = val[0]
          this.searchData.endTime = val[1]
        }
      },
      searchDataClear () {
        clearObj(this.searchData, null)
        this.dateScope = null
      },
      setData (data) {
        const xData = []
        const yData = []

        for (let i = 0; i < data.length; i++) {
          xData.push(data[i].totalDate)
          yData.push(data[i].visitCount)
        }

        return { xData, yData }
      },
      drawChart (item) {
        const options = {
          title: false,
          legend: false,
          credits: {
            enabled: false
          },
          chart: {
            type: 'line'
          },
          xAxis: {
            categories: item.xData
          },
          yAxis: {
            title: false
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true          // 开启数据标签
              },
              enableMouseTracking: true // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            }
          },
          series: [
            {name: '当天访问次数', data: item.yData}
          ]
        }

        this.chart = Highcharts.chart('chart', options)
      }
    }
  }
</script>
