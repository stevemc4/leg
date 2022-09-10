import { Registry } from './Registry'
import { MOV, ADD, SUB, MUL, DIV, MOD, HLT } from './Opcode'
import { parseInstruction } from './Instructions'

class BasicController {
  // Registries
  AX = 0
  BX = 0

  instructions: string[] = []
  private instructionPointer = 0

  run (): void {
    while (true) {
      const currentInstruction = parseInstruction(this.instructions[this.instructionPointer])

      // Handle HLT here, due to conflicting break statement in switch
      if (currentInstruction.opcode === HLT) break

      switch (currentInstruction.opcode) {
        case MOV: this.mov(currentInstruction.from, currentInstruction.to); break
        case ADD: this.add(currentInstruction.left, currentInstruction.right, currentInstruction.to); break
        case SUB: this.sub(currentInstruction.left, currentInstruction.right, currentInstruction.to); break
        case MUL: this.mul(currentInstruction.left, currentInstruction.right, currentInstruction.to); break
        case DIV: this.div(currentInstruction.left, currentInstruction.right, currentInstruction.to); break
        case MOD: this.mod(currentInstruction.left, currentInstruction.right, currentInstruction.to); break
      }

      this.instructionPointer += 1
    }
  }

  private numberOrRegistryValue (value: number | Registry): number {
    if (typeof value === 'number') {
      return value
    } else {
      return this.readRegistry(value)
    }
  }

  private readRegistry (registry: Registry): number {
    switch (registry) {
      case 'AX': return this.AX
      case 'BX': return this.BX
    }
  }

  private writeRegistry (registry: Registry, value: number): void {
    switch (registry) {
      case 'AX': this.AX = value; break
      case 'BX': this.BX = value; break
    }
  }

  // Instruction runners
  private mov (from: number | Registry, to: Registry): void {
    this.writeRegistry(to, this.numberOrRegistryValue(from))
  }

  private add (left: number | Registry, right: number | Registry, to: Registry): void {
    const sum = this.numberOrRegistryValue(left) + this.numberOrRegistryValue(right)
    this.writeRegistry(to, sum)
  }

  private sub (left: number | Registry, right: number | Registry, to: Registry): void {
    const sum = this.numberOrRegistryValue(left) - this.numberOrRegistryValue(right)
    this.writeRegistry(to, sum)
  }

  private mul (left: number | Registry, right: number | Registry, to: Registry): void {
    const sum = this.numberOrRegistryValue(left) * this.numberOrRegistryValue(right)
    this.writeRegistry(to, sum)
  }

  private div (left: number | Registry, right: number | Registry, to: Registry): void {
    const sum = this.numberOrRegistryValue(left) / this.numberOrRegistryValue(right)
    this.writeRegistry(to, sum)
  }

  private mod (left: number | Registry, right: number | Registry, to: Registry): void {
    const sum = this.numberOrRegistryValue(left) % this.numberOrRegistryValue(right)
    this.writeRegistry(to, sum)
  }
}

export { BasicController as CPU, Registry }
