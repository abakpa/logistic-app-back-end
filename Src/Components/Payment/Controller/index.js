const paymentService = require('../Services/index');

const createOrderPayment = async (req, res) => {
    try {
        const payment = await paymentService.createOrderPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaymentVerification = async (req, res) => {
    const { reference } = req.params;
    const {id} = req.query

    try {
        const payment = await paymentService.getPaymentVerification(reference,id);
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrderPayments = async (req, res) => {
    try {
        const payment = await paymentService.getOrderPayments();
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createOrderPayment,
    getPaymentVerification,
    getOrderPayments,
 
};
