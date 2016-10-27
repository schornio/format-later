'use strict';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const arraysHasSameElements = (array1, array2) => {
  let set1 = new Set(array1);
  let set2 = new Set(array2);

  if (Array.from(set1).length !== Array.from(set2).length) {
    return false;
  }

  for (let value1 of set1) {
    if (!set2.has(value1)) {
      return false;
    }
  }

  return true;
};

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
  return `um ${scheduleString} Uhr`;
};

const formatDayOfWeek = (definition) => {
  if (arraysHasSameElements(definition.d, [ 2, 3, 4, 5, 6])) {
    return 'Werktags ';
  }

  return formatList(definition.d, (dayOfWeek) => {
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
