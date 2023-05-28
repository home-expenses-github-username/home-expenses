import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDbService } from '../../modules/database/user/service/user-db.service';

const UserDbServiceStub = {};

const MailerServiceStub = {};

describe('MailerService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: UserDbService, useValue: UserDbServiceStub },
        { provide: MailerService, useValue: MailerServiceStub }
      ]
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
