import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import Pane from "./Pane.vue";
import { useVuePaneStore } from "../state/vueAdapter";

describe("Pane.vue", () => {
	let store: ReturnType<typeof useVuePaneStore>;

	beforeEach(() => {
		store = useVuePaneStore();
		store.setPanes([]); // Ensure the store is empty before each test
	});

	it("should populate the store after rendering", async () => {
		expect(store.panes.value).toHaveLength(0); // Store should be empty before rendering

		const wrapper = mount(Pane);

		await wrapper.vm.$nextTick(); // Wait for the component to render

		expect(store.panes.value).toHaveLength(1); // Store should have one pane after rendering
		expect(store.panes.value[0]).toMatchObject({
			width: 50,
			minWidth: 0,
			maxWidth: 100,
			isVisible: true,
		});
	});
});
