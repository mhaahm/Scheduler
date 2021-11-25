import { Collection } from '../entity/Collection.entity';
import globalConfig from '../../globalConfig';
import * as nodemailer from 'nodemailer';
import * as request from 'request';
import * as path from 'path';
import * as fs from 'fs';
import * as archiver from 'archiver';
import * as http from 'http';
import * as url from 'url';
import { curly } from 'node-libcurl';

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (files?: string[], content?: string) => {
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
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  const info = await transporter.sendMail(
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
  return info;
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

const checkUrlExists = function (Url, callback) {
  console.log('validation url');
  const options = {
    method: 'HEAD',
    host: 'localhost',
    port: url.parse(Url).port,
    path: url.parse(Url).pathname,
  };
  console.log(options);
  try {
    const req = http.request(options, function (r) {
      console.log(r);
      callback(r.statusCode == 200);
    });
    req.end();
  } catch (e) {
    console.log('end ');
  }
};

const createDataFileName = (collection: Collection) => {
  // To-do update this treatment to add parameter in database
  return `Collection_${getDateString()}_${collection.title}_${
    collection.collector.title
  }.data`;
};

const sendFileToServer = async function (filename) {
  const { statusCode, data, headers } = await curly.get(
    globalConfig.sslServerUrl,
  );
  if (!statusCode) {
    console.log('Send collecte file to ssl server ');
    return;
  }
  try {
    const target =
      globalConfig.sslServerUrl + 'upload/' + path.basename(filename);
    const rs = fs.createReadStream(filename);
    const ws = await request.post(target);
    ws.on('drain', function () {
      rs.resume();
    });
    await rs.pipe(ws);
  } catch (e) {
    console.log('Error send file : server is not responding');
  }
};

/**
 * @param {String} source
 * @param {String} out
 * @returns {Promise}
 */
const zipDirectory = async function (source, out) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);
  await archive.directory(source, false).pipe(stream);
  await archive.finalize();
};

const createZipFileName = (collection: Collection) => {
  return `Collection_${getDateString()}_${collection.title}_${
    collection.collector.title
  }.zip`;
};

export default {
  getDateString,
  createZipFileName,
  createDataFileName,
  sendMail,
  sendFileToServer,
  zipDirectory,
  buildDataFile(collection: Collection) {
    const date = getDateString();
    return `Collection_Logs_${date}_${collection.collector.title}.data`;
  },
  buildTempDir() {
    const date = getDateString();
    return `Temp_${date}`;
  },
};
