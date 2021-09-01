<template>
  <div class="container bg-secondary bg-primary pt-2 pb-2" :key="forceUpdateKey" >
    <div class="alert" :class="{'alert-success': !error, 'alert-danger':error}" role="alert" v-show="saveDone == 1">
      {{ textSave }}
    </div>
    <div class="row">
      <div class="col-md-4 mb-3">
          <label class="form-label">Collection Title</label>
          <input type="text" class="form-control" v-model="collection.title" />

      </div>
      <div class="col-md-4 mb-3">
        <label class="form-label">Collector</label>
        <select class="form-control" v-model="collection.collector" @change="selectParams">
          <option value="0">Select collector</option>
          <option v-for="collector in collectors" :key="collector.id" :value="collector.id">{{ collector.title }}</option>
        </select>
      </div>
      <div class="col-md-4 mb-3">
        <label class="form-label">Nb Retry</label>
        <input type="number" class="form-control" v-model="collection.nbRetry"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3">
        <label class="form-label">Transfert Mod</label>
        <select class="form-control" v-model="collection.transfertMode">
          <option value="0">Select transfert mod</option>
          <option v-for="tm in transfertMods" :key="tm.id" :value="tm.id">{{ tm.name }}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h5>Collector Params</h5>
        <table class="table table-bordered border-primary">
          <thead>
          <tr>
            <th scope="col">Param name</th>
            <th scope="col">Param value</th>
            <th scope="col">Param optional</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(param, index) in collection.params" :key="index">
            <td>
              <div style="display: inline-flex;">
                {{ param.name }} &nbsp; <Popper arrow :content="param.description"><b-icon-info-square/></Popper>
              </div>
            </td>
            <td><input type="text" class="form-control" v-model="param.value"></td>
            <td>
              {{ param.optional ? 'YES' : 'NO' }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row justify-content-end">
         <div class="col-md-4">
           <button class="btn btn-primary mx-2" @click="saveCollection">
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

import { getData, postData,getUrl } from "../helpers/helper";

export default {
  name: "Collection",
  inject: ['config', '$axios'],
  data() {
    return {
      collection: {},
      collectors: [],
      saveDone: false,
      textSave: '',
      error:false,
      transfertMods: []
    }
  },
  async mounted() {
    let collection_id = this.$route.params.id;
    if (typeof collection_id !== 'undefined') {
      const response = await this.$axios.get(getUrl() + 'api/collection/getCollection?id='+collection_id);
      this.collection = response.data;
      this.collection.collector = this.collection.collector.id;
      this.collection.transfertMode = this.collection.transfertMode.id;
      this.$forceUpdate();
    }

    getData('api/collector/list',{
      success: (response) => {
        this.collectors = response.data
      },
      swal: this.$swal
    });
    getData('api/collection/transfertMods',{
      success: (response) => {
        this.transfertMods = response.data
      },
      swal: this.$swal
    });
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
     selectParams() {
      const id = this.collection.collector;
      getData('api/collector/getCollector?id='+id,{
        success: (response) => {
          this.collection.params = response.data.colParams
        },
        swal: this.$swal
      });
    },

    saveCollection() {

      if (this.collection.title == '' || this.collection.collector == 0) {
        this.$swal.fire({
          title: "<strong>Save error</strong>",
          icon: "error",
          html: 'Saving not launched because the title / collector are empty',
          showCloseButton: true
        });
        return;
      }
      postData('api/collection/addNew',{
        data: this.collection,
        swal: this.$swal,
        success: (response) => {
          console.log("save donne successfully",response)
          this.saveDone = true;
          this.textSave = 'Save Collector done successfully'
          this.error = false
          setTimeout(() => {
            this.$router.push('/collection/list');
          },3000)
        }
      })
    }
  }
  /*setup() {
    let collection = reactive({})
    let collectors = ref([])
    let saveDone = ref(null)
    let textSave = ref('')
    let error = ref(false)
    const swal = inject('$swal')
    const router = useRouter();
    const route = useRoute();
    let transfertMods = ref([])
    const goBack = function() {
      window.history.length > 1 ? router.go(-1) : router.push('/')
    }

    const forceUpdate = function() {
      forceUpdateKey.value+=1;
    }

    const selectParams = function() {
      const id = collection.collector;
      getData('api/collector/getCollector?id='+id,{
        success: (response) => {
          collection.params = response.data.colParams
        },
        swal: swal
      });
    }

    const saveCollection = function() {

      if (collection.title == '' || collection.collector == 0) {
        swal.fire({
          title: "<strong>Save error</strong>",
          icon: "error",
          html: 'Saving not launched because the title / collector are empty',
          showCloseButton: true
        });
        return;
      }
      postData('api/collection/addNew',{
        data: collection,
        swal: swal,
        success: (response) => {
          console.log("save donne successfully",response)
          saveDone.value = true;
          textSave.value = 'Save Collector done successfully'
          error.value = false
          setTimeout(() => {
            router.push('api/collection/list');
          },3000)
        }
      })
    }

     onMounted(async () => {

      let collection_id = route.params.id;
      if (typeof collection_id !== 'undefined') {
        const response = await axios.get(getUrl() + 'api/collection/getCollection?id='+collection_id);
        collection.value = response.data;
        alert('ici')
      }

      getData('api/collector/list',{
        success: (response) => {
          collectors.value = response.data
        },
        swal: swal
      });
      getData('api/collection/transfertMods',{
        success: (response) => {
          transfertMods.value = response.data
        },
        swal: swal
      });
    })

    return {
      collection, collectors,selectParams,goBack,saveCollection,error,textSave,saveDone,transfertMods,forceUpdate,forceUpdateKey
    }
  }*/
};
</script>

<style scoped>
  :deep(.popper) {
    background: #e92791;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }

  :deep(.popper #arrow::before) {
    background: #e92791;
  }

  :deep(.popper:hover),
  :deep(.popper:hover > #arrow::before) {
    background: #e92791;
  }
  :root {
  --popper-theme-background-color: red;
  }

</style>