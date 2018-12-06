<template>
    <div>
      <input type="text" v-model="name">
      <button id="btn" @click="down">下载</button>
    </div>
</template>

<script>
  import jsPDF from 'jspdf'
    export default {
      data(){
          return {
            name:''
          }
      },
      methods:{
          down(){
            let doc = new jsPDF()
            console.log(JSON.stringify(a));
            doc.text(30,30,JSON.stringify(a))
            doc.save(`${this.name}.pdf`)
          }
      }
    }
</script>

<style scoped>
  #btn{
    width: 50px;
    height: 50px;
  }

</style>
