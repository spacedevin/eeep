import { CustomXMLPartState } from '../../spec/CustomXMLParts';

export function createCustomXmlPart(id: string, content: string, namespace: string): CustomXMLPartState {
  return {
    parts: new Map([[id, {
      id,
      type: 'custom',
      content,
      namespace,
      contentType: 'application/xml',
      relationships: []
    }]]),
    management: {
      validation: {
        validateOnAdd: true,
        validateOnModify: true,
        schemaValidation: false
      },
      namespaces: new Map()
    },
    operations: {
      query: {
        xpath: true,
        namespaces: true,
        cache: true
      },
      transform: {
        enabled: false,
        stylesheets: new Map()
      }
    },
    schema: {
      validation: {
        mode: 'lax',
        cacheSchemas: true
      },
      generation: {
        enabled: false,
        annotations: false,
        documentation: false
      }
    }
  };
}

export function addXmlPart(state: CustomXMLPartState, id: string, content: string, namespace: string): CustomXMLPartState {
  return {
    ...state,
    parts: new Map(state.parts).set(id, {
      id,
      type: 'custom',
      content,
      namespace,
      contentType: 'application/xml',
      relationships: []
    })
  };
}

export function removeXmlPart(state: CustomXMLPartState, id: string): CustomXMLPartState {
  const newParts = new Map(state.parts);
  newParts.delete(id);
  return {
    ...state,
    parts: newParts
  };
}