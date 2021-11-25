<template>
<div class="row p-2">
  <div class="col-md-12">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col" rowspan="2">#</th>
        <th scope="col" rowspan="2">Title</th>
        <th scope="col" rowspan="2">Collection</th>
        <th scope="col" colspan="5">Crontab</th>
        <th scope="col" rowspan="2">Actions</th>
      </tr>
      <tr>
        <th scope="col">Minute</th>
        <th scope="col">Hour</th>
        <th scope="col">Day in week</th>
        <th scope="col">Day in month</th>
        <th scope="col">Month</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cron in crontabs" :key="cron.id">
        <td>{{  cron.id }}</td>
        <td>{{  cron.name }}</td>
        <td>
          <p v-for="coll in cron.collections" :key="coll.id">{{ coll.title }}</p>
        </td>
        <td>{{  cron.config.minute}}</td>
        <td>{{  cron.config.hour}}</td>
        <td>{{  cron.config.day_week}}</td>
        <td>{{  cron.config.day_month}}</td>
        <td>{{  cron.config.month}}</td>
        <td>
          <button class="btn-sm btn-outline-danger mx-2" @click="removeCrontab(cron.id)"><b-icon-x-circle-fill/> Remove</button>
          <button class="btn-sm btn-outline-info mx-2" @click="editCrontab(cron.id)" ><b-icon-pencil-square/> Edit</button>
          <button class="btn-sm btn-outline-success mx-2" @click="runCollecte(cron.id)" ><b-icon-skip-forward-circle/> Execute</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
import { deleteData, getData } from "../helpers/helper";
import crontab from "./crontab";

export default {
  display: false,
  data() {
    return {
      crontabs: []
    }
  },
  mounted() {
    getData('api/collection/listCrontab',{
      success: (response) => {
        this.crontabs = response.data;
      },
      swal: this.$swal
    });
  },
  methods: {
    removeCrontab: function(id){
      let swal = this.$swal;
      let router = this.$router;
      swal.fire({
        title: 'Do you want to delete ',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes Delete`,
        denyButtonText: `Don't delete`,
      }).then(function(result){
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          deleteData('api/collection/deleteCrontab/'+id,{
            success: function() {
              router.go(router.currentRoute)
            },
            swal: swal
          })
        }
      })
    },
    editCrontab: function(id){
      var selectedCron = null;
      for(let cron in this.crontabs)
      {
          if(this.crontabs[cron].id == id) {
            selectedCron = this.crontabs[cron];
            selectedCron.title = selectedCron.name;
            selectedCron.hour = selectedCron.config.hour;
            selectedCron.minute = selectedCron.config.minute;
            selectedCron.day_month = selectedCron.config.day_month;
            selectedCron.month = selectedCron.config.month;
            selectedCron.day_week = selectedCron.config.day_week;
            break;
          }
      }
      this.$oruga.modal.open({
        parent: this,
        component: crontab,
        custom: true,
        trapFocus: true,
        props: {crontab: selectedCron}
      })
    },
    runCollecte: function(id) {
      getData('api/collection/launchcrontab/'+id,{
        success: (response) => {
          if(response.status == 200) {
            this.$swal.fire({
              title: "<strong>Launch success</strong>",
              icon: "success",
              html: 'Jobs add to treatment sequence successfully',
              showCloseButton: true
            });
          }
        },
        swal: this.$swal
      });
    }
  }
}
</script>

<style>
.table-bordered th,td {
  text-align: center;
  vertical-align: middle;
}
</style>