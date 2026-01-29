import { TestBed } from '@angular/core/testing';
import { TokenService } from './token';

describe('TokenService', () => {
  it('should be created', () => {
    const service = TestBed.inject(TokenService);
    expect(service).toBeTruthy();
  });
});
