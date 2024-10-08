import { publicService } from '../../services/index';
import { mock_create_user } from '../../mock/public.mock';
import { expect, it, describe } from '@jest/globals';


describe('createUser', () => {
    it('should create a user and compare email', async () => {
        const result = await publicService.create_user(mock_create_user);
        expect(result.user.email).toEqual(mock_create_user.email);
    });

    it('should show message email already exist', async () => {
        await expect(publicService.create_user(mock_create_user)).rejects.toThrow('P2002');
    });

});

