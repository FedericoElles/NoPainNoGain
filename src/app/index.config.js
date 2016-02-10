(function() {
  'use strict';

  angular
    .module('npng')
    .config(config);

  /** @ngInject */
  function config($logProvider, $translateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $translateProvider.translations('en', {
      TITLE_ACCOUNT: 'Balance',
      TITLE_GOALS: 'Gains',
      TITLE_GOALS_SUCCEEDED: 'Gained',
      TITLE_BALANCE_TOTAL: 'All time balance',
      TITLE_HISTORY: 'History',
      //
      GOAL: 'Gain',
      PROGRESS: 'Progress',
      DATE: 'Date',
      GAIN: 'Gain',
      YEAR: 'Year',
      MONTH: 'Month',
      ACCOUNT: 'Account',
      GOALS: 'Gains',
      GOALS_MET: 'Succeed',

      //
      NEW_GOAL: 'New gain',
      DESCRIPTION: 'Description',
      AMOUNT: 'Costs',
      GOAL_DROP: 'Delete gain',
      GOAL_SUCCEED: 'Mark gain as succeeded',
      GOAL_DROP_REALLY: ' to be deleted?',
      GOAL_SUCCEED_REALLY: ' has been aquired?',      
      CONFIRM: 'Confirm',
      CANCEL: 'Cancel'
    });
    $translateProvider.translations('de', {
      TITLE_ACCOUNT: 'Kontostand',
      TITLE_GOALS: 'Ziele',
      TITLE_GOALS_SUCCEEDED: 'Erfüllte Wünsche',
      TITLE_BALANCE_TOTAL: 'Ewiger Kontostand',
      TITLE_HISTORY: 'Historie',
      //
      GOAL: 'Ziel',
      PROGRESS: 'Fortschritt',
      DATE: 'Datum',
      GAIN: 'Gain',
      YEAR: 'Jahr',
      MONTH: 'Monat',
      ACCOUNT: 'Konto',
      GOALS: 'Ziele',
      GOALS_MET: 'Erreicht',

      //
      NEW_GOAL: 'Neues Ziel',
      DESCRIPTION: 'Beschreibung',
      AMOUNT: 'Kosten',
      GOAL_DROP: 'Ziel löschen',
      GOAL_SUCCEED: 'Ziel erreicht',
      GOAL_DROP_REALLY: ' wirklich löschen?',
      GOAL_SUCCEED_REALLY: ' jetzt erfolgreich einlösen?',      
      CONFIRM: 'Bestätigen',
      CANCEL: 'Abbrechen'
    });    
    $translateProvider.useSanitizeValueStrategy(null);    
  }


})();
