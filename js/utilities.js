// WAFERS: Created by Jack Neylon, Phd, DABR (v0.2-2019.11.05)

Vue.component('report-header', {
  props: ['rh_title'],
  template: `
  <div>
    <img src='data/cohlogo.jpg'/>
    <h4>Department of Radiation Oncology</h4>
    <h3>{{rh_title}}</h3>
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

Vue.component('four-column-row', {
  props: ['tcr_label','tcr_value','tcr_label_2','tcr_value_2'],
  template: `
  <p class='row'>
    <span class='column_x4'>{{tcr_label}}</span>
    <span class='column_x4'><strong>{{tcr_value}}</strong></span>
    <span class='column_x4'>{{tcr_label_2}}</span>
    <span class='column_x4'><strong>{{tcr_value_2}}</strong></span>
  </p>
  `
})
