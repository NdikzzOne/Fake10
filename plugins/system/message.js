module.exports = function handleMessage(text) {
    switch (text) {
        case 'menu':
            console.log('Message received: menu');
            // Handle the 'menu' case
            break;

        // Add other cases for different texts if necessary
        default:
            console.log('Message received:', text);
            break;
    }
};
