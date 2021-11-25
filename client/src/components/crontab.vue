<template>
    <div class="modal-card" style="width: 1000px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Crontab Configuration</p>
      </header>

      <section class="modal-card-body">
        <div class="row">
          <div class="col">
            <label for="collection_title" class="form-label">Collection Title</label>
            <input class="form-control" id="collection_title" v-model="cron.title"/>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="minute" class="form-label">Minute</label>
            <select class="form-control" id="minute" v-model="cron.minute">
              <option v-for="n in 59" :key="n">{{ n }}</option>
              <option value="*">Every Minute</option>
            </select>
          </div>
          <div class="col">
            <label for="hour" class="form-label">Hour</label>
            <select class="form-control" id="hour" v-model="cron.hour">
              <option value="0">0</option>
              <option v-for="n in 23" :key="n">{{ n }}</option>
              <option value="*">Every Hour</option>
            </select>
          </div>
          <div class="col">
            <label for="hour" class="form-label">Day of month</label>
            <select class="form-control" id="day_of_month" v-model="cron.day_month">
              <option v-for="n in 31" :key="n">{{ n }}</option>
              <option value="*">Every Day</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label for="month" class="form-label">Month</label>
            <select class="form-control" id="month" v-model="cron.month">
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
              <option value="*">Every Month</option>
            </select>
          </div>
          <div class="col-4">
            <label for="day_week" class="form-label">Day of week</label>
            <select class="form-control" id="day_week" v-model="cron.day_week">
              <option value="Mon">Monday</option>
              <option value="Tus">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thur">Thursday</option>
              <option value="Fri">Friday</option>
              <option value="Sat">Saturday</option>
              <option value="Sun">Sunday</option>
              <option value="*">Every Day Of Week</option>
            </select>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="d-flex flex-row-reverse bd-highlight" style="width: 100%;">
          <button class="btn btn-outline-danger m-1" @click="$emit('close')">Close</button>
          <button class="btn btn-outline-success m-1" @click="saveCrontab(() =>{ $emit('close');})">Save Schedule</button>
        </div>
      </footer>
    </div>
</template>

<script>
import { postData } from "../helpers/helper";

export default {
  props: ['crontab'],
  name: "crontab",
  data() {
    return {
      cron: this.crontab
    }
  },
  methods: {
    saveCrontab(closeFunc) {

      if (this.cron.title == '' ||
        this.cron.minute == '' ||
        this.cron.hour == '' ||
        this.cron.month == '' ||
        this.cron.day_week == '') {
        this.$swal.fire({
          title: "<strong>Save error</strong>",
          icon: "error",
          html: 'Saving not launched because the title / minute / hour / month / day_week',
          showCloseButton: true,

        });
        return;
      }
      postData('api/collection/scheduleCollection',{
        data: this.cron,
        swal: this.$swal,
        success: (response) => {
          if(response.data.res == 'success') {
            this.$swal.fire({
              title: "<strong>Save Success</strong>",
              icon: "success",
              html: 'Save schedule done successfully',
              showCloseButton: true,
              willClose: () => {
                closeFunc();
              }
            });
          } else {
            this.$swal.fire({
              title: "<strong>Save Error</strong>",
              icon: "error",
              html: 'Save schedule done with error',
              showCloseButton: true
            });
          }
        }
      })
    }
  },
  mounted() {
    console.log(this.cron)
  }
};
</script>

<style scoped>
.modal-card {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  overflow: hidden;
}
@media screen and (min-width: 769px) {
  .modal-card {
    margin: 0 auto;
    max-height: calc(100vh - 40px);
    width: 640px;
  }
}
.modal-card {
  margin: 0 20px;
  max-height: calc(200vh - 160px);
  overflow: auto;
  position: relative;
  width: 100%;
}
.modal-card-foot,
.modal-card-head {
  align-items: center;
  background-color: #f5f5f5;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 20px;
  position: relative;
}
.modal-card-head {
  border-bottom: 1px solid #dbdbdb;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.modal-card-body {
  -webkit-overflow-scrolling: touch;
  background-color: #fff;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  padding: 20px;
}
.modal-card-foot {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 1px solid #dbdbdb;
}
.modal-card-title {
  color: #363636;
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;
}
.modal-card-foot .o-button:not(:last-child) {
  margin-right: 0.5em;
}
</style>