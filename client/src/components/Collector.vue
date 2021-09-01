<template>
  <div>
    <div class="row p-2">
      <div class="col-md-2">
        <router-link class="btn btn-success" to="/newCollector"><b-icon-plus-circle-fill class="mb-1 mx-1"/>New Collector</router-link>
      </div>
    </div>
    <div class="row p-2">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Params</th>
            <th scope="col">Creation date</th>
            <th scope="col">Version</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="collector in listCollectors" :key="collector.id">
            <th scope="col">{{ collector.id }}</th>
            <td>{{ collector.title }}</td>
            <td>{{ collector.category.name }}</td>
            <td style="max-width: 450px;"><pre><code>{{ collector.colParams }}</code></pre></td>
            <td>{{ collector.creation_date }}</td>
            <td>1.0</td>
            <td>
              <button class="btn-sm btn-outline-danger mx-2" @click="removeCollector(collector.id)"><b-icon-x-circle-fill/> Remove</button>
              <button class="btn-sm btn-outline-info" @click="editCollector(collector.id)"><b-icon-pencil-square/> Edit</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Collector",
  inject: ['config','$axios'],
  data() {
    return {
      listCollectors: []
    }
  },
  mounted() {
    this.$axios.get(this.config.SERVER_URL+'api/collector/list')
        .then(response => {this.listCollectors = response.data})
        .catch(error => console.log(error));
  },
  methods: {
    editCollector(id)
    {
      if(typeof id == 'undefined') {
        return;
      }
      this.$router.push('/editCollector/'+id);
    },
    removeCollector(id)
    {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to delete this collector",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios({
            method: 'delete',
            url: this.config.SERVER_URL+'api/collector/remove/'+id,
            data: {}
          }).then((response) => {
            if(response.statusText == 'OK') {
              this.$router.go(this.$router.currentRoute)
            }
          })
        }
      })

    }
  }
}
</script>

<style scoped>

</style>