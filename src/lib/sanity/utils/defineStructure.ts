import type { ConfigContext } from 'sanity';
import type { StructureBuilder } from 'sanity/desk';

/**
 * Helper for creating and typing composable desk structure parts.
 */
export default function defineStructure<StructureType>(
	factory: (S: StructureBuilder, context: ConfigContext) => StructureType
) {
	return factory;
}
