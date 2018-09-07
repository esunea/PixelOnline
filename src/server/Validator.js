module.exports = class Validator {
  static username (string) {
    let stringRegex = /^[a-zA-Z0-9\-\_]+$/;
    return (typeof string != 'undefined' &&
        string.match(stringRegex) &&
        string.length > 3 &&
        string.length < 13)
  }
  static email (string) {
    let stringRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (typeof string != 'undefined' &&
        string.match(stringRegex))
  }
  static password (string) {
    return (typeof string != 'undefined' &&
        string.length > 5 &&
        string.length < 13)
  }
}
