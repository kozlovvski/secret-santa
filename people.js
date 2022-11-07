export const people = Object.freeze([
  {
    id: 0,
    name: "Karol",
    mail: "dummy@email.com",
  },
  {
    id: 1,
    name: "Asia z Mrozów",
    mail: "dummy@email.com",
  },
  {
    id: 2,
    name: "Adam z Mrozów",
    mail: "dummy@email.com",
  },
  {
    id: 3,
    name: "Paulina",
    mail: "dummy@email.com",
  },
  {
    id: 4,
    name: "Olga",
    mail: "dummy@email.com",
  },
  {
    id: 5,
    name: "Jarek",
    mail: "dummy@email.com",
  },
  {
    id: 6,
    name: "Daria",
    mail: "dummy@email.com",
  },
]);

/**
 * ids that cannot be paired together. They work both ways e.g. [0, 1] means that 0 cannot buy present for 1 and 1 cannot buy present for 0.
 */
export const forbiddenPairs = [
  [0, 6],
  [1, 5],
];