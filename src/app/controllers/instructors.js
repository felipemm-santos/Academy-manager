const Intl = require("intl");

const db = require("../../config/db");

const { getAge, dateFormat } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("instructors/index");
  },
  create(req, res) {
    res.render("instructors/create");
  },
  post(req, res) {
    const Keys = Object.keys(req.body);

    for (const key of Keys) {
      // req.body.key == ''
      if (req.body[key] == "") {
        return res.send("Por favor , preencha todos os campos");
      }
    }

    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        gender,
        services,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.services,
      dateFormat(req.body.birth).iso,
      dateFormat(Date.now()).iso,
    ];

    db.query(query, values, (err, results) => {
      console.log(err);
      console.log(results);
    });
    
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
