<template>
  <div>
    <div class="row p-2">
      <div class="col-md-3">
        <router-link class="btn btn-outline-success" to="/collection/new"><b-icon-plus-circle-fill class="mb-1 mx-1"/>New Collection</router-link>
        <button class="btn btn-outline-warning mx-2" to="/collection/new" @click="scheduleMultiple()"><b-icon-plus-circle-fill class="mb-1 mx-1"/>Multiple schedule</button>
      </div>
    </div>
    <div class="row p-2">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"><input type="checkbox" @change="selectAllCollect($event)"/> </th>
            <th scope="col">Title</th>
            <th scope="col">Collector</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="collection in collections" :key="collection.id">
            <td>{{  collection.id }}</td>
            <td><input type="checkbox" v-model="selectedCollects" :id="'coll_'+collection.id" :value="collection.id"/> </td>
            <td>{{  collection.title }}</td>
            <td>{{  collection.collector.title }}</td>
            <td>
              <button class="btn-sm btn-outline-danger mx-2" @click="removeCollection(collection.id)"><b-icon-x-circle-fill/> Remove</button>
              <button class="btn-sm btn-outline-info mx-2" @click="editCollection(collection.id)" ><b-icon-pencil-square/> Edit</button>
              <button class="btn-sm btn-outline-success mx-2" @click="runCollecte(collection.id)" ><b-icon-skip-forward-circle/> Execute</button>
              <button class="btn-sm btn-outline-warning" @click="scheduleCollection(collection)" ><b-icon-calendar3/> Schedule</button>

            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row p-2">
      <div class="console">
        <p style="color: white;" v-html="collectionLog"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteData, getData, getUrl } from "../helpers/helper";
import io from 'socket.io-client';
import crontab from "./crontab";

export default {
  name: "CollectionList",
  inject: ['config','$axios'],

  created() {
    this.socket = io(getUrl(), { transports: ['websocket', 'polling', 'flashsocket'] });
    this.socket.on('EVENT_NAME', (message) => {
      this.collectionLog+= '<br> >> '+message.msg;
      var container = this.$el.querySelector(".console");
      container.scrollTop = container.scrollHeight;
    })
  },
  components: {

  },
  data() {
    return {
      collections: [],
      socket: null,
      collectionLog: ' >> ',
      showModalSizeLarge: false,
      crontab : {
        minute: '',
        hour: '',
        day_month: '',
        month: '',
        day_week: '',
        title: '',
        jobid: ''
      },
      selectedCollects: []
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
    runCollecte(id) {
      // launch an action to server
      //console.log(id)
      getData('api/collection/launchCollection/'+id,{
        success: () => {

        },
        swal: this.$swal
      });
    },
    scheduleCollection(collection) {
      this.$oruga.modal.open({
        parent: this,
        component: crontab,
        custom: true,
        trapFocus: true,
        props: {crontab: this.crontab}
      })
      this.crontab.title = collection.title;
      this.crontab.jobsid = this.selectedCollects;
    },

    selectAllCollect(event)
    {
      this.selectedCollects = [];
      if(event.target.checked) {
          for( let i = 0; i<this.collections.length;i++) {
            this.selectedCollects.push(this.collections[i].id);
          }
      }
    },
    scheduleMultiple() {
      this.$oruga.modal.open({
        parent: this,
        component: crontab,
        custom: true,
        trapFocus: true,
        props: {crontab: this.crontab}
      })
      this.crontab.jobsid = this.selectedCollects;
      this.crontab.title = 'Multiple jobs';
    }
  }
};
</script>

<style scoped>
.console {
  background-color: black;
  width: 99%;
  margin: auto;
  max-height: 400px;
  border-radius: 5px;
  padding: 19px;
  text-align: start;
  overflow-y: auto;
}
</style>