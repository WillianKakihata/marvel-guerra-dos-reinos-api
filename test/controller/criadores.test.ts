import { Request, Response } from 'express';
import criadoresController from '../../src/tarefas/Controller/criadoresController';
import criadoresService from '../../src/tarefas/Service/criadoresService';

jest.mock('../../src/tarefas/Service/criadoresService');

describe('criadoresController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um criador', async () => {
        const mockRequestBody = { nome: 'Novo Criador', funcao: 'Escritor', contribuicao: 'Co-criador' };
        const mockCreatedCriador = { _id: '1', ...mockRequestBody };

        (criadoresService.create as jest.Mock).mockResolvedValueOnce(mockCreatedCriador);

        mockRequest.body = mockRequestBody;

        await criadoresController.create(mockRequest as Request, mockResponse as Response);

        expect(criadoresService.create).toHaveBeenCalledWith(mockRequestBody);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedCriador);
    });

    it('deve encontrar um criador por ID', async () => {
        const mockCriadorId = '1';
        const mockFoundCriador = { _id: '1', nome: 'Criador', funcao: 'Ilustrador', contribuicao: 'Criador do personagem' };

        (criadoresService.findById as jest.Mock).mockResolvedValueOnce(mockFoundCriador);

        mockRequest.params = { id: mockCriadorId };

        await criadoresController.findById(mockRequest as Request, mockResponse as Response);

        expect(criadoresService.findById).toHaveBeenCalledWith(mockCriadorId);
        expect(mockResponse.json).toHaveBeenCalledWith(mockFoundCriador);
    });

    it('deve encontrar todos os criadores', async () => {
        const mockFoundCriadores = [
            { _id: '1', nome: 'Criador1', funcao: 'Escritor', contribuicao: 'Co-criador' },
            { _id: '2', nome: 'Criador2', funcao: 'Ilustrador', contribuicao: 'Co-criador' }
        ];

        (criadoresService.findAll as jest.Mock).mockResolvedValueOnce(mockFoundCriadores);

        await criadoresController.find(mockRequest as Request, mockResponse as Response);

        expect(criadoresService.findAll).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith(mockFoundCriadores);
    });

    it('deve atualizar um criador', async () => {
        const mockCriadorId = '1';
        const mockRequestBody = { nome: 'Novo Nome', funcao: 'Editor', contribuicao: 'Co-criador' };
        const mockUpdatedCriador = { _id: '1', ...mockRequestBody };

        (criadoresService.update as jest.Mock).mockResolvedValueOnce(mockUpdatedCriador);

        mockRequest.params = { id: mockCriadorId };
        mockRequest.body = mockRequestBody;

        await criadoresController.update(mockRequest as Request, mockResponse as Response);

        expect(criadoresService.update).toHaveBeenCalledWith(mockCriadorId, mockRequestBody);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedCriador);
    });

    it('deve excluir um criador', async () => {
        const mockCriadorId = '1';
        const mockDeleteMessage = 'Criador excluído com sucesso';

        (criadoresService.delete as jest.Mock).mockResolvedValueOnce(mockDeleteMessage);

        mockRequest.params = { id: mockCriadorId };

        await criadoresController.delete(mockRequest as Request, mockResponse as Response);

        expect(criadoresService.delete).toHaveBeenCalledWith(mockCriadorId);
        expect(mockResponse.json).toHaveBeenCalledWith(mockDeleteMessage);
    });

    it('Deve retornar o total de registros', async () => {
        const totalRegistros = 5;
    
        (criadoresService.registrosAtuais as jest.Mock).mockResolvedValueOnce(totalRegistros);
    
        await criadoresController.totalRegisters(mockRequest as Request, mockResponse as Response);
    
        expect(criadoresService.registrosAtuais).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith({ totalRegistros });
      });

      it('Deve buscar um criador por nome', async () => {
        const mockPersonagem = [{ nome: 'Tony' }];
    
        (criadoresService.findByName as jest.Mock).mockResolvedValueOnce(mockPersonagem);
    
        mockRequest.params = { nome: 'Tony' };
    
        await criadoresController.findByName(mockRequest as Request, mockResponse as Response);
    
        expect(criadoresService.findByName).toHaveBeenCalledWith('Tony');
        expect(mockResponse.json).toHaveBeenCalledWith(mockPersonagem);
      });

});