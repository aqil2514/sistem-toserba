import { Button } from "@/components/ui/button";
import { useFilterPanel } from "./provider.filter-panel";

export function FilterPanelFooter() {
  const { setSnapshot, onApplyFilter, snapshot, setOpen, config } =
    useFilterPanel();
  const addHandler = () => {
    setSnapshot((prev) => [...prev, { value: "", key: config[0].field }]);
  };

  const filterHandler = () => {
    onApplyFilter(snapshot);
    setOpen(false);
  };
  return (
    <div className="flex justify-between">
      <Button variant={"outline"} size={"sm"} onClick={addHandler}>
        Tambah Filter
      </Button>
      <Button variant={"outline"} onClick={filterHandler} size={"sm"}>
        Terapkan Filter
      </Button>
    </div>
  );
}
