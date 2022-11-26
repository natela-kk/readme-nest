import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(dto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(dto, plainObject, { excludeExtraneousValues: true })
}
