// WAFERS: Created by Jack Neylon, Phd, DABR (v0.2-2019.11.05)

Vue.component('report-header', {
  props: ['rh_title'],
  template: `
  <div>
    <img src='data/cohlogo.jpg'/>
    <h3>{{rh_title}}</h3>
    <h4>Radiation Oncology</h4>
    <h4>City of Hope National Medical Center</h4>
  </div>
  `
})

Vue.component('two-column-row', {
  props: ['tcr_label','tcr_value'],
  template: `
  <p class='row'>
    <span class='column'>{{tcr_label}}</span>
    <span class='column'><strong>{{tcr_value}}</strong></span>
  </p>
  `
})
