import { reactive, toRefs } from "vue";
import usePaneStore from "./state"; // Adjust the path as necessary
import { Pane } from "../types";

const zustandStore = usePaneStore.getState();

const state = reactive({
	panes: zustandStore.panes,
});

const setPanes = (newPanes: Pane[]) => {
	usePaneStore.getState().setPanes(newPanes);
	state.panes = newPanes;
};

const updatePane = (paneId: Pane["id"], newProps: Partial<Pane>) => {
	usePaneStore.getState().updatePane(paneId, newProps);
	state.panes = usePaneStore.getState().panes;
};

export const useVuePaneStore = () => {
	return {
		...toRefs(state),
		setPanes,
		updatePane,
	};
};
