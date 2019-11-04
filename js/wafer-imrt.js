Vue.component('wafer-imrt', {
  props: {
    w_patient: String,
    w_mrn: String,
    w_physicist: Object,
    w_txdate: Date,
  },
  template: `
  <div>
    <div class="no-print">
      <fieldset>
      <legend>Select all that apply:</legend>
      <div v-for="task in tasks">
        <input type="checkbox" v-model="task.show" id="task.id">
        <label for="task.id">{{task.text}}</label>
      </div>
      </fieldset>
      <hr>
      <p>&nbsp;</p>
    </div>

    <img src='data/cohlogo.jpg'/>
    <h3>IMRT Plan QA Report</h3>
    <h4>Radiation Oncology</h4>
    <h4>City of Hope National Medical Center</h4>

    <p>&nbsp;</p>
    <p>Patient Name: <strong>{{ w_patient }}</strong></p>
    <p>MRN: <strong>{{ w_mrn }}</strong></p>
  </div>
  `
})
