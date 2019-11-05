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
        chamber: 3,
        name:'Tomo 2',
        energy: ['6X']},
      ],
      chambers: [
        {id: 1,
         model: 'PTW TN31006',
         serial: 'SN0304',
         factor: 237.3,
         units: 'cGy/nC'},
        {id: 2,
         model: 'Exradin A1SL',
         serial: 'XW040651',
         factor: 55.55,
         units: 'cGy/nC'},
        {id: 3,
         model: 'PTW TN30013',
         serial: '010174',
         factor: 5.384,
         units: 'cGy/nC'},
        {id: 4,
         model: 'PTW TN30013',
         serial: '011070',
         factor: 5.526,
         units: 'cGy/nC'},
      ]
    }
  },
  computed: {
    tp_correction: function() {
      var pres = this.pressure;
      if (this.p_unit === 'inHg')
      {
        pres = this.pressure * 25.4;
      }
       temp = this.temperature;
      if (this.t_unit == 'F')
      {
        temp = (this.temperature - 32) * 5 / 9;
      }
      temp += 273.0;
      return(temp); //((273 + temp) * 760 / 295 / pres);
    }
  },
  template: `
  <div>
    <div class="no-print">
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
            <select v-model="tx_machine" placeholder="Select the Treatment Machine">
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
          <td>TPS Calculated Mean Dose to the Chamber</td>
          <td><input v-model="tps_dose" placeholder="Enter TPS Dose"></td>
          <td>Gy</td>
          <td></td>
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
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Cumulative Ion Chamber Reading</td>
          <td><input v-model="qa_measurement" placeholder="Enter Electrometer Reading"></td>
          <td>nC</td>
          <td></td>
        </tr>
        <tr>
          <td>Enter any additional comments to include in report.</td>
          <td colspan='3'><input v-model="comments" placeholder="Enter Comments"></td>
        </tr>
      </table>
      </fieldset>
      <hr>
      <p>&nbsp;</p>
    </div>

    <img src='data/cohlogo.jpg'/>
    <h3>IMRT Plan QA Report</h3>
    <h4>Radiation Oncology</h4>
    <h4>City of Hope National Medical Center</h4>

    <p>&nbsp;</p>
    <p>Patient Name: \t <strong>{{ w_patient }}</strong></p>
    <p>MRN: \t <strong>{{ w_mrn }}</strong></p>
    <p>IMRT Treatment Plan: \t <strong>{{ plan }}</strong></p>
    <p>Treatment Machine: \t <strong>{{ tx_machine.name }}</strong></p>
    <p>Beam Energy: \t <strong>{{ tx_energy }}</strong></p>
    <p>QA Procedure Date: \t <strong>{{ qadate.toDateString() }}</strong></p>
    <p>Ion Chamber Model: \t <strong>{{ qa_chamber.model }}</strong></p>
    <p>Ion Chamber Serial Number: \t <strong>{{qa_chamber.serial}}</strong></p>
    <p>Ion Chamber Calibration Factor: \t <strong>{{qa_chamber.factor}}</strong> {{qa_chamber.units}}</p>
    <p>Room Temperature, T = {{ temperature }} {{ t_unit }}  |  Room Air Pressure, P = {{ pressure }} {{ p_unit }}</p>
    <p>Air Density Correction = <strong>{{ tp_correction }}</strong></p>
    <hr>
    <p>&nbsp;</p>
    <p>Cumulative Ion Chamber Reading, Q = --blank-- nC</p>
    <p>Measured Dose, D = N x Ctp x Q = --blank-- Gy</p>
    <p>Calculated Dose per IMRT Plan = {{tps_dose}} Gy</p>
    <p>Dose Percent Difference = --blank-- %</p>
    <p>&nbsp;</p>
    <p>Comments:</p>
    <p>{{comments}}</p>

    <p>&nbsp;</p>
    <hr>
    <p>Physicist performing analysis:</p>
    <h5>{{ w_physicist.firstname }} {{ w_physicist.lastname }}, PhD, DABR<span style="float:right">Date: {{qadate.toDateString()}}</span></h5>
    <h5>Radiation Physicist</h5>
  </div>
  `
})
