const fs = require('fs');
const data = require('./data.json');

// create
exports.post = (req, res) => {
  const Keys = Object.keys(req.body);

  for (const key of Keys) {
    // req.body.key == ''
    if (req.body[key] == '') {
      return res.send('Por favor , preencha todos os campos');
    }
  }

  data.instructors.push(req.body);

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error !');

    return res.redirect('/instructors');
  });

  //   return res.send(req.body);
};

// update

// delete
