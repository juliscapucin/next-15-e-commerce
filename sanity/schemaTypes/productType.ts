import { TrolleyIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const productType = defineType({
	name: "product",
	title: "Products",
	type: "document",
	icon: TrolleyIcon,
	fields: [
		defineField({
			name: "name",
			title: "Product Name",
			type: "string",
			validation: (Rule) => Rule.required().error("Product Name is required"),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
			},
			validation: (Rule) => Rule.required().error("Slug is required"),
		}),
		defineField({
			name: "price",
			title: "Price",
			type: "number",
			validation: (Rule) => Rule.required().error("Price is required"),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			validation: (Rule) => Rule.required().error("Description is required"),
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required().error("Image is required"),
		}),
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
			validation: (Rule) =>
				Rule.required().error("At least one category is required"),
		}),
		defineField({
			name: "stock",
			title: "Stock",
			type: "number",
			validation: (Rule) =>
				Rule.required()
					.min(0)
					.error("Stock is required and must be a non-negative number"),
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "image",
			price: "price",
		},
		prepare(select) {
			const { title, media, price } = select
			return {
				title,
				media,
				subtitle: `$${price}`,
			}
		},
	},
})
