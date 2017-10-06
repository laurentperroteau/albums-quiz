const fs = require('fs');

export class HelperE2E {

  static getCurrentDay() {
    const today = new Date();
    return today.toISOString();
  }

  static readFilePromise() {
    return new Promise((resolve, reject) => {
      fs.readFile('./e2e/features/data-feature.txt', function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static writeFilePromise(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile('./e2e/features/data-feature.txt', data, 'utf-8', function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
