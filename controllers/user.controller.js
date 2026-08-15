module.exports.esmfnction = async (req, res) => {
    try {
        // logic
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ message: error.message });       
    }
}

module.exports.hello = async (req, res) => {
    try {
        // logic
        const message = 'Hello, World!';
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}            
