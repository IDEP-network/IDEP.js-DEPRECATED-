import {KdfParams} from '../types/types';

export const getDefaultKdfParams = (): KdfParams => {
	const kdfParams: KdfParams = {
			keylen: 32,
			N: 16384,
			r: 8,
			p: 1,
	};
	return kdfParams;
};
