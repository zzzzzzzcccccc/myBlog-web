<template>
  <section id="wrapperNav" calss="wrapper-nav">
    <div class="nav-container">
      <ul class="nav-wrapper">
        <li class="nav-list" v-for="(item, index) in list" :key="index" v-if="item.visible" :title="item.remark">
          <a :href="item.href">
            <div class="nav-list-info">
              <div class="nav-list-info-name">{{ item.name }}</div>
              <div class="nav-list-info-remark">{{ item.remark }}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'wrapperNav',
    props: {
      list: {
        type: Array
      }
    }
  }
</script>

<style scoped>
  .nav-container{
    background-color: hsla(0, 0%, 100%, 0.7);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    width: 360px;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 15;
    padding: 10px 5px;
    transform: translate(-50%,-50%) scale(1);
  }

  .nav-wrapper{
    width: 100%;
    height: 100%;
  }

  .nav-list-info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }

  .nav-list-info-name{
    color: #333333;
    font-size: 20px;
  }

  .nav-list-info-remark{
    color: #a1a1a1;
    font-size: 14px;
    width: 200px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-list:hover .nav-list-info-name{
    text-decoration: underline;
    font-weight: 700;
  }

  .nav-list:hover .nav-list-info-remark{
    color: #108ee9;
  }
</style>
