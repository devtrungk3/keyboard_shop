export const formatPrice = (price) => {
    const numericPrice = parseFloat(price);

    return (numericPrice * 25000).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
};