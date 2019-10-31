
var app = new Vue({
  el: '#app',
  components: { vuejsDatepicker },
  data: {
    message: 'Container for Wafers',
    patient: '',
    mrn: '',
    rxdose: '',
    fractions: '',
    txdate: new Date().toISOString().substr(0, 10),
    rxdate: new Date().toISOString().substr(0, 10),
    physician: '',
    physicist: '',
    docs:[
        {'id':'1','name':'Amini, Arya'},
        {'id':'2','name':'Chen, YiJen'},
        {'id':'3','name':'Dandapani, Savita'},
        {'id':'4','name':'Glaser, Scott'},
        {'id':'5','name':'Radany, Eric'},
        {'id':'6','name':'Sampath, Sagus'},
        {'id':'7','name':'Vora, Nayana'},
        {'id':'8','name':'Wong, Jeffrey'}
      ],
    nerds: [
        {'id':'1','name':'Du, Dongsu'},
        {'id':'2','name':'Han, Chunhui'},
        {'id':'3','name':'Liang, Iris'},
        {'id':'4','name':'Liu, An'},
        {'id':'5','name':'Neylon, Jack'},
        {'id':'6','name':'Sun, Sean'},
        {'id':'7','name':'Zhang, Sean'}
      ],
  }
})

Vue.component('wafer', {
  template: `
  `
})
