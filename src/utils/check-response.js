export function checkResponse(res) {
    if (!res.ok) {
      throw new Error("Произошла ошибка");
    }
    return res.json();
  }
  