import Validator from "validatorjs";

export default class Validation {
  static form(data, rules) {
    return new Promise((resolve, reject) => {
      const validator = new Validator(data, rules);
      if (validator.fails())
        reject({
          code: 200,
          message: "Invalid input!",
          errors: validator.errors.all(),
        });
      resolve();
    })
  }
}
