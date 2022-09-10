import { Registry } from './Registry'
import { MOV, ADD, SUB, HLT } from './Opcode'

const Opcodes = [
  'MOV',
  'ADD',
  'HLT',
  'SUB'
]

interface MOVInst {
  opcode: typeof MOV
  from: number | Registry
  to: Registry
}

interface ArithmeticInst {
  opcode: typeof ADD | typeof SUB
  left: number | Registry
  right: number | Registry
  to: Registry
}

interface SimpleInst {
  opcode: typeof HLT
}

type Instruction = MOVInst | ArithmeticInst | SimpleInst

const numberOrRegistry = (value: string): number | Registry => Number.isNaN(Number.parseInt(value)) ? value as Registry : Number.parseInt(value)

const parseInstruction = (line: string): Instruction => {
  const [opcode, ...rest] = line.split(' ')

  const op = Opcodes.find(value => value === opcode.toUpperCase())
  switch (op) {
    case 'MOV': {
      const from = numberOrRegistry(rest[0])
      const to = rest[1] as Registry
      return { opcode: op, from, to }
    }

    case 'ADD':
    case 'SUB': {
      const left = numberOrRegistry(rest[0])
      const right = numberOrRegistry(rest[1])
      const to = rest[2] as Registry

      return { opcode: op, left, right, to }
    }

    case 'HLT': {
      return { opcode: op }
    }

    default: throw Error(`Invalid opcode: ${op}`)
  }
}

export { Instruction, parseInstruction }
