import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { createWorkers } from '../workers/focus.main';
import { FocusJobQueue } from './queue/focus.queue';
import { NatsModule } from '../nats/nats.module';
import { JobCompletedPublisher } from '../nats/publishers/job-completed-publisher';

@Module({
  imports: [NatsModule],
  providers: [FocusJobQueue],
  exports: [FocusJobQueue],
})
export class QueueModule implements OnModuleInit {
  @Inject(JobCompletedPublisher) jobCompletedPublisher: JobCompletedPublisher;
  async onModuleInit() {
    await createWorkers(this.jobCompletedPublisher);
  }
}
