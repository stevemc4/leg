import { CPU } from './modules/BasicController/CPU'

const main = () => {
  const cpu = new CPU()

  cpu.instructions = ['MOV 5 AX', 'ADD AX 2 AX', 'MOV AX BX', 'SUB AX BX AX', 'HLT']
  console.log('Executing...')
  cpu.run()
  console.log('Execution Complete')
  console.log(`CPU AX: ${cpu.AX}`)
  console.log(`CPU BX: ${cpu.BX}`)
}

main()
