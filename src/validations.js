const yup = require('yup');

function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);

            next();
        } catch (error) {
            next(error);
        }
    };
}

function crearProductoValidation(data) {
    const schema = yup.object().shape({
        descripcion: yup.string().min(5).required(),
        precio: yup.number().min(1).max(1000000).required(),
    });

    schema.validateSync(data);
}

module.exports = {
    validate,
    crearProductoValidation,
};