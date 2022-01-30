const { assert } = require('chai')

const Poem = artifacts.require('./Poem.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Poem', ([deployer, poet]) => {
  let poem

  before(async () => {
    poem = await Poem.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await poem.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await poem.name()
      assert.equal(name, 'Sonnet Dapp')
    })
  })

  describe('lines', async () => {
    let result, lineCount

    before(async () => {
      result = await poem.addLine('two bee or not two bees?', { from: poet })
      lineCount = await poem.lineCount()
    })

    it('adds lines', async () => {
      // SUCCESS
      assert.equal(lineCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), lineCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'two bee or not two bees?', 'name is correct')
      assert.equal(event.poet, poet, 'owner is correct')
      
      // FAILURE: Product must have a name
      await await poem.addLine('', { from: poet }).should.be.rejected;
    })
  })
})