const Handlebars = require('handlebars/runtime');

Handlebars.registerHelper("switch", function (value, options) {
  this.switch_value = value;
  this.switch_break = false;
  return options.fn(this);
});

Handlebars.registerHelper("case", function (value, options) {
  if (value == this.switch_value) {
    this.switch_break = true;
    return options.fn(this);
  }
});

Handlebars.registerHelper("default", function (value) {
  if (this.switch_break == false) {
    return value;
  }
});

Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);

    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

module.exports = Handlebars