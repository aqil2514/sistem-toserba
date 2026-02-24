import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import { useFetch } from "./use-fetch";

jest.mock("swr");
const mockUseSWR = useSWR as jest.Mock;

it("return data ketika fetch berhasil", () => {
  mockUseSWR.mockReturnValue({
    data: { id: "1", name: "Test" },
    error: undefined,
    isLoading: false,
    mutate: jest.fn(),
  });

  const { result } = renderHook(() => useFetch("/api/test"));

  expect(result.current.data).toEqual({ id: "1", name: "Test" });
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBeUndefined();
});
