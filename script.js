$(document).ready(function() {
    let numColors = 2; // Initial number of colors
    let colorPickers = [];
    let gradientType = 'linear';
    let linearAngle = 45;
    let radialShape = 'circle';
    let radialPosition = 'center';

    // Function to generate color pickers
    function generateColorPickers(num) {
        $('#color-picker-container').empty(); // Clear existing pickers
        colorPickers = []; // Clear the array
        for (let i = 0; i < num; i++) {
            const wrapper = $('<div class="color-picker-wrapper">');
            wrapper.append(`<label for="color-${i}">Color ${i+1}:</label>`);
            const input = $(`<input type="text" id="color-${i}" class="color-picker">`);
            wrapper.append(input);
            $('#color-picker-container').append(wrapper);

            input.spectrum({
                type: "color",
                showInput: true,
                showInitial: true,
                preferredFormat: "hex",
                change: function(color) {
                    updateGradient();
                }
            });
            colorPickers.push(input); // Store the input element
        }
        updateGradient(); // Initial gradient update
    }

    // Function to generate gradient CSS
    function generateGradientCSS() {
        let colorValues = [];
        for (let i = 0; i < colorPickers.length; i++) {
            colorValues.push(colorPickers[i].spectrum("get").toHexString());
        }

        let gradientString = '';
        if (gradientType === 'linear') {
            gradientString = `linear-gradient(${linearAngle}deg, ${colorValues.join(', ')})`;
        } else if (gradientType === 'radial') {
            gradientString = `radial-gradient(${radialShape} at ${radialPosition}, ${colorValues.join(', ')})`;
        }

        return gradientString;
    }

    // Function to update gradient preview and CSS code
    function updateGradient() {
        const gradientCSS = generateGradientCSS();
        $('#gradient-preview').css('background-image', gradientCSS);
        $('#css-code').val(`background-image: ${gradientCSS};`); // Update the textarea
    }

    // Event listeners
    $('#num-colors').change(function() {
        numColors = parseInt($(this).val());
        generateColorPickers(numColors);
    });

    $('#gradient-type').change(function() {
        gradientType = $(this).val();
        if (gradientType === 'linear') {
            $('#linear-options').show();
            $('#radial-options').hide();
        } else {
            $('#linear-options').hide();
            $('#radial-options').show();
        }
        updateGradient();
    });

    $('#linear-angle').on('input', function() {
        linearAngle = $(this).val();
        updateGradient();
    });

    $('#radial-shape').change(function() {
        radialShape = $(this).val();
        updateGradient();
    });

    $('#radial-position').on('input', function() {
        radialPosition = $(this).val();
        updateGradient();
    });

    $('#copy-button').click(function() {
        $('#css-code').select();
        document.execCommand('copy');
        alert('CSS code copied to clipboard!');
    });

    // Initial setup
    generateColorPickers(numColors);


});
