<template>
    <!-- <div id="div1"> -->
        <div :style="{ 'height': typeof(heightScreen) != 'undefined' ? heightScreen  + 'px' : '100vh' }" id="div2" class="d-flex flex-column justify-content-center align-items-center">
            <p>Loading...</p>
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
        </div> 
    <!-- </div> -->
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Loading',
  props: ['datas','screenHeight'],
  setup(props) {
    return{
        loading: false,
        heightScreen: props.screenHeight != '' ? props.screenHeight : '100vh'
    }
  },
})
</script>

<style scoped>
html,body{
    margin:0 !important;
    padding:0 !important;
}
#div1{
    width:500px;
    height:500px;
    background-image: url("https://images3.alphacoders.com/823/82317.jpg");
  }
  
  #div2{
    width:100%;
    height:100vh;
    margin: 0 auto;
    background-color:gray;
    opacity:.7;
    position:absolute;
    top:0px;
    left:0px;
    z-index:100; 
    /*position: fixed;*/
  }
</style>