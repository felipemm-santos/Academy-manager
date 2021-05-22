const Member = require("../models/member");

const { getAge, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Member.all(function (members) {
      return res.render("members/index", { members });
    });
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

    Member.create(req.body, function (member) {
      return res.redirect(`/members/${member.id}`);
    });
  },

  show(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.render("not-found");
      member = {
        ...member,
        age: getAge(member.birth),
      };
      member.birth = date(member.birth).birthDay;

      return res.render("members/show", { member });
    });
  },

  edit(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.render("not-found");

      member.birth = date(member.birth).iso;

      return res.render("members/edit", { member });
    });

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

    Member.update(req.body, function () {
      return res.redirect(`/members/${req.body.id}`);
    });
  },

  delete(req, res) {
    Member.delete(req.body.id, function () {
      return res.redirect(`/members`);
    });
  },
};
