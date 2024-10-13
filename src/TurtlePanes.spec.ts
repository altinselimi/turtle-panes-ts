import { test, expect, vi } from "vitest";
import { render, cleanup } from "vitest-browser-vue";
import "./style.css";

import TurtlePanes from "./TurtlePanesDemo.vue";

test("TurtlePanes - renders a splitter", async () => {
  const { getByTestId } = render(TurtlePanes);

  // Get all elements with role "splitter"

  await vi.waitFor(
    async () =>
      await expect.element(getByTestId("splitter-1")).toBeInTheDocument(),
    {
      interval: 10, // default is 50
    },
  );

  // cleanup is not working very well, the context is being remembered for all tests
  cleanup();
});

test("TurtlePanes - renders", async () => {
  const { getByText } = render(TurtlePanes);

  await expect
    .element(
      getByText(
        "The Essentials of Frontend Development: Crafting Engaging Web Experiences",
      ),
    )
    .toBeInTheDocument();

  cleanup();
});
