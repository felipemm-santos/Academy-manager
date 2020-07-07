const fs = require('fs');

// create
exports.post = (req, res) => {
  const Keys = Object.keys(req.body);

  for (const key of Keys) {
    // req.body.key == ''
    if (req.body[key] == '') {
      return res.send('Por favor , preencha todos os campos');
    }
  }

  fs.writeFile('data.json', JSON.stringify(req.body), (err) => {
    if (err) return res.send('Write file error !');

    return res.redirect('/instructors');
  });

//   return res.send(req.body);
};

// update

// delete
