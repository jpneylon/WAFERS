// WAFERS: Created by Jack Neylon, Phd, DABR (v0.2-2019.11.05)

Vue.component('wafer-spc', {
  props: {
    w_patient: String,
    w_mrn: String,
    w_physician: Object,
    w_physicist: Object,
    w_rxdate: Date,
    w_txdate: Date,
  },
  data: function () {
    return {
     tasks:[
      {id:1,
       show: false,
       text:'4DCT',
       request:'4DCT fusion to generate ITV/PTV',
       purpose:'Please use 4DCT to create AIP and MIP CT datasets for target contouring and generation of ITV and PTV.',
       action:'AIP and MIP CT datasets were generated and registered for contouring.'},
      {id:2,
       show: false,
       text:'Breath Hold',
       request:'Breath-Hold Treatment Planning',
       purpose:'Please generate the treatment plan using breath-hold technique. This requires the use of breath-hold computed tomography, and application of proper gating threshold at the time of treatment.',
       action:'The treatment plan was generated using breath-hold technique. The treatment plan made use of a breath-hold CT simulation. The plan was approved and included in the electron record. The plan will be used to guide the gating threshold for treatment.'},
      {id:3,
       show: false,
       text:'HDR Treatement',
       request:'HDR Source Strength Verification and HDR Treatment Delivery',
       purpose:'This patient will receive high dose-rate (HDR) brachytherapy. Please verify the accuracy of the current Ir-192 source strength as used for treatment delivery. Also please perform necessary QA procedures to ensure the accuracy of HDR treatment delivery.',
       action:'The HDR Ir-192 source strength as used in the treatment plan was verified to match the actual source strength in the HDR unit. The radioactivity in the treatment planning system matched the HDR control console. Proper QA has been performed to verify the accuracy of treatment delivery.'},
       {id:4,
        show: false,
        text:'Recreation of Previous Dose',
        request:'Recreation of Previous Dose for Treatment Planning',
        purpose:'Please recreate the dose distribution for previously delivered radiotherapy treatment ot the above patient.',
        action:'Digital data for the previously delivered treatment to the above patient was retrieved from the outside treating facility, and the previously delivered dose was recreated as requested. The recreated dose distribution is included in the Eclipse treatment planning system for review to help treatment planning.'},
      {id:5,
        show: false,
        text:'TBI Dose Uniformity',
        request:'TBI Dose Uniformity at Patient Mid-Plane',
        purpose:'The above patient will receive TBI treatment. Please perform dosimetric measurement and analysis to ensure the mid-plane dose is uniform: within +/- 5% of the prescribed dose above the central axis of the fields, and within +/- 10% below the central axis.',
        action:'The following procedures were performed to ensure dose uniformity for the above patient: 1. Based on anterior-posterior thickness measurements in multiple locations along the length of the patient, proper attenuation filters were constructed for photon fields to deliver uniform mid-plane dose along the length of the patient. 2. In-vivo dosimetric measurements and analysis were performed during the TBI treatment to verify mid-plane dose uniformity. The mid-plane dose results were calculated and saved in the patient chart.'},
      {id:6,
        show: false,
        text:'TBI Lung Dose',
        request:'Determining Lung Dose from TBI Electron Boost to Chest Wall',
        purpose:'Please perform a dosimetric calculation on the above patient who will be received chest wall boost to ensure that electron fields match the shape of the lung blocks appropriately and bring the chest wall dose up to the prescribed dose.',
        action:'Using electron fields matching the shape of the lung blocks, a dosimetric calcualtion on the above patient was performed to ensure taht the chest wall received the prescribed dose. This was accomplished by subtracting the dose given by the blocked x-ray fields from the prescribed dose and determining the appropriate monitor units for the electron fields.'}
    ]}
  },
  template: `
  <div>
    <div class="no-print">
      <p>&nbsp;</p>
      <fieldset>
      <legend>Select all that apply:</legend>
      <table>
        <tr v-for="task in tasks">
          <td>
            <input type="checkbox" v-model="task.show" id="task.id">
            <label for="task.id">{{task.text}}</label>
          </td>
        </tr>
      </table>
      </fieldset>
      <hr>
      <p>&nbsp;</p>
    </div>

    <report-header rh_title="Special Medical Physics Consult Report"></report-header>

    <p>&nbsp;</p>
    <p>Date: <strong>{{ w_rxdate.toDateString() }}</strong></p>
    <p>To: Radiation Physicist</p>
    <p>Request From: <strong>{{ w_physician.firstname }} {{ w_physician.lastname }}, MD</strong></p>
    <p>Patient Name: <strong>{{ w_patient }}</strong></p>
    <p>MRN: <strong>{{ w_mrn }}</strong></p>
    <p v-for="task in tasks" v-if="task.show">
      Request: {{task.request}}<br>
      Purpose: {{ task.purpose }}<br>
    </p>
    <p>&nbsp;</p>

    <hr>
    <p>Date: <strong>{{ w_txdate.toDateString() }}</strong></p>
    <p>To: <strong>{{ w_physician.firstname }} {{ w_physician.lastname }}, MD</strong></p>
    <p v-for="task in tasks" v-if="task.show">
      Regarding request: {{task.request}}<br>
      Actions taken: {{ task.action }} <br>
    </p>
    <p>&nbsp;</p>

    <h5>{{ w_physicist.firstname }} {{ w_physicist.lastname }}, PhD, DABR</h5>
    <h5>Radiation Physicist</h5>
  </div>
  `
})
