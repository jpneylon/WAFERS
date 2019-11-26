// WAFERS: Created by Jack Neylon, Phd, DABR (v0.2-2019.11.05)

Vue.component('wafer-imrt', {
  props: {
    w_patient: String,
    w_mrn: String,
    w_physicist: Object,
    w_txdate: Date,
  },
  components: { vuejsDatepicker },
  data: function () {
    return {
      plan: '',
      tps_dose: 0.0,
      comments: '',
      temperature: 22.0,
      t_unit: 'C',
      p_unit: 'inHg',
      pressure: 29.5,
      t_units: ['C', 'F'],
      p_units: ['inHg', 'mmHg'],
      tx_machine: new Object(),
      tx_energy: '',
      qa_chamber: new Object(),
      qadate: new Date(),
      qa_measurement: 0.0,
      apply_trs483: false,
      machines: [
       {id: 1,
        chamber: 1,
        name:'TrueBeam STX',
        energy: ['6X', '6X-FFF', '10X', '10X-FFF']},
       {id: 2,
        chamber: 2,
        name:'TrueBeam 1',
        energy: ['6X', '6X-FFF', '10X', '10X-FFF']},
       {id: 3,
        chamber: 3,
        name:'Tomo 1',
        energy: ['6X']},
       {id: 4,
        chamber: 4,
        name:'Tomo 2',
        energy: ['6X']},
      ],
      chambers: [
        {id: 1,
         model: 'PTW TN31006',
         serial: 'SN0304',
         factor: 237.3,
         units: 'cGy/nC',
         trs483: 1.04},
        {id: 2,
         model: 'Exradin A1SL',
         serial: 'XW040651',
         factor: 55.55,
         units: 'cGy/nC',
         trs483: 1.04},
        {id: 3,
         model: 'PTW TN30013',
         serial: '010174',
         factor: 5.384,
         units: 'cGy/nC',
         trs483: 1.00},
        {id: 4,
         model: 'PTW TN30013',
         serial: '011070',
         factor: 5.426,
         units: 'cGy/nC',
         trs483: 1.00},
      ]
    }
  },
  computed: {
    tp_correction: function() {
      var pres = parseFloat(this.pressure);
      if (this.p_unit === 'inHg')
      {
        pres *= 25.4;
      }
      var temp = parseFloat(this.temperature);
      if (this.t_unit == 'F')
      {
        temp -= 32.0;
        temp *= (5 / 9);
      }
      return((273 + temp) * 760 / 295 / pres);
    },
    qa_dose: function() {
      var icd = 0.01 * parseFloat(this.qa_chamber.factor) * parseFloat(this.tp_correction) * parseFloat(this.qa_measurement);
      if (this.apply_trs483){
        icd *= parseFloat(this.qa_chamber.trs483);
      }
      return(icd);
    },
    qa_result: function() {
      var diff = parseFloat(this.qa_dose) - parseFloat(this.tps_dose);
      diff /= parseFloat(this.tps_dose);
      return (100.0 * diff);
    }
  },
  methods: {
    setChamber: function() {
      return(this.chambers[this.tx_machine.chamber-1])
    },
    setEnergy: function() {
      return(this.tx_machine.energy[0])
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
          <td>IMRT Treatment Plan:</td>
          <td><input v-model="plan" placeholder="Enter Tx Plan Name"></td>
          <td>QA Procedure Date</td>
          <td><vuejs-datepicker name="update_qadate" :value="qadate" v-model="qadate" format="d MMMM yyyy"></vuejs-datepicker></td>
        </tr>
        <tr>
          <td>Temperature</td>
          <td><input type="number" v-model="temperature" placeholder="Enter Temperature"></td>
          <td>Choose Scale</td>
          <td>
            <select v-model="t_unit" placeholder="Temperature Scale">
                <option disabled value="">Select the Temperature Scale</option>
                <option v-for="unit in t_units" v-bind:value="unit">
                    {{ unit }}
                </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td><input type="number" v-model="pressure" placeholder="Enter Pressure"></td>
          <td>Choose Units</td>
          <td>
            <select v-model="p_unit" placeholder="Pressure Scale">
                <option disabled value="">Select the Pressure Scale</option>
                <option v-for="unit in p_units" v-bind:value="unit">
                    {{ unit }}
                </option>
            </select>
          </td>
        </tr>
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
          <td>Treatment Energy</td>
          <td>
            <select v-model="tx_energy" placeholder="Select the Beam Energy">
                <option disabled value="">Select the Beam Energy</option>
                <option v-for="berg in tx_machine.energy" v-bind:value="berg">
                    {{ berg }}
                </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Ion Chamber</td>
          <td>
            <select v-model="qa_chamber" placeholder="Select the Ion Chamber">
                <option disabled value="">Select the Ion Chamber</option>
                <option v-for="ic in chambers" v-bind:value="ic">
                    {{ ic.model }} - {{ ic.serial }}
                </option>
            </select>
          </td>
          <td colspan='2'></td>
        </tr>
        <tr>
          <td>
            <div>
              <input type="checkbox" v-model="apply_trs483" id="sfcf">
              <label for="scfc">Apply a small field correction factor?</label>
            </div>
          </td>
          <td colspan='3'>Appropriate for fields with an MLC aperture <= 1cm diameter. See TRS-483 from the IAEA for more information.</td>
        </tr>
        <tr>
          <td>Enter Any Additional Comments To Be Included In The Report</td>
          <td colspan='3'><input v-model="comments" placeholder="Enter Comments" style="width:100%"></td>
        </tr>
        <tr>
          <td>TPS Calculated Mean Dose to the Chamber (Gy)</td>
          <td><input v-model="tps_dose" placeholder="Enter TPS Dose"></td>
          <td colspan='2'></td>
        </tr>
        <tr>
          <td>Cumulative Ion Chamber Reading (nC)</td>
          <td><input v-model="qa_measurement" placeholder="Enter Electrometer Reading"></td>
          <td colspan='2'></td>
        </tr>
      </table>
      </fieldset>
      <hr>
      <p>&nbsp;</p>
    </div>

    <report-header rh_title="IMRT Plan QA Report"></report-header>

    <p>&nbsp;</p>
    <two-column-row tcr_label="Patient Name:" v-bind:tcr_value="w_patient"></two-column-row>
    <two-column-row tcr_label="MRN:" v-bind:tcr_value="w_mrn"></two-column-row>
    <two-column-row tcr_label="IMRT Treatment Plan:" v-bind:tcr_value="plan"></two-column-row>
    <two-column-row tcr_label="Treatment Machine:" v-bind:tcr_value="tx_machine.name"></two-column-row>
    <two-column-row tcr_label="Beam Energy:" v-bind:tcr_value="tx_energy"></two-column-row>
    <two-column-row tcr_label="Procedure Date:" v-bind:tcr_value="qadate.toDateString()"></two-column-row>
    <two-column-row tcr_label="Ion Chamber Model:" v-bind:tcr_value="qa_chamber.model"></two-column-row>
    <two-column-row tcr_label="Ion Chamber S/N:" v-bind:tcr_value="qa_chamber.serial"></two-column-row>
    <p>Room Temperature, T = {{ temperature }} {{ t_unit }}  |  Room Air Pressure, P = {{ pressure }} {{ p_unit }}</p>

    <hr>
    <two-column-row tcr_label="Ion Chamber Calibration Factor, N =" v-bind:tcr_value="qa_chamber.factor  + ' cGy/nC'"></two-column-row>
    <two-column-row tcr_label="Air Density Correction, Ctp =" v-bind:tcr_value="tp_correction.toFixed(3)"></two-column-row>
    <two-column-row tcr_label="Cumulative Ion Chamber Reading, Q =" v-bind:tcr_value="qa_measurement  + ' nC'"></two-column-row>
    <two-column-row tcr_label="Measured Dose, D = N x Ctp x Q =" v-bind:tcr_value="qa_dose.toFixed(2) + ' Gy'"></two-column-row>
    <two-column-row tcr_label="Calculated Dose per IMRT Plan =" v-bind:tcr_value="tps_dose  + ' Gy'"></two-column-row>
    <two-column-row tcr_label="Dose Percent Difference =" v-bind:tcr_value="qa_result.toFixed(2) + ' %'"></two-column-row>

    <p>&nbsp;</p>
    <p>Comments:</p>
    <p>{{comments}}</p>
    <p v-if="apply_trs483">Small field correction factor of 4% applied to IC reading due to an MLC-defined aperture of 1cm or less in diameter, according to TRS 483 report on small field dosimetry.</p>

    <p>&nbsp;</p>
    <hr>
    <p>Physicist performing analysis:</p>
    <h5>{{ w_physicist.firstname }} {{ w_physicist.lastname }}, PhD, DABR<span style="float:right">Date: {{qadate.toDateString()}}</span></h5>
    <h5>Radiation Physicist</h5>
  </div>
  `
})
