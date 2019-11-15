// WAFERS: Created by Jack Neylon, Phd, DABR (v0.2-2019.11.05)

Vue.component('muc-column', {
  props: {
    w_id: Number,
    w_machine: Object,
  },
  data: function() {
    return {
      name: 'field',
      machine: new Object(),
      energy: 'energy',
      dose: 0.0,
      ssd: 100.0,
      phys_depth: 10.0,
      eff_depth: 10.0,
      jaw_x: 10.0,
      jaw_y: 10.0,
      tray: 'none',
      block: 0.0,
      wedge: 'none',
      oad: 0.0,
      eq_fs: 10.0,
      blk_eq_fs: 10.0,
      output: 1.0,
      tmr: 1.0,
      w_factor: 1.0,
      oax_factor: 1.0,
      tray_factor: 1.0,
      diode_dose: 100.0,
      calc_mu: 100.0,
      tps_mu: 100.0,
      pct_diff: 0.0,
      machines: [
       {id: 1,
        name:'TrueBeam STX',
        energy: ['6X', '10X']},
       {id: 2,
        name:'TrueBeam 1',
        energy: ['6X', '10X']},
       {id: 3,
        name: 'Arcadia TrueBeam',
        energy: ['6X', '10X', '15X']}
      ],
     wedges: ['10','15','20','25','30','45','60']}
  },
  template: `
  <div>
    <table class="muc_table">
      <tr class="muc_tr"><td><input type="number" v-model="w_id"></td></tr>
      <tr class="muc_tr"><td><input v-model="name" placeholder="Field Name"></td></tr>
      <tr class="muc_tr"><td>
        <select v-model="w_machine">
            <option disabled value="">Select Tx Machine</option>
            <option v-for="mx in machines" v-bind:value="mx">
                {{ mx.name }}
            </option>
        </select>
      </td></tr>
      <tr class="muc_tr"><td>
        <select v-model="energy">
            <option disabled value="">Select Beam Energy</option>
            <option v-for="berg in w_machine.energy" v-bind:value="berg">
                {{ berg }}
            </option>
        </select>
      </td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="dose"></td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="ssd"></td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="phys_depth"></td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="eff_depth"></td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="jaw_x"></td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="jaw_y"></td></tr>
      <tr class="muc_tr"><td>{{tray}}</td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="block"></td></tr>
      <tr class="muc_tr"><td>{{wedge}}</td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="oad"></td></tr>
      <tr class="muc_tr"><td>{{eq_fs}}</td></tr>
      <tr class="muc_tr"><td>{{blk_eq_fs}}</td></tr>
      <tr class="muc_tr"><td>{{output}}</td></tr>
      <tr class="muc_tr"><td>{{tmr}}</td></tr>
      <tr class="muc_tr"><td>{{w_factor}}</td></tr>
      <tr class="muc_tr"><td>{{oax_factor}}</td></tr>
      <tr class="muc_tr"><td>{{tray_factor}}</td></tr>
      <tr class="muc_tr"><td>{{diode_dose}}</td></tr>
      <tr class="muc_tr"><td>{{calc_mu}}</td></tr>
      <tr class="muc_tr"><td><input type="number" v-model="tps_mu"></td></tr>
      <tr class="muc_tr"><td>{{pct_diff}}</td></tr>
    </table>
  </div>
  `
})

