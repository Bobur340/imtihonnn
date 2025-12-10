import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from 'src/brands/brands.controller';
import { BrandsService } from 'src/brands/brands.service';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        {
          provide: BrandsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('controller defined бўлиши керак', () => {
    expect(controller).toBeDefined();
  });

  it('findAll бренларни қайтаради', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([
      { id: 1, name: 'LG', products: [] },
    ]);

    expect(await controller.findAll()).toEqual([
      { id: 1, name: 'LG', products: [] },
    ]);
  });

  it('findOne битта брендни қайтаради', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockResolvedValue({ id: 1, name: 'Sony', products: [] });

    expect(await controller.findOne('1')).toEqual({
      id: 1,
      name: 'Sony',
      products: [],
    });
  });

  it('create() бренд яратади', async () => {
    jest
      .spyOn(service, 'create')
      .mockResolvedValue({ id: 1, name: 'HP', products: [] });

    expect(await controller.create('HP')).toEqual({
      id: 1,
      name: 'HP',
      products: [],
    });
  });
});
