import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const salesType = defineType({
	name: "sale",
	title: "Sales",
	type: "document",
	icon: TagIcon,
	fields: [
		defineField({
			name: "title",
			title: "Sale Title",
			type: "string",
			validation: (Rule) => Rule.required().error("Title is required"),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			validation: (Rule) => Rule.required().error("Description is required"),
		}),
		defineField({
			name: "discountAmount",
			title: "Discount Amount",
			type: "number",
			description: "Enter the discount amount in percentage",
			validation: (Rule) =>
				Rule.required()
					.min(0)
					.error(
						"Discount Amount is required and must be a non-negative number"
					),
		}),
		defineField({
			name: "couponCode",
			title: "Coupon Code",
			type: "string",
			validation: (Rule) => Rule.required().error("Coupon Code is required"),
		}),
		defineField({
			name: "validFrom",
			title: "Valid From",
			type: "datetime",
			validation: (Rule) =>
				Rule.required().error("Valid From date is required"),
		}),
		defineField({
			name: "validUntil",
			title: "Valid Until",
			type: "datetime",
			validation: (Rule) =>
				Rule.required().error("Valid Until date is required"),
		}),
		defineField({
			name: "isActive",
			title: "Is Active",
			type: "boolean",
			initialValue: true,
			description: "Check/uncheck this box to make the sale active/inactive",
			validation: (Rule) =>
				Rule.required().error("Is Active status is required"),
		}),
	],
	preview: {
		select: {
			title: "title",
			discountAmount: "discountAmount",
			couponCode: "couponCode",
			isActive: "isActive",
		},
		prepare({ title, discountAmount, couponCode, isActive }) {
			return {
				title,
				subtitle: `${discountAmount}% off | Code: ${couponCode} | ${
					isActive ? "Active" : "Inactive"
				}`,
			}
		},
	},
})
