// WAFERS: Created by Jack Neylon, Phd, DABR (v0.2-2019.11.05)

Vue.component('wafer-edwf', {
  data: function () {
    return {
      tx_machine: new Object(),
      tx_energy: '',
      tx_wedge: '',
      tx_field_number: '',
      tx_field_name: '',
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
     wedges: ['10','15','20','25','30','45','60'],
     poc_position: 0.0,
     toe_position: 0.0
    }
  },
  computed: {
    edw_factor: function() {
      var a_0 = -0.0496;
      var a_1 = 1.194;
      var b_1 = 0.09054;
      var w_60 = Math.tan( Math.PI * this.tx_wedge / 180.0 ) / Math.tan( Math.PI / 3.0);
      var w_open = 1.0 - w_60;
      if (this.tx_energy != '6X')
      {
        if (this.tx_machine.name == 'Arcadia TrueBeam')
        {
          a_0 = -0.0708;
          a_1 = 1.1977;
          b_1 = 0.07607;
        }
        else
        {
          a_0 = -0.0818;
          a_1 = 1.1968;
          b_1 = 0.07054;
        }
      }
      var t_1 = w_open * (a_0 + a_1);
      var t_2 = w_60 * (a_0 + a_1 * Math.exp(b_1 * this.poc_position));
      var t_3 = w_60 * a_1 * b_1 * 0.132 * Math.exp(0.162 * this.poc_position);
      var t_4 = (Math.exp((b_1 - 0.162)*(this.toe_position - 0.5)) - Math.exp((b_1 - 0.162)*this.poc_position)) / -0.07146;
      var t_5 = Math.exp(2.0 * b_1 * this.poc_position);
      var t_6 = (Math.exp(-1 * (b_1 + 0.162) * (this.toe_position - 0.5)) - Math.exp(-1 * (b_1 + 0.162) * this.poc_position)) / (b_1 + 0.162);
      var t_7 = w_60 * (a_0 + a_1 * Math.exp(b_1 * (this.toe_position - 0.5)));

      var edwf = (t_1 + t_2 + (t_3 * (t_4 + (t_5 * t_6)))) / (t_1 + t_7);

      return(edwf);
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
          <td>Treatment Field Number</td>
          <td><input type="number" v-model="tx_field_number" placeholder="Enter Tx Field Number"></td>
        </tr>
        <tr>
          <td>Treatment Field Name</td>
          <td><input v-model="tx_field_name" placeholder="Enter Tx Field Name"></td>
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
        </tr>
        <tr>
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
          <td>Wedge Angle</td>
          <td>
            <select v-model="tx_wedge" placeholder="Select the Wedge Angle">
                <option disabled value="">Select the Wedge Angle</option>
                <option v-for="berg in wedges" v-bind:value="berg">
                    {{ berg }}
                </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>POC Distance from CAX (cm)</td>
          <td title="Towards Heel is negative. Towards Toe is positive."><input v-model="poc_position" placeholder="Enter POC Off-Axis value in cm"></td>
        </tr>
        <tr>
          <td>Position of Fixed Jaw (Toe) (cm)</td>
          <td title="Toe is Fixed Jaw"><input v-model="toe_position" placeholder="Enter Position of Fixed Jaw in cm"></td>
        </tr>
      </table>
      </fieldset>
      <hr>
      <p>&nbsp;</p>
    </div>

    <report-header rh_title="EDW Output Factor"></report-header>

    <p>&nbsp;</p>
    <two-column-row tcr_label="Treatment Field:" v-bind:tcr_value="tx_field_number + ' : ' + tx_field_name"></two-column-row>
    <two-column-row tcr_label="Treatment Machine:" v-bind:tcr_value="tx_machine.name"></two-column-row>
    <two-column-row tcr_label="Beam Energy:" v-bind:tcr_value="tx_energy"></two-column-row>
    <two-column-row tcr_label="Wedge Angle:" v-bind:tcr_value="tx_wedge + ' deg'"></two-column-row>
    <two-column-row tcr_label="POC Distance from CAX =" v-bind:tcr_value="poc_position  + ' cm'"></two-column-row>
    <two-column-row tcr_label="Position of Fixed Jaw =" v-bind:tcr_value="toe_position  + ' cm'"></two-column-row>
    <hr>
    <two-column-row tcr_label="EDW Output Factor =" v-bind:tcr_value="edw_factor.toFixed(3)"></two-column-row>
  </div>
  `
})
