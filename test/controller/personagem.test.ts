
import personagemSchema from '../../src/tarefas/Schema/personagemSchema';
import personagemController from '../../src/tarefas/Controller/personagemController';
import personagemService from '../../src/tarefas/Service/personagemService';
import { Request, Response } from 'express';
jest.mock('../../src/tarefas/Service/personagemService');

describe('PersonagemController', () => {
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

    it('deve criar um personagem', async () => {
        const mockRequestBody = { nome: 'Novo Personagem', descricao: 'Descrição', imagemUrl: 'imagem.jpg' };
        const mockCreatedPersonagem = { _id: '1', ...mockRequestBody };

        (personagemService.create as jest.Mock).mockResolvedValueOnce(mockCreatedPersonagem);

        mockRequest.body = mockRequestBody;

        await personagemController.create(mockRequest as Request, mockResponse as Response);

        expect(personagemService.create).toHaveBeenCalledWith(mockRequestBody);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedPersonagem);
    });

    it('deve encontrar um personagem por ID', async () => {
        const mockPersonagemId = '1';
        const mockFoundPersonagem = { _id: '1', nome: 'Personagem', descricao: 'Descrição', imagemUrl: 'imagem.jpg' };

        (personagemService.findById as jest.Mock).mockResolvedValueOnce(mockFoundPersonagem);

        mockRequest.params = { id: mockPersonagemId };

        await personagemController.findById(mockRequest as Request, mockResponse as Response);

        expect(personagemService.findById).toHaveBeenCalledWith(mockPersonagemId);
        expect(mockResponse.json).toHaveBeenCalledWith(mockFoundPersonagem);
    });

    it('deve encontrar todos os personagens', async () => {
        const mockFoundPersonagens = [
            { _id: '1', nome: 'Personagem1', descricao: 'Descrição', imagemUrl: 'imagem1.jpg' },
            { _id: '2', nome: 'Personagem2', descricao: 'Descrição', imagemUrl: 'imagem2.jpg' }
        ];

        (personagemService.findAll as jest.Mock).mockResolvedValueOnce(mockFoundPersonagens);

        await personagemController.find(mockRequest as Request, mockResponse as Response);

        expect(personagemService.findAll).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith(mockFoundPersonagens);
    });

    it('deve atualizar um personagem', async () => {
        const mockPersonagemId = '1';
        const mockRequestBody = { nome: 'Novo Nome', descricao: 'Nova Descrição', imagemUrl: 'nova_imagem.jpg' };
        const mockUpdatedPersonagem = { _id: '1', ...mockRequestBody };

        (personagemService.update as jest.Mock).mockResolvedValueOnce(mockUpdatedPersonagem);

        mockRequest.params = { id: mockPersonagemId };
        mockRequest.body = mockRequestBody;

        await personagemController.update(mockRequest as Request, mockResponse as Response);

        expect(personagemService.update).toHaveBeenCalledWith(mockPersonagemId, mockRequestBody);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedPersonagem);
    });

    it('deve excluir um personagem', async () => {
        const mockPersonagemId = '1';
        const mockDeleteMessage = 'Personagem excluído com sucesso';

        (personagemService.delete as jest.Mock).mockResolvedValueOnce(mockDeleteMessage);

        mockRequest.params = { id: mockPersonagemId };

        await personagemController.delete(mockRequest as Request, mockResponse as Response);

        expect(personagemService.delete).toHaveBeenCalledWith(mockPersonagemId);
        expect(mockResponse.json).toHaveBeenCalledWith(mockDeleteMessage);
    });

    it('Deve retornar o total de registros', async () => {
        const totalRegistros = 5;
    
        (personagemService.registrosAtuais as jest.Mock).mockResolvedValueOnce(totalRegistros);
    
        await personagemController.totalRegisters(mockRequest as Request, mockResponse as Response);
    
        expect(personagemService.registrosAtuais).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith({ totalRegistros });
      });

      it('Deve buscar um personagem por nome', async () => {
        const mockPersonagem = [{ nome: 'Personagem 1' }];
    
        (personagemService.findByName as jest.Mock).mockResolvedValueOnce(mockPersonagem);
    
        mockRequest.params = { nome: 'Personagem 1' };
    
        await personagemController.findByName(mockRequest as Request, mockResponse as Response);
    
        expect(personagemService.findByName).toHaveBeenCalledWith('Personagem 1');
        expect(mockResponse.json).toHaveBeenCalledWith(mockPersonagem);
      });

});


