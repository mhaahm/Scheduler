<template>
  <div>
    <div class="row p-2">
      <div class="col-md-2">
        <router-link class="btn btn-success" to="/editCollector"><b-icon-plus-circle-fill class="mb-1 mx-1"/>New Collector</router-link>
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
          <tr>
            <th scope="col">1</th>
            <td>VMW002</td>
            <td>Vmware</td>
            <td>...</td>
            <td>2021-02-01 15:00</td>
            <td>1.0</td>
            <td>
              <button class="btn-sm btn-outline-danger mx-2"><b-icon-x-circle-fill/> Remove</button>
              <button class="btn-sm btn-outline-info"><b-icon-pencil-square/> Edit</button>
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
  name: "Collector"
}
</script>

<style scoped>

</style>