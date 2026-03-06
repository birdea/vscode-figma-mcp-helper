import * as assert from 'assert';
import { parseMcpData } from '../../src/figma/McpParser';

suite('McpParser', () => {
  test('Figma URL with node-id', () => {
    const url = 'https://www.figma.com/file/ABC123xyz/MyDesign?node-id=1%3A2';
    const result = parseMcpData(url);
    assert.strictEqual(result.fileId, 'ABC123xyz');
    assert.strictEqual(result.nodeId, '1:2');
  });

  test('Figma design URL without node-id', () => {
    const url = 'https://www.figma.com/design/XYZ789abc/App';
    const result = parseMcpData(url);
    assert.strictEqual(result.fileId, 'XYZ789abc');
    assert.strictEqual(result.nodeId, '');
  });

  test('JSON with fileId and nodeId', () => {
    const json = JSON.stringify({ fileId: 'FILE001', nodeId: '10:20' });
    const result = parseMcpData(json);
    assert.strictEqual(result.fileId, 'FILE001');
    assert.strictEqual(result.nodeId, '10:20');
  });

  test('JSON with file_id and node_id (snake_case)', () => {
    const json = JSON.stringify({ file_id: 'FILE002', node_id: '30:40' });
    const result = parseMcpData(json);
    assert.strictEqual(result.fileId, 'FILE002');
    assert.strictEqual(result.nodeId, '30:40');
  });

  test('Empty string returns empty ids', () => {
    const result = parseMcpData('');
    assert.strictEqual(result.fileId, '');
    assert.strictEqual(result.nodeId, '');
  });

  test('Invalid input returns empty ids', () => {
    const result = parseMcpData('not a url or json');
    assert.strictEqual(result.fileId, '');
    assert.strictEqual(result.nodeId, '');
  });
});
