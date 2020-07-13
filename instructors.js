const fs = require('fs');
const data = require('./data.json');
const { getAge, dateFormat } = require('./utils');

// create
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
  req.body.id = Number(data.instructors.length + 1);

  const {
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  } = req.body;

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error !');

    return res.redirect('/instructors');
  });
};

// show

exports.show = (req, res) => {
  const id = req.params.id;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.send('Instructor not found!');
  }

  const instructor = {
    ...foundInstructor,
    age: getAge(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat('en-GB').format(
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
    return res.send('Instructor not found!');
  }

  const instructor = {
    ...foundInstructor,
    birth: dateFormat(foundInstructor.birth),
  };

  return res.render('instructors/edit', { instructor });
};
