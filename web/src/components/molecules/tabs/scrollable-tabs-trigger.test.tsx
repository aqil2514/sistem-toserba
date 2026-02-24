import "@testing-library/jest-dom";
import { Tabs } from "@/components/ui/tabs";
import { render, screen } from "@testing-library/react";
import { ScrollableTabsTrigger } from "./scrollable-tabs-trigger";

const mockItems = [{ id: "item-1" }, { id: "item-2" }, { id: "item-3" }];

const renderComponent = (props = {}) => {
  return render(
    <Tabs defaultValue="item-1">
      <ScrollableTabsTrigger items={mockItems} {...props} />
    </Tabs>,
  );
};

it("menampilkan jumlah tab sesuai items", () => {
  renderComponent();
  expect(screen.getAllByRole("tab")).toHaveLength(3);
});

it("menampilkan nomor urut tab dengan benar", () => {
  renderComponent();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
});

it("tab disabled ketika props disabled true", () => {
  renderComponent({ disabled: true });
  screen.getAllByRole("tab").forEach((tab) => expect(tab).toBeDisabled());
});

it("tidak disabled secara default", () => {
  renderComponent();
  screen.getAllByRole("tab").forEach((tab) => expect(tab).not.toBeDisabled());
});
