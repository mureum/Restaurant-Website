import axios from "axios";

export const sendToKitchen = async (selectedItems, items) => {
  try {
    const itemsToSend = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([index, _]) => items[index]);

    if (itemsToSend.length === 0) {
      window.alert("Please select at least one order to send to kitchen");
      return;
    }

    const orders = itemsToSend.map(
      ({ tableNumber, orderNumber, customerName, time, details }) => ({
        table: tableNumber,
        orderNumber,
        customerName,
        time,
        details,
      })
    );

    const response = await axios.post(`http://localhost:8800/sendToKitchen`, {
      orders,
    });

    if (response.data.success) {
      window.alert("Selected orders sent to kitchen");
      window.location.reload();
    } else {
      window.alert("Error on sending the orders");
    }
  } catch (err) {
    window.alert("Error on sending the orders");
    console.log(err);
  }
};

export const markInPreparation = async (selectedItems, items) => {
  try {
    const itemsToSend = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([index, _]) => items[index]);

    if (itemsToSend.length === 0) {
      window.alert("Please select at least one order to send to kitchen");
      return;
    }

    const orders = itemsToSend.map(
      ({ tableNumber, orderNumber, customerName, time, details }) => ({
        table: tableNumber,
        orderNumber,
        customerName,
        time,
        details,
      })
    );

    const response = await axios.post(`http://localhost:8800/sendToKitchen`, {
      orders,
    });

    if (response.data.success) {
      window.alert("Selected orders sent to kitchen");
      window.location.reload();
    } else {
      window.alert("Error on sending the orders");
    }
  } catch (err) {
    window.alert("Error on sending the orders");
    console.log(err);
  }
};

export const completeOrder = async (selectedItems, items) => {
  try {
    const itemsToSend = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([index, _]) => items[index]);

    if (itemsToSend.length === 0) {
      window.alert("Please select at least one order to send to kitchen");
      return;
    }

    const orders = itemsToSend.map(
      ({ tableNumber, orderNumber, customerName, time, details, paid }) => ({
        table: tableNumber,
        orderNumber,
        customerName,
        time,
        details,
        paid
      })
    );

    const response = await axios.post(`http://localhost:8800/completeOrder`, {
      orders,
    });

    if (response.data.success) {
      window.alert("Selected orders sent to kitchen");
      window.location.reload();
    } else {
      window.alert("Error on sending the orders");
    }
  } catch (err) {
    window.alert("Error on sending the orders");
    console.log(err);
  }
};

export const markAsReady = async (selectedItems, items) => {
  try {
    const itemsToSend = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([index, _]) => items[index]);

    if (itemsToSend.length === 0) {
      window.alert("Please select at least one order to send to kitchen");
      return;
    }

    const orders = itemsToSend.map(
      ({ tableNumber, orderNumber, customerName, time, details }) => ({
        table: tableNumber,
        orderNumber,
        customerName,
        time,
        details,
      })
    );

    const response = await axios.post(`http://localhost:8800/makeOrderReady`, {
      orders,
    });

    if (response.data.success) {
      window.alert("Selected orders sent to kitchen");
      window.location.reload();
    } else {
      window.alert("Error on sending the orders");
    }
  } catch (err) {
    window.alert("Error on sending the orders");
    console.log(err);
  }
};

export const markAsDelivered = async (selectedItems, items) => {
  try {
    const itemsToSend = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([index, _]) => items[index]);

    if (itemsToSend.length === 0) {
      window.alert("Please select at least one order to send to kitchen");
      return;
    }

    const orders = itemsToSend.map(
      ({ tableNumber, orderNumber, customerName, time, details, paid}) => ({
        table: tableNumber,
        orderNumber,
        customerName,
        time,
        details,
        paid
      })
    );

    const response = await axios.post(`http://localhost:8800/makeOrderDelivered`, {
      orders,
    });

    if (response.data.success) {
      window.alert("Selected orders delivered");
      window.location.reload();
    } else {
      window.alert("Error on delivering the orders");
    }
  } catch (err) {
    window.alert("Error on delivering the orders");
    console.log(err);
  }
};

export const deleteOrder = async (selectedItems, items) => {
  try {
    const itemsToDelete = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([index, _]) => items[index]);

    if (itemsToDelete.length === 0) {
      window.alert("Please select at least one order to delete");
      return;
    }

    const orderNumbers = itemsToDelete
      .map((item) => item.orderNumber)
      .join(",");

    await axios.delete("http://localhost:8800/deleteOrder", {
      data: { orderNumbers: itemsToDelete.map((item) => item.orderNumber) },
    });

    window.alert("Selected orders deleted from the table");
    window.location.reload();
  } catch (err) {
    window.alert("Error on deleting the orders");
    console.log(err);
  }
};
