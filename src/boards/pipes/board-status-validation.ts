import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boards.model';

export class BoardStatusVaildationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata', metadata);

    return value;
  }
}
