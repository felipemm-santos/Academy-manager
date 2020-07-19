const fs = require('fs');
const Intl = require('intl');

const data = require('../data.json');
const { getAge, dateFormat } = require('../utils');

exports.index = (req, res) => {
  return res.render('members/index', { members: data.members });
};

exports.create = (req, res) => {
  return res.render('members/create');
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

  const lastMember = data.members[data.members.length - 1];

  if (lastMember) {
    req.body.id = lastMember.id + 1;
  } else {
    req.body.id = 1;
  }

  data.members.push(req.body);

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error !');

    return res.redirect(`/members/${req.body.id}`);
  });
};

exports.show = (req, res) => {
  const id = req.params.id;

  const foundMember = data.members.find((member) => {
    return member.id == id;
  });

  if (!foundMember) {
    return res.render('not-found');
  }

  const member = {
    ...foundMember,
    birth: dateFormat(foundMember.birth).birthDay,
    age: getAge(foundMember.birth),
  };

  return res.render('members/show', { member });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => {
    return member.id == id;
  });

  if (!foundMember) {
    return res.render('not-found');
  }

  const member = {
    ...foundMember,
    birth: dateFormat(foundMember.birth).iso,
  };

  return res.render('members/edit', { member });
};

exports.put = (req, res) => {
  const { id } = req.body;

  let index = 0;

  const foundMember = data.members.find((member, foundIndex) => {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) {
    return res.send('Member not found!');
  }

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.sned('Write file error !');

    return res.redirect(`/members/${id}`);
  });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredMembers = data.members.filter((member) => member.id != id);

  data.members = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error!');

    return res.redirect('/members');
  });
};
