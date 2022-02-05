import {ClientInterface, createNewClient} from '../../src/client/client';

describe('Query unit teests', () => {
	let client: ClientInterface;
	beforeAll(() => {
		client = createNewClient({ nodeUrl: 'http://143.110.246.141:26657' });
	});

	describe('Auth ', () => {
		it('query auth info', async () => {
			const res = await client.auth.checkAccountInfo(
				'idep1myqd7rayy58s4qj0x57jlwggvx529turcaxc7g'
			);
			console.log(res);
		});
		it('query auth info', async () => {
			const res = await client.auth.checkAuthParams();
			console.log(res);
		});
	});

	describe('Bank ', () => {
		it('Check single balance', async () => {
			const res = await client.bank.checkBalance(
				'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru',
				'idep'
			);
			console.log(res);
			expect(res.balance).toHaveProperty('amount');
			expect(res.balance.denom).toBe('idep');
		});
		it('Check all balancs', async () => {
			const res = await client.bank.checkALlBalances(
				'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru',
			);
			console.log(res);
			expect(res.balancesList).toBeDefined();
		});
		it('Check supply', async () => {
			const res = await client.bank.checkSupply(
				'idep',
			);
			console.log(res);
			expect(res.amount).toHaveProperty('amount');
			expect(res.amount.denom).toBe('idep');
		});
		it('Check params', async () => {
			const res = await client.bank.checkParams();
			console.log(res);
			expect(res.params.defaultSendEnabled).toBeTruthy();
			expect(res.params).toHaveProperty('sendEnabledList');
		});
	});
	describe('Nft ', () => {
		it('Cheeck supply', async () => {
			const { amount } = await client.nft.checkSupply('karennewaddress1denomid', 'idep1qrmjwqyrwepkn8wahmqdvs3an6mvnkl6keq97e');
			console.log(amount);
			expect(amount).toBe(0);
		});
		it('Cheeck owner', async () => {
			const res = await client.nft.checkOwner(
				'idep1qrnjwqyrwepkn8wahmqdvs3an6mvnk16keq97e',
			);
			console.log(res);
			//	expect(denomId).toBe('karennewaddress1denomid');
			//expect(tokenIdsList).toBe('karennewaddress1nft');
		});
		it('Check collection', async () => {
			const res = await client.nft.checkCollection(
				'karentest1denomid',
			);
			console.log(res);
		});
		it('Check denom', async () => {
			const res = await client.nft.checkDenom(
				'karentest1denomid',
			);
			console.log(res);
		});
		it('Check multiple denoms', async () => {
			const res = await client.nft.checkMultipleDenoms(
			);
			console.log(res);
		});
		it('Check nft', async () => {
			const res = await client.nft.checkNft('karentest1denomid', 'karentest1nft1');
			console.log(res);
		});
	});

});