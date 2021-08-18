<template>
 <tr v-for="(param,index) in params" v-bind:key="index" >
   <td><input type="text" class="form-control" v-model="param.name"></td>
   <td><input type="text" class="form-control" v-model="param.prefix"></td>
   <td><input type="checkbox" class="form-check-input" v-model="param.optional"></td>
   <td><textarea class="form-control" v-model="param.description"></textarea></td>
   <td>
     <button type="button" class="btn btn-primary btn-sm" @click="addParam">Add</button>
     <button type="button" class="btn btn-danger btn-sm m-2" @click="removeParam(index)">Delete</button>
   </td>
 </tr>
</template>

<script>
export default {
  name: "CollectorParam",
  methods: {
    addParam() {
      this.params.push( {name: '', prefix: '', description: '', optional: false})
    },
    removeParam(index) {
      if(this.params.length > 1) {
        this.params.splice(index,index)
      }
    }
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      params: this.value
    }
  }
}
</script>

<style scoped>

</style>