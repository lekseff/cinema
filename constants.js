// Названия модалок
export const MODAL = {
  addHall: 'addHall'
}

// Правила валидации для полей формы
export const rules = {
  required: value => !!value || 'Заполните поле',
  negative: value => +value > 0 || 'Отрицательное число',
  maxLength50: value => value.length < 50 || 'Не более 50 символов',
  requiredSelect: value => value.length !== 0 || 'Заполните поле',
  maxLength250: value => value.length < 250 || 'Не более 250 символов',
  maxLength1000: value => value.length < 1000 || 'Не более 250 символов',
  maxLength4000: value => value.length < 4000 || 'Не более 4000 символов',
  maxValue50: value => value < 50 || 'Не более 50',
  maxValue500: value => value < 500 || 'Не более 500',
  maxValue10000: value => value < 10000 || 'Не более 10000',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Неверный email'
  },
}
