(function() {
  'use strict';

  angular
      .module('npng')
      .service('npng', npng);

  /** @ngInject */
  function npng() {
    var npng = {};
    
    var STATIC = {
      key: 'npng'
    };
    
    
    function Gain(name, amount){
      this.name = name;
      this.amount = amount;
    }
    
    
    
    //init data
    var dataStaging = localStorage.getItem(STATIC.key);
    var data = (typeof dataStaging === 'string') ? JSON.parse(dataStaging) : {
      user: [
        {
          name: 'Default',
          stats: {
            current: 0,
            total: 0
          },
          gains: {
            current: [
              
            ] ,
            history: [
              
            ]
          },
          calendar: [
            
          ]
        }
      ]
    };
    var currentUser = 0;
    console.log('data', data);
     
    //private functions
    function _save(){
      localStorage.setItem(STATIC.key, JSON.stringify(data));
    } 
    
    function _addToCalendar(amount){
      var d = new Date();
      var key = d.getFullYear()*100 + d.getMonth()+1;
      var found = false;
      data.user[currentUser].calendar.forEach(function(rec){
        if (rec.key === key){
          rec.amount += amount;
          rec.dateUpdated = new Date();
          found = true;
        }
      })
      
      if (!found){ //new month
        data.user[currentUser].calendar.push({
          key: key,
          amount: amount,
          dateUpdated: new Date()
        });
      }
    }
    
     

    //change user
    function setUser(id) {
      if (data[id]){
        npng.data = data.user[currentUser = id];
      } 
    }
    
    //add current
    function addPain(amount){
      data.user[currentUser].stats.current += amount;
      _save();
    }
    
    //add gain
    function addGain(name, amount){
      amount = parseFloat(amount, 10);
      if (isNaN(amount) || !name){
        return false;
      }
      //rount to 0,5
      amount = (Math.ceil(amount * 10 / 5) * 5) / 10;
      
      var gain = new Gain(name, amount);
      data.user[currentUser].gains.current.unshift(gain);
      _save();
    }
    
    //delete gain
    function dropGain(index){
      data.user[currentUser].gains.current.splice(index,1);
      _save();
    }
    
    //gain gain
    function earnGain(index){
      var userData = data.user[currentUser];
     
      if (userData.gains.current[index] && userData.gains.current[index].amount <= userData.stats.current){
        var gain = userData.gains.current.splice(index,1)[0];        
        userData.stats.current -= gain.amount;
        userData.stats.total += gain.amount;
        gain.dataHistory = new Date().getTime();
        userData.gains.history.unshift(gain);
        _addToCalendar(gain.amount);
        _save();
      }
    }
    
    //public interfaces
    npng.data = data.user[currentUser];
    npng.setUser = setUser;
    npng.addPain = addPain;
    npng.addGain = addGain;
    npng.dropGain = dropGain;
    npng.earnGain = earnGain;
    return npng;
        
  }

})();
