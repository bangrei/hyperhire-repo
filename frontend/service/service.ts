const getParents = async () => {
  const res = await fetch("/api/menu", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json;
};

const createMenu = async (params: any) => {
  const res = await fetch("/api/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  return json;
};

const updateMenu = async (id: string, params: any) => {
  const res = await fetch(`/api/menu/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  return json;
};
const removeMenu = async (id: string) => {
  const res = await fetch(`/api/menu/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json;
};

export default {
  getParents,
  createMenu,
  updateMenu,
  removeMenu,
};
