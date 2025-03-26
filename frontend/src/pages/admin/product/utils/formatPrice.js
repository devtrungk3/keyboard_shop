export const formatPrice = (price) => {
    const numericPrice = parseFloat(price);

    return (numericPrice).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
};