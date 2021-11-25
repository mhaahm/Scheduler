<template>
  <div id="dock-container">
    <ul>
      <li>
        <span>Collector</span>
        <a href="#"><img src="imgs/collector.jpg"/></a>
      </li>
      <li>
        <span>Collection</span>
        <a href="#"><img src="imgs/collections.jpg"/></a>
      </li>
      <li>
        <span>Settings</span>
        <a href="#"><img src="imgs/settings.png"/></a>
      </li>
      <li>
        <span>Crontab</span>
        <a href="#"><img src="imgs/crontab.png"/></a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "newsmen"
};
</script>

<style scoped>

p { color: #fff;}

ul {
  padding: 0;
}


#dock-container {
  position: fixed;
  bottom: 0;
  text-align: center;
  right: 20%;
  left: 20%;
  width: 60%;
  background: rgba(255,255,255,0.2);
  border-radius: 10px 10px 0 0;
}
#dock-container li {
  list-style-type: none;
  display: inline-block;
  position: relative;
  margin: 0 1em;
}

#dock-container li img {
  width: 64px;
  height: 64px;
  -webkit-box-reflect: below 2px
  -webkit-gradient(linear, left top, left bottom, from(transparent),
    color-stop(0.7, transparent), to(rgba(255,255,255,.5))); /* reflection is supported by webkit only */
  -webkit-transition: all 0.3s;
  -webkit-transform-origin: 50% 100%;
}
#dock-container li:hover img {
  -webkit-transform: scale(2);
  margin: 0 2em;
}
#dock-container li:hover + li img,
#dock-container li.prev img {
  -webkit-transform: scale(1.5);
  margin: 0 1.5em;
}

#dock-container li span {
  display: none;
  position: absolute;
  bottom: 140px;
  left: 0;
  width: 100%;
  background-color: rgba(0,0,0,0.75);
  padding: 4px 0;
  border-radius: 12px;
}
#dock-container li:hover span {
  display: block;
  color: #fff;
}
</style>