<template>
  <div class="container bg-secondary bg-primary mt-2">
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="collectorTitle" class="form-label">Collector Title</label>
        <input type="text" class="form-control" id="collectorTitle" placeholder="Collector Title"
               v-model="collector.title">
      </div>
      <div class="col-md-6 mb-3">
        <label for="collectorCateg" class="form-label">Collector Category</label>
        <select id="collectorCateg" class="form-control" v-model="collector.category">
          <option value="0">Select Category</option>
          <option value="1">Vmware</option>
          <option value="2">Storage</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-3">
        <label class="form-label" for="collectorscript">Collector scripts</label>
        <textarea class="form-control" id="collectorscript" placeholder="scripts"
                  v-model="collector.script"> </textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-3">
        <label class="form-label" for="collectordescription">Collector description</label>
        <textarea class="form-control" id="collectordescription" placeholder="description"
                  v-model="collector.description"> </textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h5>Collector Params</h5>
        <table class="table table-bordered border-primary">
          <thead>
          <tr>
            <th scope="col">Param name</th>
            <th scope="col">Param prefix</th>
            <th scope="col">Param is optional</th>
            <th scope="col">Param description</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <collector-param v-model:value="collector.ColParams"></collector-param>

          </tbody>
        </table>
      </div>

    </div>
    <div class="row justify-content-end">
      <div class="col-md-3">
        <button class="btn btn-primary mx-5" @click="saveParam">
          <b-icon-save class="m-2"/>
          Save
        </button>
        <button class="btn btn-danger">
          <b-icon-dash-square class="m-2"/>
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorParam from "./CollectorParam";

export default {
  name: "CollectorForm",
  components: {
    CollectorParam
  },
  inject: ['config','$axios'],
  methods: {
     saveParam() {
      this.$axios({
        method: 'post',
        url: this.config.SERVER_URL+'api/collector/create',
        data: this.collector
      });
    }
  },
  data() {
    return {
      collector: {
        ColParams: [
          {name: 'client', prefix: '', description: '', optional: false}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>