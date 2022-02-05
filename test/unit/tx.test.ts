import {ClientInterface, createNewClient} from '../../src/client/client';
import {InputOrOutput} from '../../src/types/bank-proto.types';

describe('Transactions unit tests', () => {
	let client: ClientInterface;
	beforeEach(async () => {
		client = createNewClient({ nodeUrl: 'http://143.110.246.141:26657' });
		await client.wallet.restoreWithSeed(
			'power thing inmate obscure rubber frequent grit hair below museum notable reopen spoon prize family caught axis host',
			'password'
		);
	});
	describe('Bank ', () => {
		it('Send MsgSend tx', async () => {
			const txResult = await client.bank.msgSend(
				{
					recipient: 'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru',
					amount: [{ denom: 'idep', amount: '25' }],
				},
				{
					from: client.wallet.address,
					publicKey: client.wallet.publicKey,
					fee: {
						gas: '7000',
						amount: [{ denom: 'idep', amount: '700' }],
					},
					password: 'password',
				}
			);
			console.log(txResult);
		});
		it('Send MsgSend tx', async () => {
			const inputs: InputOrOutput[] = [{ address: client.wallet.address, coins: [{ denom: 'idep', amount: '150' }] }];
			const outputs: InputOrOutput[] = [{ address: 'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru', coins: [{ denom: 'idep', amount: '150' }] }];
			const txResult = await client.bank.msgMultiSend(
				inputs,
				outputs,
				{
					from: client.wallet.address,
					publicKey: client.wallet.publicKey,
					fee: {
						gas: '7000',
						amount: [{ denom: 'idep', amount: '700' }],
					},
					password: 'password',
				}
			);
			console.log(txResult);
		});
	});
	describe('Nft ', () => {
		// neeeds to be finished
	});

});