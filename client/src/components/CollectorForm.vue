<template>
  <div class="container bg-secondary bg-primary pt-2 pb-2">
    <div class="alert" :class="{'alert-success': !error, 'alert-danger':error}" role="alert" v-show="saveDone == 1">
      {{ textSave }}
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="collectorTitle" class="form-label">Collector Title</label>
        <input type="text" class="form-control" id="collectorTitle" placeholder="Collector Title"
                 v-model="collector.title" :class="{ error: v$.collector.title.$errors.length }">
        <div class="input-errors" v-for="error of v$.collector.title.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
      <div class="col-md-6 mb-3" >
        <label for="collectorCateg" class="form-label">Collector Category</label>
        <select id="collectorCateg" class="form-control" v-model="collector.category" :class="{ error: v$.collector.category.$errors.length }">
          <option value="0">Select Category</option>
          <option v-for="categ in categories" :key="categ.id" :value="categ.id">{{ categ.name }}</option>
        </select>
        <div class="input-errors" v-for="error of v$.collector.category.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-3" >
        <label class="form-label" for="collectorscript">Collector scripts</label>
        <textarea class="form-control" id="collectorscript" placeholder="scripts"
                  v-model="collector.script" :class="{ error: v$.collector.script.$errors.length }"> </textarea>
        <div class="input-errors" v-for="error of v$.collector.script.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-3">
        <label class="form-label" for="collectordescription">Collector description</label>
        <textarea class="form-control" id="collectordescription" placeholder="description"
                  v-model="collector.description" :class="{ error: v$.collector.script.$errors.length }"> </textarea>
        <div class="input-errors" v-for="error of v$.collector.description.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
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
          <tr v-for="(param,index) in collector.colParams" v-bind:key="index" >
            <td><input type="text" class="form-control" v-model="param.name"></td>
            <td><input type="text" class="form-control" v-model="param.prefix"></td>
            <td><input type="checkbox" class="form-check-input" v-model="param.optional"></td>
            <td><textarea class="form-control" v-model="param.description"></textarea></td>
            <td>
              <button type="button" class="btn btn-primary btn-sm" @click="addParam">Add</button>
              <button type="button" class="btn btn-danger btn-sm m-2" @click="removeParam(index)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="row justify-content-end">
      <div class="col-md-4">
        <button class="btn btn-primary mx-2" @click="saveParam">
          <b-icon-save class="m-2"/>
          Save
        </button>
        <button class="btn btn-danger mx-2">
          <b-icon-dash-square class="m-2"/>
          Cancel
        </button>
        <button class="btn btn-info" @click="goBack">
          <b-icon-skip-backward-btn class="m-2"/>
          Return To List
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  name: "CollectorForm",
  components: {
  },
  inject: ['config','$axios'],
  methods: {
     saveParam() {
       this.v$.collector.$touch()
       if(this.v$.$error) {
         this.saveDone = true;
         this.textSave = 'Save Collector not launched because some '
         this.error = true
         return;
       }
      this.$axios({
        method: 'post',
        url: this.config.SERVER_URL+'api/collector/create',
        data: this.collector
      }).then(() => {
          this.saveDone = true;
          this.textSave = 'Save Collector done successfully'
          this.error = false
        setTimeout(() => {
          this.saveDone = false;
          this.$router.push('/Collector')
        },3000)
      }).catch( (error) => {
        this.saveDone = true;
        this.textSave = 'Save Collector done with error ==> Error detail: '+error
        this.error = true
        setTimeout(() => {
          this.saveDone = false
        },3000)
      });
       window.scrollTo(0,0);
    },
    addParam() {
      this.collector.colParams.push( {name: '', prefix: '', description: '', optional: false})
    },
    removeParam(index) {
      if(this.collector.colParams.length > 1) {
        this.collector.colParams.splice(index,index)
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  data() {
    return {
      collector: {
        title: '',
        description: '',
        category: '',
        script: '',
        colParams: [
          {name: '', prefix: '', description: '', optional: false}
        ]
      },
      saveDone: false,
      textSave: '',
      error: false,
      categories: []
    }
  },
  validations () {
    return {
      collector: {
        title: {required,$autoDirty:true},
        script: {required,$autoDirty: true},
        category: {required},
        description: {required,$autoDirty: true},
      }
    }
  },
  mounted() {
    let collector_id = this.$route.params.id;
    if(typeof collector_id !== 'undefined') {
      this.$axios.get(this.config.SERVER_URL+'api/collector/getCollector?id='+collector_id)
          .then(response => {
            this.collector = response.data;
            var result = [];
            for(var i in this.collector.colParams)
            {
              result.push(this.collector.colParams[i]);
            }
            this.collector.colParams = result;
            this.$forceUpdate();
          }).catch(error => console.log(error));
    }
    // get categorys
    this.$axios.get(this.config.SERVER_URL+'api/category/list')
        .then(response => {this.categories = response.data})
        .catch(error => console.log(error));
  }
}
</script>

<style scoped>

</style>