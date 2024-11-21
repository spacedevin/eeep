import { DrawingState } from '../../spec/Drawing';

export function createDrawing(
  type: DrawingState['type'],
  id: string,
  position: {
    from: {
      row: number;
      rowOffset?: number;
      column: number;
      columnOffset?: number;
    };
    to?: {
      row: number;
      rowOffset?: number;
      column: number;
      columnOffset?: number;
    };
  }
): DrawingState {
  return {
    type,
    id,
    name: id,
    position,
    size: {
      width: 100,
      height: 100,
      lockAspectRatio: true
    },
    layout: {
      zOrder: 1,
      groupId: undefined,
      locked: false,
      printWithSheet: true,
      hidden: false
    }
  };
}

export function setDrawingStyle(drawing: DrawingState, style: DrawingState['style']): DrawingState {
  return {
    ...drawing,
    style: {
      ...drawing.style,
      ...style
    }
  };
}

export function setDrawingText(drawing: DrawingState, text: string, formatting?: DrawingState['text']): DrawingState {
  return {
    ...drawing,
    text: {
      content: text,
      ...formatting
    }
  };
}

export function setDrawingLayout(drawing: DrawingState, layout: Partial<Required<DrawingState>['layout']>): DrawingState {
  const currentLayout = drawing.layout ?? {
    zOrder: 1,
    groupId: undefined,
    locked: false,
    printWithSheet: true,
    hidden: false
  };

  return {
    ...drawing,
    layout: {
      ...currentLayout,
      ...layout,
      zOrder: layout.zOrder ?? currentLayout.zOrder
    }
  };
}