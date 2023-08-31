import pluralize from 'pluralize-esm';
import { defineField } from 'sanity';

export default defineField({
	name: 'gallery',
	type: 'object',
	title: 'Gallery',
	fields: [
		defineField({
			name: 'images',
			type: 'array',
			title: 'Images',
			of: [
				{
					name: 'image',
					type: 'image',
					title: 'Image',
					options: {
						hotspot: true
					},
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
							title: 'Alt text'
						})
					]
				}
			],
			options: {
				layout: 'grid'
			}
		})
	],
	preview: {
		select: {
			images: 'images',
			image: 'images.0'
		},
		prepare(selection) {
			const { images, image } = selection;
			return {
				subtitle: images.length > 0 ? pluralize('image', images.length, true) : 'No images',
				image
			};
		}
	}
});
