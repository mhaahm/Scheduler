<template>
  <div>
    <div class="row p-2">
      <div class="col-md-2">
        <router-link class="btn btn-success" to="/collection/new"><b-icon-plus-circle-fill class="mb-1 mx-1"/>New Collection</router-link>
      </div>
    </div>
    <div class="row p-2">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Collector</th>
            <th scope="col">Params</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="collection in collections" :key="collection.id">
            <td>{{  collection.id }}</td>
            <td>{{  collection.title }}</td>
            <td>{{  collection.collector.title }}</td>
            <td style="max-width: 450px;"><pre>{{  collection.params }}</pre></td>
            <td>
              <button class="btn-sm btn-outline-danger mx-2" @click="removeCollection(collection.id)"><b-icon-x-circle-fill/> Remove</button>
              <button class="btn-sm btn-outline-info mx-2" @click="editCollection(collection.id)" ><b-icon-pencil-square/> Edit</button>
              <button class="btn-sm btn-outline-success mx-2"  ><b-icon-skip-forward-circle/> Execute</button>
              <button class="btn-sm btn-outline-warning"  ><b-icon-calendar3/> Schedule</button>

            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
import { deleteData, getData } from "../helpers/helper";

export default {
  name: "CollectionList",
  inject: ['config','$axios'],
  data() {
    return {
      collections: []
    }
  },
  mounted() {
    getData('api/collection/list',{
      success: (response) => {
        this.collections = response.data;
      },
      swal: this.$swal
    });
  },
  methods: {
    removeCollection(col_id) {
      this.$swal.fire({
        title: 'Do you want to delete ',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes Delete`,
        denyButtonText: `Don't delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            deleteData('api/collection/delete/'+col_id,{
              success: () => {
                this.$router.go(this.$router.currentRoute)
              },
              swal: this.$swal
            })
        }
      })

    },
    editCollection(id) {
        this.$router.push('/editCollection/'+id);
    },
    launchCollection(id) {

    }
  }
};
</script>

<style scoped>

</style>