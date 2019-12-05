// WAFERS: Created by Jack Neylon, Phd, DABR (v0.2-2019.11.05)

var app = new Vue({
  el: '#app',
  components: { vuejsDatepicker },
  data: {
    message: 'Container for Wafers',
    patient: '',
    mrn: '',
    rxdose: '',
    fractions: '',
    txdate: new Date(),
    rxdate: new Date(),
    physician: new Object(),
    physicist: new Object(),
    showHOME: true,
    showWAFER: 0,
    doctitle: 'WAFERS',
    docs:[
        {id:1,lastname:'Amini',firstname:'Arya'},
        {id:2,lastname:'Chen',firstname:'YiJen'},
        {id:3,lastname:'Dandapani',firstname:'Savita'},
        {id:4,lastname:'Glaser',firstname:'Scott'},
        {id:5,lastname:'Radany',firstname:'Eric'},
        {id:6,lastname:'Sampath',firstname:'Sagus'},
        {id:7,lastname:'Vora',firstname:'Nayana'},
        {id:8,lastname:'Wong',firstname:'Jeffrey'}
      ],
    nerds: [
        {id:'1',lastname:'Du',firstname:'Dongsu'},
        {id:'2',lastname:'Han',firstname:'Chunhui'},
        {id:'3',lastname:'Liang',firstname:'Iris'},
        {id:'4',lastname:'Liu',firstname:'An'},
        {id:'5',lastname:'Neylon',firstname:'Jack'},
        {id:'6',lastname:'Sun',firstname:'Sean'},
        {id:'7',lastname:'Zhang',firstname:'Sean'}
      ],
  },
  methods: {
    updateTitle: function(new_title) {
      this.doctitle = "WAFERS-" + this.mrn + "-" + new_title;
      document.title = this.doctitle;
    },
    resetTitle: function() {
      this.doctitle = "WAFERS";
      document.title = this.doctitle;
    },
    toggleShow: function(showSwitch) {
      if (showSwitch) {
        return(false)
      }
      else {
        return(true)
      }
    }
  }
})
