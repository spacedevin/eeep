export interface RibbonUIState {
  tabs: Array<{
    id: string;
    label: string;
    visible: boolean;
    position: number;
    contextual?: {
      color: string;
      title: string;
    };
    groups: Array<{
      id: string;
      label: string;
      visible: boolean;
      controls: Array<{
        type: 'button' | 'dropdown' | 'checkbox' | 'radio' | 'split' | 'gallery';
        id: string;
        label: string;
        image?: string;
        tooltip?: string;
        enabled: boolean;
        visible: boolean;
        size: 'large' | 'normal' | 'small';
        properties?: {
          pressed?: boolean;
          selected?: boolean;
          items?: Array<{
            id: string;
            label: string;
            image?: string;
          }>;
        };
      }>;
    }>;
  }>;

  customization: {
    enabled: boolean;
    persistence: {
      save: boolean;
      location: string;
    };
    restrictions: {
      allowAdd: boolean;
      allowRemove: boolean;
      allowModify: boolean;
      protectedControls: string[];
    };
  };

  events: {
    onClick?: (controlId: string) => void;
    onSelectionChange?: (controlId: string, value: any) => void;
    onTabChange?: (tabId: string) => void;
    onVisibilityChange?: (elementId: string, visible: boolean) => void;
  };

  state: {
    activeTab?: string;
    expandedGroups: Set<string>;
    selectedControls: Map<string, any>;
    disabledControls: Set<string>;
  };
}