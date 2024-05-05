import criadoresService from '../../src/tarefas/Service/criadoresService';
import criadoresSchema from '../../src/tarefas/Schema/criadoresSchema';
jest.mock('../../src/tarefas/Schema/criadoresSchema');

describe('testes para a service (CriadoresService)', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('Simula a função create do modelo de criadores', async () => {
    const mockCriador = {
      nome: 'Test Criador',
      funcao: 'Function of test criador',
      contribuicao: 'Contribution of test criador',
    };

    (criadoresSchema.create as jest.Mock).mockResolvedValue(mockCriador);

    const createdCriador = await criadoresService.create(mockCriador);

    expect(criadoresSchema.create).toHaveBeenCalledWith(mockCriador);
    expect(createdCriador).toEqual(mockCriador);
  });

  it('Simula a função findById do modelo de criadores', async () => {
    const mockCriadorId = '123456789012345678901234'; 
    const mockCriador = {
      _id: mockCriadorId,
      nome: 'Test Criador',
      funcao: 'Function of test criador',
      contribuicao: 'Contribution of test criador',
    };
    (criadoresSchema.findById as jest.Mock).mockResolvedValue(mockCriador);

    const foundCriador = await criadoresService.findById(mockCriadorId);

    expect(criadoresSchema.findById).toHaveBeenCalledWith(mockCriadorId);
    expect(foundCriador).toEqual(mockCriador);
  });

  it('Simula a função find do modelo de criadores', async () => {
    const mockCriadores = [
      { nome: 'Criador 1', funcao: 'Function 1', contribuicao: 'Contribution 1' },
      { nome: 'Criador 2', funcao: 'Function 2', contribuicao: 'Contribution 2' },
    ];

    (criadoresSchema.find as jest.Mock).mockResolvedValue(mockCriadores);

    const foundCriadores = await criadoresService.findAll();

    expect(criadoresSchema.find).toHaveBeenCalled();
    expect(foundCriadores).toEqual(mockCriadores);
  });

  it('Simula a função findByIdAndUpdate do modelo de criadores', async () => {
    const mockCriadorId = '123456789012345678901234'; 
    const updatedCriadorData = {
      nome: 'Updated Criador Name',
      funcao: 'Updated Function',
      contribuicao: 'Updated Contribution',
    };
    (criadoresSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedCriadorData);

    const updatedCriador = await criadoresService.update(mockCriadorId, updatedCriadorData);

    expect(criadoresSchema.findByIdAndUpdate).toHaveBeenCalledWith(mockCriadorId, updatedCriadorData, { new: true });
    expect(updatedCriador).toEqual(updatedCriadorData);
  });

  it('Simula a função findByIdAndDelete do modelo de criadores', async () => {
    const mockCriadorId = '123456789012345678901234'; 

    (criadoresSchema.findByIdAndDelete as jest.Mock).mockResolvedValue('Tarefa Removida com sucesso');

    const deletionMessage = await criadoresService.delete(mockCriadorId);

    expect(criadoresSchema.findByIdAndDelete).toHaveBeenCalledWith(mockCriadorId);
    expect(deletionMessage).toEqual('Tarefa Removida com sucesso');
  });

  describe('findByName', () => {
    it('deve retornar criadores com o nome correspondente', async () => {
        const mockNome = 'Stan Lee';
        const mockCriadores = [
            { _id: '1', nome: 'Stan Lee' },
            { _id: '2', nome: 'Jack Kirby' }
        ];

        (criadoresSchema.find as jest.Mock).mockResolvedValueOnce(mockCriadores);
        const result = await criadoresService.findByName(mockNome);

        expect(criadoresSchema.find).toHaveBeenCalledWith({ nome: mockNome });
        expect(result).toEqual(mockCriadores);
    });
});

  describe('registrosAtuais', () => {
    it('deve retornar o número total de registros', async () => {
        const mockTotalRegisters = 10;

        (criadoresSchema.countDocuments as jest.Mock).mockResolvedValueOnce(mockTotalRegisters);
        const result = await criadoresService.registrosAtuais();

        expect(criadoresSchema.countDocuments).toHaveBeenCalled();
        expect(result).toEqual(mockTotalRegisters);
    });
  });


});


