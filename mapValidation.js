import expressValidator from 'express-validator';
import { WRONG_EMAIL_FORMAT, WRONG_PASSWORD_LENGTH } from './lang/validation.lang';

const { check } = expressValidator;

const rules = {
  email: check('email', WRONG_EMAIL_FORMAT).isEmail(),
  password: check('password', WRONG_PASSWORD_LENGTH).isLength(6),
};

/**
 * Функция для выбора заготовок валидации
 * @param {string[]} names - именя валидируемых полей
 * @return {[]}
 */
export default function mapValidation(names) {
  const validations = [];

  names.forEach((name) => {
    if (rules[name]) validations.push(rules[name]);
    else throw new Error(`Rule ${name} is not defined`);
  });

  return validations;
}
