import comicController from '../../src/tarefas/Controller/comicController';
import comicService from '../../src/tarefas/Service/comicService';
import { Request, Response } from 'express';
jest.mock('../../src/tarefas/Service/comicService');

describe('ComicController', () => {
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

    it('deve criar uma HQ', async () => {
        const mockRequestBody = { titulo: 'Nova HQ', descricao: 'Descrição', dataPublicacao: '2024-05-04', capa: 'imagem.jpg' };
        const mockCreatedComic = { _id: '1', ...mockRequestBody };

        (comicService.create as jest.Mock).mockResolvedValueOnce(mockCreatedComic);

        mockRequest.body = mockRequestBody;

        await comicController.create(mockRequest as Request, mockResponse as Response);

        expect(comicService.create).toHaveBeenCalledWith(mockRequestBody);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedComic);
    });

    it('deve encontrar uma HQ por ID', async () => {
        const mockComicId = '1';
        const mockFoundComic = { _id: '1', titulo: 'HQ', descricao: 'Descrição', dataPublicacao: '2024-05-04', capa: 'imagem.jpg' };

        (comicService.findById as jest.Mock).mockResolvedValueOnce(mockFoundComic);

        mockRequest.params = { id: mockComicId };

        await comicController.findById(mockRequest as Request, mockResponse as Response);

        expect(comicService.findById).toHaveBeenCalledWith(mockComicId);
        expect(mockResponse.json).toHaveBeenCalledWith(mockFoundComic);
    });

    it('deve encontrar todas as HQs', async () => {
        const mockFoundComics = [
            { _id: '1', titulo: 'HQ1', descricao: 'Descrição', dataPublicacao: '2024-05-04', capa: 'imagem1.jpg' },
            { _id: '2', titulo: 'HQ2', descricao: 'Descrição', dataPublicacao: '2024-05-05', capa: 'imagem2.jpg' }
        ];

        (comicService.findAll as jest.Mock).mockResolvedValueOnce(mockFoundComics);

        await comicController.find(mockRequest as Request, mockResponse as Response);

        expect(comicService.findAll).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith(mockFoundComics);
    });

    it('deve atualizar uma HQ', async () => {
        const mockComicId = '1';
        const mockRequestBody = { titulo: 'Nova HQ', descricao: 'Nova Descrição', dataPublicacao: '2024-05-06', capa: 'nova_imagem.jpg' };
        const mockUpdatedComic = { _id: '1', ...mockRequestBody };

        (comicService.update as jest.Mock).mockResolvedValueOnce(mockUpdatedComic);

        mockRequest.params = { id: mockComicId };
        mockRequest.body = mockRequestBody;

        await comicController.update(mockRequest as Request, mockResponse as Response);

        expect(comicService.update).toHaveBeenCalledWith(mockComicId, mockRequestBody);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedComic);
    });

    it('deve excluir uma HQ', async () => {
        const mockComicId = '1';
        const mockDeleteMessage = 'HQ excluída com sucesso';

        (comicService.delete as jest.Mock).mockResolvedValueOnce(mockDeleteMessage);

        mockRequest.params = { id: mockComicId };

        await comicController.delete(mockRequest as Request, mockResponse as Response);

        expect(comicService.delete).toHaveBeenCalledWith(mockComicId);
        expect(mockResponse.json).toHaveBeenCalledWith(mockDeleteMessage);
    });

    it('Deve retornar o total de registros', async () => {
        const totalRegistros = 5;
    
        (comicService.registrosAtuais as jest.Mock).mockResolvedValueOnce(totalRegistros);
    
        await comicController.totalRegisters(mockRequest as Request, mockResponse as Response);
    
        expect(comicService.registrosAtuais).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith({ totalRegistros });
      });

      it('Deve buscar um comic por título', async () => {
        const mockComic = [{ titulo: 'Comic 1' }];
    
        (comicService.findByName as jest.Mock).mockResolvedValueOnce(mockComic);
    
        mockRequest.params = { titulo: 'Comic 1' };
    
        await comicController.findByName(mockRequest as Request, mockResponse as Response);
    
        expect(comicService.findByName).toHaveBeenCalledWith('Comic 1');
        expect(mockResponse.json).toHaveBeenCalledWith(mockComic);
      });

      

});