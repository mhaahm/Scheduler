<template>
  <div class="container">
    <div class="row p-3">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Job Id</th>
            <th scope="col">Collection</th>
            <th scope="col">Start date</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import { getData } from "../helpers/helper";
export default {
    name: 'home',
    data() {
        return {
            listjobs: []
        }
    },
    mounted() {
        getData('api/collection/jobs',{
            success: (response) => {
               console.log(response) 
            },
            swal: this.$swal
        })      
    }
}
</script>
