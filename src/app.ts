import { CPU } from './modules/BasicController/CPU'

const main = () => {
  const cpu = new CPU()

  cpu.setInstructions(['MOV 5 AX', 'JMP END', 'ADD AX 2 AX', 'MOV AX BX', 'SUB AX BX AX', 'ADD 20 AX AX', 'SEC END', 'SUB AX 7 AX', 'HLT'])
  console.log('Executing...')
  cpu.run()
  console.log('Execution Complete')
  console.log(`CPU AX: ${cpu.AX}`)
  console.log(`CPU BX: ${cpu.BX}`)
}

main()
