
import { saveFile1, saveFile2, saveFile3 } from './../src/savefile';

describe('saveFile1', () => {
  test('happy path', () => {
    expect(saveFile1('happy')).resolves.toBe(undefined);
  });

  test('connection-error', () => {
    expect(saveFile1('trigger-connection-error')).rejects.toThrow('connection-error');
  });

  test('json-error', () => {
    expect(saveFile1('trigger-json-error')).rejects.toThrow('json-error');
  });

  test('server-error', () => {
    expect(saveFile1('trigger-server-error')).rejects.toThrow('server-error');
  });
});

describe('saveFile2', () => {
  test('happy path', () => {
    expect(saveFile2('happy')).resolves.toBe(undefined);
  });

  test('connection-error', async () => {
    expect(saveFile2('trigger-connection-error')).rejects.toThrow('connection-error');
  });

  test('json-error', () => {
    expect(saveFile2('trigger-json-error')).rejects.toThrow('json-error');
  });

  test('server-error', () => {
    expect(saveFile2('trigger-server-error')).rejects.toThrow('server-error');
  });
});

describe('saveFile3', () => {
  test('happy path', () => {
    expect(saveFile3('happy')).resolves.toBe(undefined);
  });

  test('connection-error', async () => {
    expect(saveFile3('trigger-connection-error')).rejects.toThrow('connection-error');
  });

  test('json-error', () => {
    expect(saveFile3('trigger-json-error')).rejects.toThrow('json-error');
  });

  test('server-error', () => {
    expect(saveFile3('trigger-server-error')).rejects.toThrow('server-error');
  });
});
