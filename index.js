'use strict';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatList = (list, formater) => {
  if (list.length === 1) {
    return formater(list[0]);
  }

  let listString = '';

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

const formatTime = (definition) => {
  if (definition.h.length === 24) {
    return 'stündlich';
  }

  let scheduleString = formatList(definition.h, (value) => `${value}:00`);
  return `um ${scheduleString}`;
};

const formatDayOfWeek = (definition) => {
  return formatList(definition.d, (dayOfWeek) => {
    switch (dayOfWeek) {
      case 1:
        return 'Sonntag';
      case 2:
        return 'Montag';
      case 3:
        return 'Dienstag';
      case 4:
        return 'Mittwoch';
      case 5:
        return 'Donnerstag';
      case 6:
        return 'Freitag';
      case 7:
        return 'Samstag';
    }
  }) + ' ';
};

const formatDayOfMonth = (definition) => {
  return 'am ' + formatList(definition.D, (value) => `${value}.`) + ' Tag des Monats ';
};

const formatDefiniton = (definition) => {
  let scheduleString = '';

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

const formatSchedule = (definitions) => {
  let scheduleString = '';

  for (let definition of definitions.schedules) {
    scheduleString += formatDefiniton(definition);
  }

  return capitalizeFirstLetter(scheduleString);
};

module.exports = formatSchedule;
