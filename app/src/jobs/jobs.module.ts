import { Global, Module } from '@nestjs/common';
import { JobsFocusService } from './services/jobs.focus.service';
import { JobsFocusController } from './controllers/jobs.focus.controller';
import { QueueModule } from '../jobqueue/queue.module';
import { JobsFocusNoauthController } from './controllers/jobs.focus.noauth.controller';

@Global()
@Module({
  imports: [QueueModule],
  controllers: [JobsFocusController, JobsFocusNoauthController],
  providers: [JobsFocusService],
  exports: [],
})
export class JobsModule {}
