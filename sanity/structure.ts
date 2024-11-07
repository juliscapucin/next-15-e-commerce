import type { StructureResolver } from "sanity/structure"

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Next 15 Ecommerce")
		.items([
			S.documentTypeListItem("category").title("Categories"),
			S.divider(),
			S.listItem().title("Sections").child(
				S.list().title("Sections").items([
					// Add your section items here
				])
			),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) => item.getId() && !["category"].includes(item.getId()!)
			),
		])
