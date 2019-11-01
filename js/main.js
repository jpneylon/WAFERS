Vue.component('wafer-spc', {
  props: {
    w_patient: String,
    w_mrn: String,
    w_physician: Object,
    w_physicist: Object,
    w_rxdate: Date,
    w_txdate: Date,
  },
  template: `
  <div>
    <img src='data/cohlogo.jpg'/>
    <h2>Special Medical Physics Consult Report</h2>
    <h3>Radiation Oncology</h3>
    <h3>City of Hope National Medical Center</h3>

    <p>&nbsp;</p>
    <p>Date: <strong>{{ w_rxdate.toDateString() }}</strong></p>
    <p>To: Radiation Physicist</p>
    <p>Request From: <strong>{{ w_physician.firstname }} {{ w_physician.lastname }}, MD</strong></p>
    <p>Patient Name: <strong>{{ w_patient }}</strong></p>
    <p>MRN: <strong>{{ w_mrn }}</strong></p>
    <p>Purpose:</p>

    <p>&nbsp;</p>

    <p>Date: <strong>{{ w_txdate.toDateString() }}</strong></p>
    <p>To: <strong>{{ w_physician.firstname }} {{ w_physician.lastname }}, MD</strong></p>
    <p>Purpose:</p>

    <p>&nbsp;</p>

    <h4>{{ w_physicist.firstname }} {{ w_physicist.lastname }}, PhD, DABR</h4>
    <h4>Radiation Physicist</h4>
  </div>
  `
})


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
    physician: '',
    physicist: '',
    showSPC: false,
    docs:[
        {'id':'1','lastname':'Amini','firstname':'Arya'},
        {'id':'2','lastname':'Chen','firstname':'YiJen'},
        {'id':'3','lastname':'Dandapani','firstname':'Savita'},
        {'id':'4','lastname':'Glaser','firstname':'Scott'},
        {'id':'5','lastname':'Radany','firstname':'Eric'},
        {'id':'6','lastname':'Sampath','firstname':'Sagus'},
        {'id':'7','lastname':'Vora','firstname':'Nayana'},
        {'id':'8','lastname':'Wong','firstname':'Jeffrey'}
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
  },
  methods: {
    toggleShow: function(showSwitch) {
      if (showSwitch) return(false)
      else return(true)
    }
  }
})
