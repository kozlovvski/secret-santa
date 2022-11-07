import { createTransport } from "nodemailer";
import * as dotenv from 'dotenv';
import clc from 'cli-color';
import { people, forbiddenPairs } from './people.js';

dotenv.config();

let peopleLeft, matches;

const findPairs = () => {
  peopleLeft = Array.from(people);
  matches = [];
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const pickPerson = (retries = 0) => {
      let match;

      if (retries > 5) {
        findPairs();
        return;
      }

      const picked = peopleLeft[Math.floor(Math.random() * peopleLeft.length)];

      if (
        person.id == picked.id ||
        forbiddenPairs.filter(
          (item) => item[0] == person.id && item[1] == picked.id
        ).length ||
        forbiddenPairs.filter(
          (item) => item[0] == picked.id && item[1] == person.id
        ).length ||
        matches.filter((item) => item[0] == picked.id && item[1] == person.id)
          .length
      ) {
        pickPerson(retries + 1);
        return;
      } else {
        match = picked;
      }

      matches.push([person.id, match.id]);
      peopleLeft = peopleLeft.filter((item) => item != match);
    };
    pickPerson();
  }
};

findPairs();

const sendEmails = () => {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, //true for 465 port, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  matches.forEach((item) => {
    let personFrom = people[item[0]];
    let personTo = people[item[1]];

    let mailOptions = {
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
      to: personFrom.mail,
      subject: "Ho, ho, ho! Wyciągaj portfel, Święty Mikołaj przyszedł!",
      text: `Wyniki losowańska są takie: twoja para to ${personTo.name}. Nie wiem czy Ci się przyda, ale adres e-mail: ${personTo.mail}`,
    };

    transporter.sendMail(mailOptions, console.log);
  });
};

const printPairs = () => {
  matches.forEach((item) => {
    let personFrom = people[item[0]];
    let personTo = people[item[1]];

    console.log(personFrom.name, clc.blackBright(' daje prezent '), personTo.name);
  });
};

if (process.env.SEND_EMAILS === "true") {
  sendEmails();
} else {
  printPairs();
}