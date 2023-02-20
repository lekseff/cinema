// :FIXME Может удалить Luxon
// import {DateTime} from "luxon";

// /**
//  * Возвращает дату в формате 2023-02-15
//  * @param date
//  * @returns {string}
//  */
// export function getDateFromString(date) {
//   return DateTime.fromSQL(date).toFormat('yyyy-LL-dd')
// }
//
// /**
//  * Возвращает время в формате 12:00
//  * @param date
//  * @returns {string}
//  */
// export function getTimeFromString(date) {
//   return DateTime.fromSQL(date).toFormat('HH:mm')
// }

/**
 * Преобразует массив объектов {id: '', name: ''} в строку
 * @param array
 * @returns {*}
 */
export function arrayToString(array) {
  return array.map(c => c.name).join(', ')
}

/**
 * Создает структуру зала
 * @param rows - кол-во мест
 * @param places - кол-во рядов
 * @param json - формат ответа
 * @returns {string|*[]}
 */
export function createStructure(rows, places, json = false) {
  const structure = []
  for (let i = 1; i <= rows * places; i++) {
    structure.push({
      id: i,
      isFree: true,
      selected: false,
      isVip: false,
      disabled: false
    })
  }
  return json ? JSON.stringify(structure) : structure
}
