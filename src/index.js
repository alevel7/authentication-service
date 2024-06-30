const app  = require('./app')

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})