import { FontState } from '../../spec/Fonts';

export function createFonts(): FontState {
  return {
    system: {
      defaults: new Map(),
      substitutions: new Map()
    },
    custom: {
      embedded: new Map(),
      web: new Map()
    },
    properties: {
      basic: {
        name: 'Calibri',
        size: 11
      }
    },
    management: {
      loading: {
        async: true,
        timeout: 5000,
        retries: 3,
        validation: true
      },
      optimization: {
        subset: true,
        compress: true,
        cache: {
          enabled: true,
          maxSize: 10 * 1024 * 1024, // 10MB
          ttl: 3600 // 1 hour
        }
      }
    }
  };
}

export function addSystemFont(
  fonts: FontState,
  name: string,
  family: string,
  fallback: string[]
): FontState {
  const newDefaults = new Map(fonts.system.defaults);
  newDefaults.set(name, { name, family, fallback });
  
  return {
    ...fonts,
    system: {
      ...fonts.system,
      defaults: newDefaults
    }
  };
}

export function addCustomFont(
  fonts: FontState,
  name: string,
  data: Uint8Array,
  format: 'ttf' | 'otf' | 'woff' | 'woff2'
): FontState {
  const newEmbedded = new Map(fonts.custom.embedded);
  newEmbedded.set(name, { data, format, subset: true });
  
  return {
    ...fonts,
    custom: {
      ...fonts.custom,
      embedded: newEmbedded
    }
  };
}