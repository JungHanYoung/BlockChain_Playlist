import * as Crypto from 'crypto-js';
import * as Redis from 'ioredis';

export class Block {
	public static calculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
		Crypto.SHA256(index + previousHash + timestamp + data).toString();

	public static getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

	public index: number;
	public hash: string;
	public previousHash: string;
	public data: string;
	public timestamp: number;
	constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
		this.index = index;
		this.hash = hash;
		this.previousHash = previousHash;
		this.data = data;
		this.timestamp = timestamp;
	}

	public async create(data: string): Promise<Block> {
		const previousBlock: Block = await this.getLatest();
		const newIndex: number = previousBlock.index;
		const newTimestamp: number = Block.getNewTimeStamp();
		const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
		const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
		return newBlock;
	}

	private async getLatest() {
		const redisConn = new Redis();
		const latestBlockId = await redisConn.get('latestBlock');
		const latestBlock = await redisConn.hgetall(latestBlockId);
		return latestBlock;
	}
}
