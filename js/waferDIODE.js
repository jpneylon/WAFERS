// WAFERS: Created by Jack Neylon, PhD, DABR (v0.3-2019.11.16)

Vue.component('wafer-diode-print', {
  props: {
    p_counter: Number,
    p_title: String,
    p_energies: Array,
    p_fields: Array
  },
  computed: {
    column_width: function() {
      var wid = (100.0 / this.p_counter).toFixed(2);
      return("width:" + wid + "%");
    }
  },
  methods: {
    percent_diff: function(test,truth) {
      return( 100.0 * (truth - test) / truth );
    },
    measuredDose: function(fd) {
      var calc_dose = fd.tx_rdg * fd.daily_mu / fd.daily_rdg;
      calc_dose *= (fd.muc_mu / fd.tps_mu);
      calc_dose *= (fd.tx_ssd / fd.tps_ssd) * (fd.tx_ssd / fd.tps_ssd);
      return(calc_dose.toPrecision(5));
    },
    assessDiode: function(fd) {
      var tx_dose = this.measuredDose(fd);
      var pct_diff = this.percent_diff(tx_dose,fd.muc_diode);

      var checker = "OK";
      if (pct_diff > 10)
      {
        checker = "Re-Measure";
      }
      else if (pct_diff < -10)
      {
        checker = "Re-Measure";
      }
      var pct_print = pct_diff.toPrecision(3);
      return(checker + " (" + pct_print + "%)");
    }
  },
  template: `
  <div>
    <report-header :rh_title="p_title"></report-header>
    <p>&nbsp</p>
    <hr>
    <table style="table-layout: fixed; width: 100%;">
      <tr>
        <td :style="column_width"><strong>Field:</strong></td>
        <td :style="column_width" v-for="field in p_fields">{{field.id}}</td>
      </tr>
      <tr>
        <td><strong>MUC Calculated Dose:</strong</td>
        <td v-for="field in p_fields">{{field.muc_diode}}</td>
      </tr>
      <tr>
        <td><strong>Measured Diode  Dose:</strong></td>
        <td v-for="field in p_fields">{{measuredDose(field)}}</td>
      </tr>
      <tr>
        <td><strong>Within 10%?</strong></td>
        <td v-for="field in p_fields">{{assessDiode(field)}}</td>
      </tr>
    </table>
  </div>
  `
})

Vue. component('wafer-diode', {
  props: {
    w_field: Object,
  },
  data: function () {
    return {
      field_counter: 1,
      headers: ['Field',
                'Beam Energy',
                'Daily Diode MU',
                'Daily Diode Reading',
                'Treatment Plan MU',
                'Treatment Plan SSD (cm)',
                'MUC Calculated MU',
                'MUC Diode Dose (cGy)',
                'Tx Diode SSD (cm)',
                'Tx Diode Reading'],
      energies: [
        {name:'6X',mu:'200',rdg:'385'},
        {name:'10X',mu:'200',rdg:'510'}],
      fields: [
        {id: 1,
        energy: '6X',
        daily_mu: '200',
        daily_rdg: '385',
        tps_mu: '200',
        tps_ssd: '95',
        muc_mu: '200',
        muc_diode: '250',
        tx_ssd: '95',
        tx_rdg: '250'}
      ]
    }
  },
  methods: {
    addField: function() {
      this.field_counter += 1;
      this.fields.push({
                    id: this.field_counter,
                    energy: this.energies[0].name,
                    daily_rdg: this.energies[0].rdg,
                    daily_mu: this.energies[0].mu,
                    tps_mu: '200',
                    tps_ssd: '95',
                    muc_mu: '200',
                    muc_diode: '250',
                    tx_ssd: '95',
                    tx_rdg: '250'})
    },
    removeField: function() {
      this.fields.pop();
      this.field_counter -= 1;
    },
    setDailies: function(fd) {
      if(fd.energy == this.energies[0].name)
      {
        fd.daily_mu = this.energies[0].mu;
        fd.daily_rdg = this.energies[0].rdg;
      }
      else if (fd.energy == this.energies[1].name)
      {
        fd.daily_mu = this.energies[1].mu;
        fd.daily_rdg = this.energies[1].rdg;
      }
    }
  },
  template: `
  <div>
    <div class="no-print">
      <p>&nbsp;</p>
      <fieldset>
        <legend>Please enter additional information:</legend>
        <table>
          <tr>
            <td colspan="3">
              <strong>Enter Daily Morning Diode Calibration:</strong>
            </td>
          </tr>
          <tr>
            <th>Energy</th>
            <th>Delivered MU</th>
            <th>Diode Reading</th>
          </tr>
          <tr v-for="ex in energies">
            <td>{{ex.name}}</td>
            <td><input type="number" v-model="ex.mu"></td>
            <td><input type="number" v-model="ex.rdg"></td>
          </tr>
          <tr>
            <td><strong>Number of Fields: {{field_counter}}</strong></td>
            <td><button @click="addField()">Add Field</button></td>
            <td><button @click="removeField()">Remove Last Field</button></td>
          </tr>
        </table>
        <table style="table-layout: fixed; width: 100%;">
          <tr>
            <th v-for="item in headers"><strong>{{ item }}</strong></th>
          </tr>
          <tr v-for="field in fields">
            <td style="width:5%"><strong><input v-model="field.id" type="number"></strong></td>
            <td style="width:7%">
              <select v-model="field.energy" @change="setDailies(field)" placeholder="Select Beam Energy">
                  <option disabled value="">Select Beam Energy</option>
                  <option v-for="ex in energies" v-bind:value="ex.name">
                      {{ex.name}}
                  </option>
              </select>
            </td>
            <td style="width:11%"><input v-model="field.daily_mu" type="number" placeholder="Enter Daily Delivered MU"></td>
            <td style="width:11%"><input v-model="field.daily_rdg" type="number" placeholder="Enter Daily Diode Reading"></td>
            <td style="width:11%"><input v-model="field.tps_mu" type="number" placeholder="Enter Tx Plan MU"></td>
            <td style="width:11%"><input v-model="field.tps_ssd" type="number" placeholder="Enter Tx Plan SSD (cm)"></td>
            <td style="width:11%"><input v-model="field.muc_mu" type="number" placeholder="Enter MUC Calc'd MU "></td>
            <td style="width:11%"><input v-model="field.muc_diode" type="number" placeholder="Enter MUC Diode Dose (cGy)"></td>
            <td style="width:11%"><input v-model="field.tx_ssd" type="number" placeholder="Enter Delivered SSD (cm)"></td>
            <td style="width:11%"><input v-model="field.tx_rdg" type="number" placeholder="Enter Delivered Diode Reading"></td>
          </tr>
        </table>
      </fieldset>
    </div>
    <wafer-diode-print
              p_title="In-Vivo Dosimetry Verification"
              :p_counter="field_counter"
              :p_energies="energies"
              :p_fields="fields">
    </wafer-diode-print>
  </div>
  `
})
