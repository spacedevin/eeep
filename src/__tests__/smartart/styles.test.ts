import {
  setSmartArtStyle,
  setSmartArtTextStyle,
  setSmartArtLayout
} from '../../smartart/styles';
import { createSmartArt, addSmartArtNode } from '../../smartart/smartart';

describe('SmartArt Styles', () => {
  test('sets node style', () => {
    let state = createSmartArt('list');
    state = addSmartArtNode(state, 'Node 1');
    const nodeId = state.nodes[0].id;

    state = setSmartArtStyle(state, nodeId, {
      shape: 'rectangle',
      fill: {
        color: '#FF0000',
        transparency: 0.5
      },
      border: {
        color: '#000000',
        width: 2,
        style: 'solid'
      }
    });

    const node = state.nodes.find(n => n.id === nodeId);
    expect(node?.style.shape).toBe('rectangle');
    expect(node?.style.fill?.color).toBe('#FF0000');
    expect(node?.style.border?.width).toBe(2);
  });

  test('sets text style', () => {
    let state = createSmartArt('list');
    state = addSmartArtNode(state, 'Node 1');
    const nodeId = state.nodes[0].id;

    state = setSmartArtTextStyle(state, nodeId, {
      font: {
        name: 'Arial',
        size: 12,
        bold: true,
        color: '#000000'
      }
    });

    const node = state.nodes.find(n => n.id === nodeId);
    expect(node?.content.formatting?.font?.name).toBe('Arial');
    expect(node?.content.formatting?.font?.bold).toBe(true);
  });

  test('sets layout properties', () => {
    let state = createSmartArt('list');
    state = setSmartArtLayout(state, {
      direction: 'vertical',
      alignment: 'center',
      spacing: 30,
      distribution: 'even'
    });

    expect(state.layout.properties.direction).toBe('vertical');
    expect(state.layout.properties.alignment).toBe('center');
    expect(state.layout.properties.spacing).toBe(30);
  });
});
