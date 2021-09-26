import { Collection } from '../entity/Collection.entity';
import globalConfig from '../../globalConfig';
import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
const sendMail = (files?: string[], content?: string) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: globalConfig.mail.host,
    port: globalConfig.mail.port,
    secure: false,
    auth: globalConfig.mail.auth,
  });

  // send mail with defined transport object
  const attachements = [];
  for (const file in files) {
    attachements.push({ path: files[file] });
  }

  const info = transporter.sendMail(
    {
      from: globalConfig.mail.collectionSender,
      to: globalConfig.mail.collectionMail,
      subject: globalConfig.mail.subjectCollect,
      html: content,
      text: content,
      attachments: attachements,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    },
  );
  console.log('après');
 // console.log('Message sent: %s', info.messageId);
  //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

const getDateString = function () {
  const date = new Date();
  let d_string =
    date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDay();
  d_string +=
    date.getHours() +
    '' +
    date.getMinutes() +
    '' +
    date.getSeconds() +
    '' +
    date.getMilliseconds();
  return d_string;
};

const createDataFileName = (collection: Collection) => {
  // To-do update this treatment to add parameter in database
  return `Collection_${getDateString()}_${collection.title}_${
    collection.collector.title
  }.data`;
};

export default {
  getDateString,
  createDataFileName,
  sendMail,
  buildDataFile(collection: Collection) {
    const date = getDateString();
    return `Collection_Logs_${date}_${collection.collector.title}.data`;
  },
};
