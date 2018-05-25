# BlockChain

## Block 정의
- 인덱스
- 타임스탬프
- 데이터
- 이전 해쉬
- 해쉬
- 연산 횟수

## Block 구현
~~~
class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
		this.timestampm = timestampm;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
    }
}
~~~
index, timestamp, data, previousHash, nonce로 해쉬를 계산하여 hash에 넣어준다.

~~~
// 해쉬 계산하기
// yarn add crypto-js   sha256해쉬 알고리즘
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor() {
        ...
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    // 블록 채굴 메소드
    mineBlock(difficulty) {
		// 0 ~ difficulty
		while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
			this.nonce++;
			// 해쉬를 계속 갱신하면서 앞의 0 갯수가 같은지?
			this.hash = this.calculateHash();
		}

		console.log('Block minded ' + this.hash);
	}
}
~~~
블록 채굴을 위한 메소드인 mineBlock은

블록체인의 난이도에 따라 블록의 연산횟수를 증가시키도록 한다.

## 채굴 알고리즘

예를 들어 난이도(difficulty)가 3이라면

블록 해쉬 문자열의 앞에서 3개 문자가 모두 0이 될때까지 연산횟수(nonce)를 증가시키고 증가된 nonce에 따라 해쉬를 바꾼다.

즉 nonce가 계속 바뀌면서 hash를 새로 생성하고 새로 생성한 hash가 앞에서부터 난이도 만큼의 0을 나타내면 
채굴은 성공하게 된다.

ex) 
난이도 3에서의 
000aeac5eabde3592b3ece5ea52374ba0f5ae6654c1f96c4364f7136a1b36e52

^^^

## 블록체인
- chain : 블록체인
- difficulty : 블록체인의 난이도
~~~
class BlockChain {
    constructor() {
        this.chain = [ this.createGenesisBlock() ];
        this.difficulty = 3;
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2017', 'GenesisBlcok', '0');
    }
}
~~~
> 체인이 생성될 때는 체인의 시초가 되는 블록이 자동으로 생성되게 한다.
> 난이도는 조절
~~~
// 블록체인에 블록 추가
class BlockChain{
    ...
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
}
~~~
> 블록을 추가할 때는 무조건 블록을 채굴함으로써 무분별하게 블록이 추가되는 것을 막는다.
~~~
class Block {

    isChainValid() {
        for(let i = 1 ; i < this.chain.length ; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            // 현재 블록을 해쉬 계산하여 다시 비교
            if(currentBlock.hash !== currentBlock.caculateHash()){
                return false;
            }
            // 현재 블록이 참조하는 이전 해쉬와 이전 해쉬 비교
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
~~~
> 블록체인 전체가 유효한 데이터인지 확인하는 과정이다.

~~~
// 블록체인을 만들고 블록들을 추가해보기
let markCoin = new BlockChain();

console.log('Mining block 1...');
markCoin.addBlock(new Block(1, '10/08/2017', { amount: 10}))
// 추가되는 블록은 previousHash가 뭔지 모름.
console.log('Mining block 2...');
markCoin.addBlock(new Block(2, '12/10/2017', { amount: 20}));

console.log(JSON.stringify(markCoin, null, 4));

console.log('Is blockchain valid? ' + markCoin.isChainValid());
~~~

## Conclusion
~~~
// difficulty 3
// $ node index
Mining block 1...
Block minded 000aeac5eabde3592b3ece5ea52374ba0f5ae6654c1f96c4364f7136a1b36e52
Mining block 2...
Block minded 000be2fe66a04b4fe9406b4ac2f13c47cd3801321e2699ba60b2e4bce509ecc8
{
    "chain": [
        {
            "index": 0,
            "timestampm": "01/01/2017",
            "data": "Genesis block",
            "previousHash": "0",
            "hash": "c62b8e4162c75e1fe45dad6af8fcd2672a258941af50ee87f19eacfc190c2ce3",
            "nonce": 0
        },
        {
            "index": 1,
            "timestampm": "10/08/2017",
            "data": {
                "amount": 4
            },
            "previousHash": "c62b8e4162c75e1fe45dad6af8fcd2672a258941af50ee87f19eacfc190c2ce3",
            "hash": "000aeac5eabde3592b3ece5ea52374ba0f5ae6654c1f96c4364f7136a1b36e52",
            "nonce": 1134
        },
        {
            "index": 2,
            "timestampm": "12/10/2017",
            "data": {
                "amount": 10
            },
            "previousHash": "000aeac5eabde3592b3ece5ea52374ba0f5ae6654c1f96c4364f7136a1b36e52",
            "hash": "000be2fe66a04b4fe9406b4ac2f13c47cd3801321e2699ba60b2e4bce509ecc8",
            "nonce": 326
        }
    ],
    "difficulty": 3
}
Is blockchain valid? true
~~~
난이도가 높아질 수록 채굴하는 시간이 더욱 많이 걸린다.

채굴 후 추가된 블록을 확인해보면 nonce, 즉 연산횟수가 기하급수적으로 많아지는 것을 볼 수 있다.
~~~
// difficulty 5
{
    "chain": [
        {
            "index": 0,
            "timestampm": "01/01/2017",
            "data": "Genesis block",
            "previousHash": "0",
            "hash": "c62b8e4162c75e1fe45dad6af8fcd2672a258941af50ee87f19eacfc190c2ce3",
            "nonce": 0
        },
        {
            "index": 1,
            "timestampm": "10/08/2017",
            "data": {
                "amount": 4
            },
            "previousHash": "c62b8e4162c75e1fe45dad6af8fcd2672a258941af50ee87f19eacfc190c2ce3",
            "hash": "00000a7b3d77eb7f214ea632caa5a03fe05842cdc5c4b767becac4a30509dc39",
            "nonce": 792320
        },
        {
            "index": 2,
            "timestampm": "12/10/2017",
            "data": {
                "amount": 10
            },
            "previousHash": "00000a7b3d77eb7f214ea632caa5a03fe05842cdc5c4b767becac4a30509dc39",
            "hash": "0000010b4ecde0392d5f0fba13cfa7880960660650f0de3c5c7f0f2efc36787c",
            "nonce": 1393281
        }
    ],
    "difficulty": 5
}
~~~