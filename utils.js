module.exports = {
  getAge: (timestamp) => {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();

    const isNotBirthDay =
      month < 0 || (month == 0 && today.getDate() < birthDate.getDate());

    if (isNotBirthDay) {
      age = age - 1;
    }

    return age;
  },
};
