import axios from "axios";

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    credentials: "include", // ⬅️ penting untuk Paseto cookie
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // @ts-expect-error Bawaan
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export async function fetcherAxios<T>(url: string): Promise<T> {
  try {
    const { data } = await axios(url);

    return data;
  } catch (error) {
    throw error
  }
}
