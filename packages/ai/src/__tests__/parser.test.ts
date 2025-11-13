import { parseCommandLocal, parseCommand } from '../parser';

describe('AI command parsing', () => {
  it('parses simple send command locally', () => {
    const result = parseCommandLocal('send 1.25 zec to bob');
    expect(result).not.toBeNull();
    expect(result?.action).toBe('send');
    expect(result?.amount).toBeCloseTo(1.25);
    expect(result?.recipient).toBe('bob');
    expect(result?.confidence).toBeGreaterThanOrEqual(0.7);
  });

  it('parses balance query locally', () => {
    const result = parseCommandLocal("what's my balance?");
    expect(result).not.toBeNull();
    expect(result?.action).toBe('balance');
  });

  it('falls back to cloud parser when requested', async () => {
    await expect(parseCommand('Schedule 5 ZEC for tomorrow', true, 'dummy'))
      .resolves.toMatchObject({ action: 'unknown' });
  });
});
