const advocates = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Advocate Main',
    email: 'advocate@mail.com',
    password: '12345',
  },
];

const notes = [
  {
    advocate_id: advocates[0].id,
    note: 'This is a note.',
    date: '2022-12-06',
  },
];


module.exports = {
  advocates,
  notes,
};
