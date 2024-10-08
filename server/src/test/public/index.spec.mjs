import { publicService } from '../../services/index.ts';
import chai from 'chai';
import { mock_create_user } from '../../mock/public.mock.ts';

describe('Test create user', () => {
    it('user should be created', async () => {
        const actualResult = await publicService.create_user(mock_create_user);
        console.log('Result:', actualResult);
        chai.expect(actualResult).to.equal('OK');
    });
});  