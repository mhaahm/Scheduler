<template>
  <div class="container">
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label">Collector Title</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput2" class="form-label">Collector Category</label>
      <select name="formGroupExampleInput2" class="form-control">
        <option>Select Category</option>
        <option>Vmware</option>
        <option>Storage</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectorForm"
}
</script>

<style scoped>

</style>