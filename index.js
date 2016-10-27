'use strict';

var capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var laterArrayChecksum = function (laterArray) {
  var checkSum = 0;

  for (var i = 0; i < laterArray.length; i++) {
    checkSum += Math.pow(2, laterArray[i] - 1);
  }

  return checkSum;
};

var isWeekdayArray = function (weekdayArray) {
  return laterArrayChecksum(weekdayArray) === 62;
};

var formatList = function (list, formater) {
  if (list.length === 1) {
    return formater(list[0]);
  }

  var listString = '';

  for (var i = 0; i < list.length; i++) {
    listString += formater(list[i]);

    if (i < list.length - 1) {
      if (i === list.length - 2) {
        listString += ' und ';
      } else {
        listString += ', ';
      }
    }
  }

  return listString;
};

var formatTime = function (definition) {
  if (definition.h.length === 24) {
    return 'stündlich';
  }

  var scheduleString = formatList(definition.h, function (value) { return value + ':00'; });
  return 'um ' + scheduleString +' Uhr';
};

var formatDayOfWeek = function (definition) {
  if (isWeekdayArray(definition.d)) {
    return 'Werktags ';
  }

  return formatList(definition.d, function (dayOfWeek) {
    switch (dayOfWeek) {
      case 1:
        return 'Sonntags';
      case 2:
        return 'Montags';
      case 3:
        return 'Dienstags';
      case 4:
        return 'Mittwochs';
      case 5:
        return 'Donnerstags';
      case 6:
        return 'Freitags';
      case 7:
        return 'Samstags';
    }
  }) + ' ';
};

var formatDayOfMonth = function (definition) {
  return 'am ' + formatList(definition.D, function (value) { return value + '.'; }) + ' Tag des Monats ';
};

var formatDefiniton = function (definition) {
  var scheduleString = '';

  if (definition.d || definition.D) {
    if (definition.d) {
      scheduleString += formatDayOfWeek(definition);
    }

    if (definition.D) {
      scheduleString += formatDayOfMonth(definition);
    }

  } else {
    scheduleString += 'täglich ';
  }

  if (definition.h) {
    scheduleString += formatTime(definition);
  }

  return scheduleString;
};

var formatSchedule = function (definitions) {
  var scheduleString = '';

  for (var i = 0; i < definitions.schedules.length; i++) {
    scheduleString += formatDefiniton(definitions.schedules[i]);
  }

  return capitalizeFirstLetter(scheduleString);
};

module.exports = formatSchedule;
