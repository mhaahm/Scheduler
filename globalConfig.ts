import * as fs from 'fs';
const globalConfig: any = {
  collectorType: [
    { id: 1, name: 'PHP' },
    { id: 2, name: 'PowerShell' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'Nodejs' },
    { id: 6, name: 'Batch' },
    { id: 7, name: 'Shell' },
  ],
  logFile: `${__dirname}/logs/schedulerProd.log`,
  tempDir: `${__dirname}/Temp/`,
  mail: {
    auth: {
      user: 'webmaster@k-and-decide.com', // generated ethereal user
      pass: 'P9u84CkeP', // generated ethereal password
    },
    host: 'webmail13.hosteam.fr',
    port: 587,
    collectionMail: 'moham.hassen@gmail.com',
    collectionSender: 'webmaster@k-and-decide.com',
    subjectCollect: 'New Collection Result'
  },
};
if (!fs.existsSync(globalConfig.tempDir)) {
  fs.mkdirSync(globalConfig.tempDir, { recursive: true });
}
export default globalConfig;
