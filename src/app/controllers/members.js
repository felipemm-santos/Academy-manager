const Member = require("../models/member");

const { getAge, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(members) {
        const pagination = {
          total: Math.ceil(members[0].total / limit),
          page,
        };

        return res.render("members/index", {
          members,
          pagination,
          filter,
        });
      },
    };

    Member.paginate(params);
  },

  create(req, res) {
    Member.instructorSelectOptions(function (options) {
      return res.render("members/create", { instructorOptions: options });
    });
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

      Member.instructorSelectOptions(function (options) {
        return res.render("members/edit", {
          member,
          instructorOptions: options,
        });
      });
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
