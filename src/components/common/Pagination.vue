<template>
  <el-row>
    <el-col>
      <div class="block pages">
       <el-pagination
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         layout="total, prev, pager, next, jumper"
         :total="totalNum"
         >
       </el-pagination>
     </div>
   </el-col>
 </el-row>
</template>

<script>
export default {
  name:"pageModel",
  props: ['totalNum','currentPage'],
	data(){
		return{
      // currentPage: 1,
      // totalNum:0
		}
	},
	mounted() {

	},
	methods:{
        handleCurrentChange(val) {
          this.$emit("sentToParantPageNo",val)
          // console.log(val,"张继伟");
        }
	}
}

</script>

<style scoped>
/* 分页样式 */
.pages {
    padding-top: 15px;
    padding-bottom: 5px;
}
</style>
