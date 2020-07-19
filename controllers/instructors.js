const fs = require('fs');
const Intl = require('intl');

const data = require('../data.json');
const { getAge, dateFormat } = require('../utils');

exports.index = (req, res) => {
  return res.render('instructors/index', { instructors: data.instructors });
};

exports.create = (req, res) => {
  res.render('instructors/create');
};

exports.post = (req, res) => {
  const Keys = Object.keys(req.body);

  for (const key of Keys) {
    // req.body.key == ''
    if (req.body[key] == '') {
      return res.send('Por favor , preencha todos os campos');
    }
  }

  req.body.birth = Date.parse(req.body.birth);
  req.body.created_at = Date.now();

  const lastInstructor = data.instructors[data.instructors.length - 1];

  if (lastInstructor) {
    req.body.id = lastInstructor + 1;
  } else {
    req.body.id = 1;
  }

  data.instructors.push(req.body);

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error !');

    return res.redirect(`/instructors/${req.body.id}`);
  });
};

exports.show = (req, res) => {
  const id = req.params.id;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.render('not-found');
  }

  const instructor = {
    ...foundInstructor,
    age: getAge(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat('pt-BR').format(
      foundInstructor.created_at
    ),
  };

  return res.render('instructors/show', { instructor });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.render('not-found');
  }

  const instructor = {
    ...foundInstructor,
    birth: dateFormat(foundInstructor.birth).iso,
  };

  return res.render('instructors/edit', { instructor });
};

exports.put = (req, res) => {
  const { id } = req.body;

  let index = 0;

  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) {
    return res.send('Instructor not found!');
  }

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.instructors[index] = instructor;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.sned('Write file error !');

    return res.redirect(`/instructors/${id}`);
  });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(
    (instructor) => instructor.id != id
  );

  data.instructors = filteredInstructors;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error!');

    return res.redirect('/instructors');
  });
};
