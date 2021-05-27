const Instructor = require("../models/instructor");

const { getAge, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    const { filter } = req.query;

    if (filter) {
      Instructor.findBy(filter, function (instructors) {
        return res.render("instructors/index", { instructors, filter });
      });
    } else {
      Instructor.all(function (instructors) {
        return res.render("instructors/index", { instructors });
      });
    }
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

    Instructor.create(req.body, function (instructor) {
      return res.redirect(`/instructors/${instructor.id}`);
    });
  },

  show(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.render("not-found");

      instructor.age = getAge(instructor.birth);
      instructor.services = instructor.services.split(",");

      instructor.created_at = date(instructor.created_at).format;

      return res.render("instructors/show", { instructor });
    });
  },

  edit(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.render("not-found");

      instructor.birth = date(instructor.birth).iso;

      return res.render("instructors/edit", { instructor });
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

    Instructor.update(req.body, function () {
      return res.redirect(`/instructors/${req.body.id}`);
    });
  },

  delete(req, res) {
    Instructor.delete(req.body.id, function () {
      return res.redirect(`/instructors`);
    });
  },
};
