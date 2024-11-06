import { BasketIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

export const orderType = defineType({
	name: "order",
	title: "Orders",
	type: "document",
	icon: BasketIcon,
	fields: [
		defineField({
			name: "orderNumber",
			title: "Order Number",
			type: "string",
			validation: (Rule) => Rule.required().error("Order Number is required"),
		}),
		defineField({
			name: "stripeCheckoutSessionID",
			title: "Stripe Checkout Session ID",
			type: "string",
		}),
		defineField({
			name: "stripeCustomerID",
			title: "Stripe Customer ID",
			type: "string",
		}),
		defineField({
			name: "customerName",
			title: "Customer Name",
			type: "string",
			validation: (Rule) => Rule.required().error("Customer Name is required"),
		}),
		defineField({
			name: "email",
			title: "Customer Email",
			type: "string",
			validation: (Rule) => Rule.required().error("Customer Email is required"),
		}),
		defineField({
			name: "stripePaymentIntentID",
			title: "Stripe Payment Intent ID",
			type: "string",
			validation: (Rule) =>
				Rule.required().error("Stripe Payment Intent ID is required"),
		}),
		defineField({
			name: "products",
			title: "Products",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							name: "product",
							title: "Product",
							type: "reference",
							to: [{ type: "product" }],
						}),
						defineField({
							name: "quantity",
							title: "Quantity",
							type: "number",
						}),
					],
					preview: {
						select: {
							product: "product.name",
							quantity: "quantity",
							media: "product.image",
							price: "product.price",
							currency: "product.currency",
						},
						prepare(select) {
							const { product, quantity, media, price, currency } = select
							return {
								title: `${product} x ${quantity}`,
								subtitle: `${quantity} * ${price}`,
								media,
							}
						},
					},
				}),
			],
			validation: (Rule) =>
				Rule.required().error("At least one product is required"),
		}),
		defineField({
			name: "total",
			title: "Total",
			type: "number",
			validation: (Rule) => Rule.required().error("Total is required"),
		}),
	],
	preview: {
		select: {
			title: "orderNumber",
			subtitle: "customer.name",
		},
	},
})
