import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from 'src/brands/brands.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from 'src/brands/entities/brand.entity';

const mockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});

describe('BrandsService', () => {
  let service: BrandsService;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useFactory: mockRepo,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    repo = module.get(getRepositoryToken(Brand));
  });

  it('service defined бўлиши керак', () => {
    expect(service).toBeDefined();
  });

  it('brand яратиши керак', async () => {
    const dto = { name: 'Samsung' };
    repo.create.mockReturnValue(dto);
    repo.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create('Samsung');

    expect(repo.create).toHaveBeenCalledWith({ name: 'Samsung' });
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, name: 'Samsung' });
  });

  it('findAll() барча брендларни қайтариши керак', async () => {
    repo.find.mockResolvedValue([{ id: 1, name: 'Apple', products: [] }]);

    const result = await service.findAll();

    expect(repo.find).toHaveBeenCalledWith({
      relations: ['products'],
    });

    expect(result).toEqual([{ id: 1, name: 'Apple', products: [] }]);
  });

  it('findOne() бирта бренд қайтариши керак', async () => {
    repo.findOne.mockResolvedValue({ id: 1, name: 'Nike', products: [] });

    const result = await service.findOne(1);

    expect(repo.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['products'],
    });

    expect(result).toEqual({ id: 1, name: 'Nike', products: [] });
  });
});
