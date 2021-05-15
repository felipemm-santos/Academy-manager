const Intl = require("intl");

const { getAge, dateFormat } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("members/index");
  },
  create(req, res) {
    res.render("members/create");
  },
  post(req, res) {
    const Keys = Object.keys(req.body);

    for (const key of Keys) {
      // req.body.key == ''
      if (req.body[key] == "") {
        return res.send("Por favor , preencha todos os campos");
      }
    }

    return;
  },
  show(req, res) {
    return;
  },
  edit(req, res) {
    return;
  },
  put(req, res) {
    const Keys = Object.keys(req.body);

    for (const key of Keys) {
      // req.body.key == ''
      if (req.body[key] == "") {
        return res.send("Por favor , preencha todos os campos");
      }
    }
    return;
  },
  delete(req, res) {
    return;
  },
};
