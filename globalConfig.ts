const globalConfig: any = {
  collectorType: [
    { id: 1, name: 'PHP' },
    { id: 2, name: 'PowerShell' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'Nodejs' },
    { id: 6, name: 'Batch' },
    { id: 7, name: 'Shell' },
  ],
  logFile: __dirname + '/logs/schedulerProd.log',
};

export default globalConfig;
