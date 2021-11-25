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

@Processor('collectionQue')
export class CollectionConsumer {
  constructor(private socketService: SocketService) {}

  @Process('collection-launcher')
  launchCollecte(job: Job) {
    const collId = job.data.jobId;
    console.log('Job ' + collId + ' executed successfuly', collId);
    console.log(
      __dirname + '/../../../cli scheduler:launcher --colId ' + collId,
    );
    const ps = spawn('node', ['cli', 'scheduler:launcher', '--colId', collId], {
      cwd: __dirname + '/../../../',
    });
    ps.stdout.on('data', (data) => {
      this.socketService.socket.emit('EVENT_NAME', {
        msg: data.toString(),
      });
    });

    ps.on('error', (err) => {
      console.error('Failed to start subprocess.', err);
      this.socketService.socket.emit('EVENT_NAME', {
        msg: err.toString(),
      });
    });
    ps.stderr.on('data', (data) => {
      console.error(`grep stderr: ${data}`);
      this.socketService.socket.emit('EVENT_NAME', {
        msg: `${data}`,
      });
    });
  }

  @OnQueueActive()
  onActive(job: Job) {
    // send response to console
    try {
      if (this.socketService.socket !== null) {
        this.socketService.socket.emit('EVENT_NAME', {
          msg: 'Processing job ' + job.id + ' of type ' + job.name,
        });
      }
      console.log(
        'Processing job ' +
          job.id +
          ' of type ' +
          job.name +
          ' with data ' +
          job.data +
          '...',
      );
    } catch (Exception) {
      console.log(Exception);
    }
  }

  @OnQueueError()
  onError(error: Error) {
    // send response to console
    const msg = 'job finished with error : ' + error.message;
    if (this.socketService.socket !== null) {
      this.socketService.socket.emit('EVENT_NAME', {
        msg: msg,
      });
    }
    console.log(msg);
  }

  @OnQueueWaiting()
  onwaiting(jobId: number) {
    const msg = 'job  : ' + jobId + ' waiting to execute';
    if (this.socketService.socket !== null) {
      this.socketService.socket.emit('EVENT_NAME', {
        msg: msg,
      });
    }
    console.log(msg);
  }

  @OnQueueProgress()
  onProgress(job: Job, progress: number) {
    const msg = 'Progress execution job  [' + progress + '%]';
    if (this.socketService.socket !== null) {
      this.socketService.socket.emit('EVENT_NAME', {
        msg: msg,
      });
    }
    console.log(msg);
  }

  @OnQueueCompleted()
  onComplet(job: Job, result: any) {
    const msg = 'Job ' + job.id + ' done ';
    if (this.socketService.socket !== null) {
      this.socketService.socket.emit('EVENT_NAME', {
        msg: msg,
      });
    }
    console.log(msg);
  }

  @OnQueueFailed()
  onCompletedWithError(job: Job, error: Error) {
    const msg = 'Job ' + job.id + ' done with error' + error.message;
    this.socketService.socket.emit('EVENT_NAME', {
      msg: msg,
    });
    console.log(msg);
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    console.log(result);
    if (this.socketService.socket !== null) {
      this.socketService.socket.emit('EVENT_NAME', {
        msg: 'Job finished ',
      });
    }
  }
}
