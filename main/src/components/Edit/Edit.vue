<template>
  <div id="edit" class="edit-container"></div>
</template>

<script>
  import { imgUploadService } from '../../utils/service'
  import enums from '../../utils/enums'
  import helper from '../../utils/helper'

  export default {
    props: {
    },
    data () {
      return {
        E: null,
        editor: null
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        this.init()
      },
      setContent (txt) {
        this.editor.txt.html(txt)
      },
      getContent () {
        return this.editor.txt.html()
      },
      setClear () {
        this.editor.txt.clear()
      },
      init () {
        this.E = global.wangEditor
        this.editor = new this.E('#edit')
        this.editor.customConfig.customUploadImg = (files, insert) => {
          this.doImgUpload(files[0], data => insert(data))
        }
        this.editor.create()
      },
      async doImgUpload (file, cb) {
        const { code, msg, data } = await imgUploadService(file)
        if (code === enums.SUCCESS_CODE) {
          cb(data)
        } else helper.error(msg)
      }
    }
  }
</script>

<style scoped>
  .edit-container{
  }
</style>
