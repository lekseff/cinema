// Названия модалок
export const MODAL = {
  addHall: 'addHall'
}

// Правила валидации для полей формы
export const rules = {
  required: value => !!value || 'Заполните поле',
  negative: value => +value > 0 || 'Отрицательное число',
  maxLength50: value => value.length < 50 || 'Не более 50 символов',
  maxValue50: value => value < 50 || 'Не более 50',
  maxValue10000: value => value < 10000 || 'Не более 10000',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Неверный email'
  },
}