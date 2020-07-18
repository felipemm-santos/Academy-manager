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
  req.body.created_at = Date.now();
  req.body.id = Number(data.members.length + 1);

  const { id, avatar_url, name, birth, gender } = req.body;

  data.members.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error !');

    return res.redirect('/members');
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
    birth: dateFormat(foundMember.birth),
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
