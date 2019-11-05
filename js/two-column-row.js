Vue.component('two-column-row', {
  props: ['tcr_label','tcr_value'],
  template: `
  <p class='row'>
    <span class='column'>{{tcr_label}}</span>
    <span class='column'><strong>{{tcr_value}}</strong></span>
  </p>
  `
})
