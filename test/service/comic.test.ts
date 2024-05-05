import comicSchema from '../../src/tarefas/Schema/comicSchema';
import comicService from '../../src/tarefas/Service/comicService';

jest.mock('../../src/tarefas/Schema/comicSchema');

describe('teste para a service (ComicService)', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('Simula a função create do modelo de quadrinhos', async () => {
    const mockComic = {
      titulo: 'Testar Comic',
      descricao: 'Descricao aleatoria',
      dataPublicacao: new Date(),
      capa: 'test.jpg',
    };

    (comicSchema.create as jest.Mock).mockResolvedValue(mockComic);

    const createdComic = await comicService.create(mockComic);

    expect(comicSchema.create).toHaveBeenCalledWith(mockComic);
    expect(createdComic).toEqual(mockComic);
  });


  it('função findById do modelo de quadrinhos', async () => {
    const mockComicId = '123456789012345678901234'; 
    const mockComic = {
      _id: mockComicId,
      titulo: 'Test Comic',
      descricao: 'Description of test comic',
      dataPublicacao: new Date(),
      capa: 'test.jpg',
    };


    (comicSchema.findById as jest.Mock).mockResolvedValue(mockComic);

    const foundComic = await comicService.findById(mockComicId);

    expect(comicSchema.findById).toHaveBeenCalledWith(mockComicId);
    expect(foundComic).toEqual(mockComic);
  });


  it('Simula a função find do modelo de quadrinhos', async () => {
    const mockComics = [
      { titulo: 'Comic 1', descricao: 'Description 1', dataPublicacao: new Date(), capa: 'comic1.jpg' },
      { titulo: 'Comic 2', descricao: 'Description 2', dataPublicacao: new Date(), capa: 'comic2.jpg' },
    ];
    (comicSchema.find as jest.Mock).mockResolvedValue(mockComics);
    const foundComics = await comicService.findAll();
    expect(comicSchema.find).toHaveBeenCalled();
    expect(foundComics).toEqual(mockComics);
  })


  it('Simula a função findByIdAndDelete do modelo de quadrinhos', async () => {
    const mockComicId = '123456789012345678901234';


    (comicSchema.findByIdAndDelete as jest.Mock).mockResolvedValue('Tarefa Removida com sucesso');

    const deletionMessage = await comicService.delete(mockComicId);

    expect(comicSchema.findByIdAndDelete).toHaveBeenCalledWith(mockComicId);
    expect(deletionMessage).toEqual('Tarefa Removida com sucesso');
  });


  it('Simula a função findByIdAndUpdate do modelo de quadrinhos', async () => {
    const mockComicId = '123456789012345678901234';
    const updatedComicData = {
      titulo: 'Updated Comic Title',
      descricao: 'Updated Description',
      dataPublicacao: new Date(),
      capa: 'updated-comic.jpg',
    };

    (comicSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedComicData);

    const updatedComic = await comicService.update(mockComicId, updatedComicData);

    expect(comicSchema.findByIdAndUpdate).toHaveBeenCalledWith(mockComicId, updatedComicData, { new: true });
    expect(updatedComic).toEqual(updatedComicData);
  });

  describe('findByName', () => {
    it('deve retornar quadrinhos com o nome correspondente', async () => {
        const mockTitulo = 'Homem-Aranha';
        const mockComics = [
            { _id: '1', titulo: 'Homem-Aranha #1' },
            { _id: '2', titulo: 'Homem-Aranha #2' }
        ];

        (comicSchema.find as jest.Mock).mockResolvedValueOnce(mockComics);
        const result = await comicService.findByName(mockTitulo);

        expect(comicSchema.find).toHaveBeenCalledWith({ titulo: mockTitulo });
        expect(result).toEqual(mockComics);
    });
});

describe('registrosAtuais', () => {
    it('deve retornar o número total de registros', async () => {
        const mockTotalRegisters = 10;

        (comicSchema.countDocuments as jest.Mock).mockResolvedValueOnce(mockTotalRegisters);
        const result = await comicService.registrosAtuais();

        expect(comicSchema.countDocuments).toHaveBeenCalled();
        expect(result).toEqual(mockTotalRegisters);
    });
});


});
