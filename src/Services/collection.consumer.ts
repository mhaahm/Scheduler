import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueError,
  OnQueueWaiting,
  OnQueueProgress,
  OnQueueCompleted,
  OnQueueFailed,
  OnGlobalQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';
import { spawn } from 'child_process';
import { SocketService } from '../socket/socket.service';
import {
  default as AnsiUp
} from 'ansi_up';

@Processor('collectionQue')
export class CollectionConsumer {

  private job: Job;
  private ansi_up = new AnsiUp();

  constructor(private socketService: SocketService) { }

  @Process('collection-launcher')
  async launchCollecte(job: Job) {
    const collId = job.data.jobId;
    console.log('Job ' + collId + ' executed successfuly', collId);
    console.log(
      __dirname + '/../../../cli scheduler:launcher --colId ' + collId,
    );
    this.job = job;
    job.log('Job ' + collId + ' executed successfuly');
    job.log(__dirname + '/../../../cli scheduler:launcher --colId ' + collId);
    const ps = await spawn('node', ['cli', 'scheduler:launcher', '--colId', collId], {
      cwd: __dirname + '/../../../',
    });
    ps.stdout.on('data', async (data) => {
      await job.log(data.toString());
      this.socketService.socket.emit('EVENT_NAME', {
        msg: this.ansi_up.ansi_to_html(data.toString()),
      });
    });

    ps.on('error', async (err) => {
      console.error('Failed to start subprocess.', err);
      await job.log('Failed to start subprocess.' + err.toString());
      this.socketService.socket.emit('EVENT_NAME', {
        msg: this.ansi_up.ansi_to_html(err.toString()),
      });
      await this.job.moveToFailed({message: 'bbbbb'});
    });
    ps.stderr.on('data', async (data) => {
      console.error(`grep stderr: ${data}`);
      this.socketService.socket.emit('EVENT_NAME', {
        msg: this.ansi_up.ansi_to_html(`${data}`),
      });
    });

  }

  @OnQueueActive()
  onActive(job: Job) {
    // send response to console
    try {
      if (this.socketService.socket !== null) {
        this.socketService.socket.emit('EVENT_NAME', {
          msg: `Processing job ${job.id} of type ${job.name} `,
        });
      }
      job.log(
        `onActive job ${job.id} of type ${job.name} with data ${job.data.toString()}`,
      );
      console.log(
        `onActive job ${job.id} of type ${job.name} with data `, job.data);
    } catch (Exception) {
      console.log(Exception);
    }
  }

  @OnQueueError()
  async onError(error: Error) {
    // send response to console
    const msg = ' onError job finished with error : ' + error.message;
    if (this.socketService.socket !== null) {
      this.socketService.socket.emit('EVENT_NAME', {
        msg: msg,
      });
    }
    console.log(msg);
    await this.job.moveToFailed({message: 'bbbbb'});
    await process.exit(1);
  }

  @OnQueueWaiting()
  async onwaiting(jobId: number) {
    const msg = ' onwaiting job  : ' + jobId + ' waiting to execute';
    if (this.socketService.socket !== null) {
      await this.socketService.socket.emit('EVENT_NAME', {
        msg: msg,
      });
    }
    await console.log(msg);
  }

  @OnQueueCompleted()
  async onComplet(job: Job, result: any) {
    const msg = 'onComplet Job ' + job.id + ' done ';
    if (this.socketService.socket !== null) {
      this.socketService.socket.emit('EVENT_NAME', {
        msg: msg,
      });
    }
    console.log(msg);
    await job.log(msg);
  }

  @OnQueueFailed()
  async onCompletedWithError(job: Job, error: Error) {
    const msg = 'onCompletedWithError Job ' + job.id + ' done with error' + error.message;
    this.socketService.socket.emit('EVENT_NAME', {
      msg: msg,
    });
    console.log(msg);
    await job.log(msg);
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    console.log(result);
    if (this.socketService.socket !== null) {
      await this.socketService.socket.emit('EVENT_NAME', {
        msg: 'Job finished ',
      });
    }
  }
}
