import personagemService from '../../src/tarefas/Service/personagemService'; 
import personagemSchema from '../../src/tarefas/Schema/personagemSchema';
jest.mock('../../src/tarefas/Schema/personagemSchema');

describe('Teste para a service (personagemService)', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('Simula a função create do modelo de personagem', async () => {
    const mockPersonagem = {
      nome: 'Teste de personagem',
      descricao: 'descricao do personagem',
      imagemUrl: 'test.jpg',
    };

    (personagemSchema.create as jest.Mock).mockResolvedValue(mockPersonagem);

    const createdPersonagem = await personagemService.create(mockPersonagem);

    expect(personagemSchema.create).toHaveBeenCalledWith(mockPersonagem);
    expect(createdPersonagem).toEqual(mockPersonagem);
  });

  it('Simula a função findById do modelo de personagem', async () => {
    const mockPersonagemId = '123456789012345678901234'; 
    const mockPersonagem = {
      _id: mockPersonagemId,
      nome: 'Test Personagem',
      descricao: 'Description of test personagem',
      imagemUrl: 'test.jpg',
    };

    (personagemSchema.findById as jest.Mock).mockResolvedValue(mockPersonagem);

    const foundPersonagem = await personagemService.findById(mockPersonagemId);

    expect(personagemSchema.findById).toHaveBeenCalledWith(mockPersonagemId);
    expect(foundPersonagem).toEqual(mockPersonagem);
  });

  it('Simula a função find do modelo de personagem', async () => {
    const mockPersonagens = [
      { nome: 'Personagem 1', descricao: 'Description 1', imagemUrl: 'image1.jpg' },
      { nome: 'Personagem 2', descricao: 'Description 2', imagemUrl: 'image2.jpg' },
    ];

    (personagemSchema.find as jest.Mock).mockResolvedValue(mockPersonagens);

    const foundPersonagens = await personagemService.findAll();

    expect(personagemSchema.find).toHaveBeenCalled();
    expect(foundPersonagens).toEqual(mockPersonagens);
  });

  it('Simula a função findByIdAndUpdate do modelo de personagem', async () => {
    const mockPersonagemId = '123456789012345678901234'; 
    const updatedPersonagemData = {
      nome: 'Updated Personagem Name',
      descricao: 'Updated Description',
      imagemUrl: 'updated-image.jpg',
    };

    (personagemSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPersonagemData);

    const updatedPersonagem = await personagemService.update(mockPersonagemId, updatedPersonagemData);

    expect(personagemSchema.findByIdAndUpdate).toHaveBeenCalledWith(mockPersonagemId, updatedPersonagemData, { new: true });
    expect(updatedPersonagem).toEqual(updatedPersonagemData);
  });

  it('Simula a função findByIdAndDelete do modelo de personagem', async () => {
    const mockPersonagemId = '123456789012345678901234'; 

    (personagemSchema.findByIdAndDelete as jest.Mock).mockResolvedValue('Tarefa Removida com sucesso');

    const deletionMessage = await personagemService.delete(mockPersonagemId);

    expect(personagemSchema.findByIdAndDelete).toHaveBeenCalledWith(mockPersonagemId);
    expect(deletionMessage).toEqual('Tarefa Removida com sucesso');
  });


  describe('registrosAtuais', () => {
    it('deve retornar o número total de registros', async () => {
        const mockTotalRegisters = 10;

        (personagemSchema.countDocuments as jest.Mock).mockResolvedValueOnce(mockTotalRegisters);
        const result = await personagemService.registrosAtuais();

        expect(personagemSchema.countDocuments).toHaveBeenCalled();
        expect(result).toEqual(mockTotalRegisters);
    });
  });

  describe('findByName', () => {
    it('deve retornar personagens com o nome correspondente', async () => {
        const mockNome = 'Homem-Aranha';
        const mockPersonagens = [
            { _id: '1', nome: 'Homem-Aranha' },
            { _id: '2', nome: 'Homem-Aranha Noir' }
        ];

        (personagemSchema.find as jest.Mock).mockResolvedValueOnce(mockPersonagens);
        const result = await personagemService.findByName(mockNome);

        expect(personagemSchema.find).toHaveBeenCalledWith({ nome: mockNome });
        expect(result).toEqual(mockPersonagens);
    });
});


});