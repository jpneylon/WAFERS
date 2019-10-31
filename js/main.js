var app = new Vue({
  el: '#app',
  components: { vuejsDatepicker },
  data: {
    message: 'Container for Wafers',
    patient: '',
    mrn: '',
    rxdose: '',
    fractions: '',
    txdate: new Date(),
    rxdate: new Date(),
  }
})

Vue.component('wafer', {
  template: `
  `
})
