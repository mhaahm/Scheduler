<template>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <div class="mx-2"></div>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav me-auto mt-2">
            <li class="nav-item">
              <router-link to="/Collector" class="navbar-brand" active-class="active">Collector</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Collection/list" class="navbar-brand" active-class="active">Collections</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/crontab/list" class="navbar-brand" active-class="active">Crontab</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="navbar-brand dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Settings
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Logs</a></li>
                <li><a class="dropdown-item" href="#">Transfer mod</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="justify-content-end" style="display: contents;color: white;font-weight: bold;">
        <b-icon-power /> <span class="mx-2">MHA</span></div>
    </nav>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
