import { HttpStatus, HttpException } from "@nestjs/common";

export class NormalizeWord {
  constructor(readonly word: string) {
    this.word = word;
  }

  static create(word: string): string[] {
    return new NormalizeWord(word).normalize();
  }

  normalize(): string[] {
    try {
      if (!this.word) throw new HttpException('Word is required to normalize', HttpStatus.BAD_REQUEST);
      return this.word
        .normalize('NFD')
        .toLowerCase()
        .replace(/[^a-záéíóúüñ\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ');
    } catch (e: any) {
      const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
      throw new HttpException(e, errorStatus);
    }
  }

}