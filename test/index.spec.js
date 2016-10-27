'use strict';
/*jslint esversion: 6 */

const { expect } = require('chai');
const later = require('later');

const formatSchedule = require('../index');

describe('format-schedule', () => {

  const testCases = [
    {
        it: 'should format hourly schedule',
        input: later.parse.recur().every().hour(),
        expect: 'Täglich stündlich'
    },
    {
      it: 'should format daily schedule',
      input: later.parse.recur().on(7).hour(),
      expect: 'Täglich um 7:00 Uhr'
    },
    {
      it: 'should format complex daily schedule',
      input: later.parse.recur().on([ 7, 14, 20 ]).hour(),
      expect: 'Täglich um 7:00, 14:00 und 20:00 Uhr'
    },
    {
      it: 'should format weekly schedule',
      input: later.parse.recur().on(2).dayOfWeek().on(7).hour(),
      expect: 'Montags um 7:00 Uhr'
    },
    {
      it: 'should format complex weekly schedule',
      input: later.parse.recur().on([ 2, 4, 6 ]).dayOfWeek().on(7).hour(),
      expect: 'Montags, Mittwochs und Freitags um 7:00 Uhr'
    },
    {
      it: 'should format complex weekly schedule - pt 2',
      input: later.parse.recur().on([ 3, 5, 7, 1 ]).dayOfWeek().on(7).hour(),
      expect: 'Dienstags, Donnerstags, Samstags und Sonntags um 7:00 Uhr'
    },
    {
      it: 'should format complex weekly schedule - pt 3',
      input: later.parse.recur().on([ 3, 5, 7, 1 ]).dayOfWeek().on([ 7, 19 ]).hour(),
      expect: 'Dienstags, Donnerstags, Samstags und Sonntags um 7:00 und 19:00 Uhr'
    },
    {
      it: 'should format weekday schedule',
      input: later.parse.recur().onWeekday().on([ 8 ]).hour(),
      expect: 'Werktags um 8:00 Uhr'
    },
    {
      it: 'should format weekday schedule - pt 2',
      input: later.parse.recur().on([ 4, 5, 6, 7, 1 ]).dayOfWeek().on([ 8 ]).hour(),
      expect: 'Mittwochs, Donnerstags, Freitags, Samstags und Sonntags um 8:00 Uhr'
    },
    {
      it: 'should format monthly schedule',
      input: later.parse.recur().on(1).dayOfMonth().on(8).hour(),
      expect: 'Am 1. Tag des Monats um 8:00 Uhr'
    },
    {
      it: 'should format complex monthly schedule',
      input: later.parse.recur().on([ 1, 2, 3 ]).dayOfMonth().on(8).hour(),
      expect: 'Am 1., 2. und 3. Tag des Monats um 8:00 Uhr'
    }
  ];

  const setupTestCase = (testCase) => {
    it(testCase.it, () => {
      let scheduleString = formatSchedule(testCase.input);
      expect(scheduleString).to.be.equal(testCase.expect);
    });
  };

  for (let testCase of testCases) {
    setupTestCase(testCase);
  }

});
