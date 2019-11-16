// WAFERS: Created by Jack Neylon, PhD, DABR (v0.3-2019.11.16)

Vue.component('wafer-diode-print', {
  props: {
    p_field: Object,
  },
  template: `
<div>
  <report-header rh_title="In-Vivo Dosimetry Verification"></report-header>
</div>
  `
})

Vue. component('wafer-diode', {
  props: {
    w_field: Object,
  },
  template: `
  <div>
    <div class="no-print">
      <p>&nbsp;</p>
      <fieldset>
        <legend>Please enter additional information:</legend>
        <table>
        </table>
      </fieldset>
    </div>
    <wafer-diode-print></wafer-diode-print>
  </div>
  `
})
