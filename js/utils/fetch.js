export default async function useStats(url) {
  let data, error;

  const controller = new AbortController();
  const { signal } = controller;

  try {
    const res = await fetch(url, { signal });
    data = await res.json();
  } catch (error) {
    error = error;
  }

  return {
    data,
    error,
    abort: controller.abort.bind(controller)
  };
}

export async function abortAll(urls, signal) {
  const casesFetched = urls.map(async url => {
    const response = await fetch(url, { signal });
    return response.json();
  });

  return Promise.all(casesFetched);
}