Vue.component('wafer-muc', {
  props: {
    w_patient: String,
    w_mrn: String,
    w_physicist: Object,
    w_txdate: Date,
  },
  components: { vuejsDatepicker },
  data: function () {
    return {
      fx_dose: 0.0,
      rx_isodose: 100.0,
      qadate: new Date(),
      tx_machine: new Object(),
      machines: [
       {id: 1,
        name:'TrueBeam STX',
        energy: ['6X', '10X']},
       {id: 2,
        name:'TrueBeam 1',
        energy: ['6X', '10X']},
       {id: 3,
        name: 'Arcadia TrueBeam',
        energy: ['6X', '10X', '15X']}
      ],
      fields: {
        id: ['Field #'],
        name: ['Field Name'],
        machine: ['Machine'],
        energy: ['Energy'],
        dose: ['Dose/Field'],
        ssd: ['SSD (cm)'],
        phys_depth: ['Physical Depth (cm)'],
        eff_depth: ['Effective Detph (cm)'],
        jaw_x: ['Field Width, X (cm)'],
        jaw_y: ['Field Length, Y (cm)'],
        tray: ['Tray'],
        block: ['% Block/Flash'],
        wedge: ['Wedge'],
        oad: ['Off Axis Distance (cm)'],
        eq_fs: ['Eq. FS'],
        blk_eq_fs: ['Eff. Blocked FS'],
        output: ['Output Factor'],
        tmr: ['TMR'],
        w_factor: ['Wedge Factor'],
        oax_factor: ['OAX Factor'],
        tray_factor: ['Tray Factor'],
        diode_dose: ['Diode Dose (cGy)'],
        calc_mu: ['Calc MU'],
        tps_mu: ['TPS MU'],
        pct_diff: ['% Difference']},
      field_counter: 1,
    }
  },
  template: `
  <div>
    <div class="no-print">
      <p>&nbsp;</p>
      <fieldset>
        <legend>Please fill out additional information:</legend>
        <table>
          <tr>
            <td>Treatment Machine</td>
            <td>
              <select v-model="tx_machine" @change="qa_chamber=setChamber(),tx_energy=setEnergy()" placeholder="Select the Treatment Machine">
                  <option disabled value="">Select the Treatment Machine</option>
                  <option v-for="mx in machines" v-bind:value="mx">
                      {{ mx.name }}
                  </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Prescription Dose per Fraction (cGy)</td>
            <td><input type="number" v-model.number="fx_dose" placeholder="Enter Fractional Rx Dose"></td>
          </tr>
          <tr>
            <td>Prescription Isodose Line</td>
            <td><input type="number" v-model.number="rx_isodose" placeholder="Enter %IDL"></td>
          </tr>
          <tr>
            <td>Plan Check Date</td>
            <td><vuejs-datepicker name="update_qadate" :value="qadate" v-model="qadate" format="d MMMM yyyy"></vuejs-datepicker></td>
          </tr>
          <tr>
            <td><button @click="field_counter+=1">Add Field</button></td>
            <td><button @click="field_counter-=1">Remove Last Field</button></td>
          </tr>
        </table>
      </fieldset>
      <hr>
      <p>&nbsp;</p>
    </div>

    <report-header rh_title="MU Calculation Worksheet"></report-header>
    <p>&nbsp;</p>
    <four-column-row
        tcr_label="Patient Name:"
        v-bind:tcr_value="w_patient"
        tcr_label_2="MRN:"
        v-bind:tcr_value_2="w_mrn">
    </four-column-row>
    <four-column-row
        tcr_label="Prescription:"
        v-bind:tcr_value="fx_dose + 'cGy'"
        tcr_label_2="% IDL:"
        v-bind:tcr_value_2="rx_isodose + '%'">
    </four-column-row>
    <hr style="clear:both">
    <p>
      <span style="width:13%;float:left">
        <table class="muc_header">
          <tr class="muc_tr" v-for="obj in fields">
            <td v-for="item in obj">
              <strong>{{item}}</strong>
            </td>
          </tr>
        </table>
      </span>
      <span v-for="n in field_counter" style="width:12%;float:left">
        <muc-column :w_id="n" :w_machine="tx_machine"></muc-column>
      </span>
    </p>
    <p style="clear:both">&nbsp;</p>
    <hr>
    <h5>Physicist Performing Calculation: {{ w_physicist.firstname }} {{ w_physicist.lastname }}, PhD, DABR<span style="float:right">Date: {{qadate.toDateString()}}</span></h5>
  </div>
  `
})
