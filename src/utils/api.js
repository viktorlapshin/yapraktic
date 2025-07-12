export const checkResponse = async (response) => {
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Ошибка при оформлении заказа");
    }
    return data;
  };
  