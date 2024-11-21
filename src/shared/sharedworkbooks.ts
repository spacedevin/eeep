import { SharedWorkbookState } from '../../spec/SharedWorkbooks';

export function createSharedWorkbook(): SharedWorkbookState {
  return {
    sharing: {
      enabled: true,
      mode: 'shared',
      users: []
    },
    tracking: {
      enabled: true,
      history: [],
      settings: {
        keepHistory: 30,
        trackFormulas: true,
        trackFormatting: true,
        highlightChanges: true
      }
    },
    protection: {
      allowedUsers: new Set(),
      restrictions: {
        structure: true,
        windows: true,
        ranges: new Map()
      },
      features: new Map()
    },
    collaboration: {
      conflicts: {
        resolution: 'lastWrite'
      },
      merge: {
        enabled: true,
        strategy: 'automatic',
        rules: new Map()
      },
      notifications: {
        enabled: true,
        events: new Set(['change', 'conflict', 'access', 'review'])
      }
    }
  };
}

export function addSharedUser(
  state: SharedWorkbookState,
  id: string,
  name: string,
  access: 'read' | 'write' | 'admin'
): SharedWorkbookState {
  return {
    ...state,
    sharing: {
      ...state.sharing,
      users: [
        ...state.sharing.users,
        {
          id,
          name,
          access: {
            type: access,
            ranges: [],
            features: new Set()
          },
          status: 'active',
          lastAccess: new Date()
        }
      ]
    }
  };
}