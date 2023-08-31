import { defineConfig, isDev } from 'sanity';
import { schemaTypes } from './schemas';
import { deskTool } from 'sanity/desk';
import { structure } from './desk';

import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array';
import { media, mediaAssetSource } from 'sanity-plugin-media';
import { customDocumentActions } from './plugins/customDocumentActions';

import type { AssetSource } from 'sanity';

const devOnlyPlugins = [visionTool()];

// Sanity configuration
export default defineConfig({
	basePath: '/studio',
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_SANITY_DATASET,
	title: import.meta.env.VITE_SANITY_PROJECT_TITLE,
	plugins: [
		deskTool({ structure }),
		colorInput(),
		imageHotspotArrayPlugin(),
		customDocumentActions(),
		media(),
		...(isDev ? devOnlyPlugins : [])
	],
	schema: {
		types: schemaTypes
	},
	form: {
		file: {
			assetSources: (previousAssetSources: AssetSource[]) => {
				return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource);
			}
		},
		image: {
			assetSources: (previousAssetSources: AssetSource[]) => {
				return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource);
			}
		}
	}
});
