import { Registry } from './Registry'
import { MOV, ADD, SUB, MUL, DIV, MOD, HLT } from './Opcode'

interface MOVInst {
  opcode: typeof MOV
  from: number | Registry
  to: Registry
}

interface ArithmeticInst {
  opcode: typeof ADD | typeof SUB | typeof MUL | typeof DIV | typeof MOD
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

  switch (opcode) {
    case MOV: {
      const from = numberOrRegistry(rest[0])
      const to = rest[1] as Registry
      return { opcode, from, to }
    }

    case ADD:
    case SUB:
    case MUL:
    case DIV:
    case MOD: {
      const left = numberOrRegistry(rest[0])
      const right = numberOrRegistry(rest[1])
      const to = rest[2] as Registry

      return { opcode, left, right, to }
    }

    case HLT: {
      return { opcode }
    }

    default: throw Error(`Invalid opcode: ${opcode}`)
  }
}

export { Instruction, parseInstruction }
