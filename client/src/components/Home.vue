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
        <tbody>
          <tr v-for="job in listjobs" v-bind:key="job.id">
            
            <td>{{job.id}}</td>
            <td>{{job.name}}</td>
            <td>{{ getDateToshwo(job.processedOn) }}</td>
            <td>{{ getDateToshwo(job.finishedOn) }}</td>
            <td>{{job.returnValue}}</td>
            <td> 
              <button class="btn-sm btn-outline-success mx-2" ><b-icon-skip-forward-circle/> Show Logs</button>     
            </td>
          </tr>
        </tbody>
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
               this.listjobs = response.data; 
            },
            swal: this.$swal
        })      
    },
    methods: {
      getDateToshwo(timestamp) {
        const date = new Date(timestamp);
       return date.toLocaleDateString()+" "+date.toLocaleTimeString()
      }
    }
}
</script>
