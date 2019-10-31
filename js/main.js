var app = new Vue({
  el: '#app',

  data: {
    message: 'Container for Wafers',
    patient: '',
    mrn: '',
    rxdose: '',
    fractions: '',
    txdate: null,
    rxdate: null,
    physician: '',
    physicist: '',
    docs:[
        {'id':'4','name':'Glaser, Scott'},
        {'id':'5','name':'Radany, Eric'},
        {'id':'6','name':'Sampath, Sagus'},
        {'id':'7','name':'Vora, Nayana'},
        {'id':'8','name':'Wong, Jeffrey'}
      ],
    nerds: [
        {'id':'1','lastname':'Du','firstname':'Dongsu'},
        {'id':'2','lastname':'Han','firstname':'Chunhui'},
        {'id':'3','lastname':'Liang','firstname':'Iris'},
        {'id':'4','lastname':'Liu','firstname':'An'},
        {'id':'5','lastname':'Neylon','firstname':'Jack'},
        {'id':'6','lastname':'Sun','firstname':'Sean'},
        {'id':'7','lastname':'Zhang','firstname':'Sean'}
      ],
  }
})

Vue.component('wafer', {
  template: `
  `
})
