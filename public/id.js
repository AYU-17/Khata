function printTable() {
    if (!$('#majdur').val()) {
        alert("Please enter Majduri before printing.");
        return;
    }

    if (!$('#dateInput').val()) {
        alert("Please enter Date before printing.");
        return;
    }

    if (!$('#partySelect').val()) {
        alert("Please enter party name before printing.");
        return;
    }


    const selectedParty = $('#partySelect option:selected').text();
    $('#partyNameDisplay').text(selectedParty);


    const selectedDate = $('#dateInput').val();
    if (selectedDate) {
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
        $('#invoiceDate').text(formattedDate);
    }

    // Force update all totals before printing
    updateTotals();

    // Get the print area HTML
    const printContent = document.getElementById('printArea').innerHTML;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');

    // Write the HTML content
    printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>print</title>
                

                <style>
                     body { 
        font-family: Arial, sans-serif; 
        font-size: 11px; 
        margin: 10px;
    }
    table { 
        width: 100%; 
        border-collapse: collapse; 
        font-size: 10px; 
    }
    th, td { 
        border: 1px solid #000; 
        padding: 4px; 
        text-align: center; 
    }
    h2 {
        font-size: 16px;
    }
    .no-print { display: none; }
    .work {display: none;}
    td:last-child, th:last-child { display: none; }
</style>

            </head>
            <body>
                ${printContent}
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 200);
                    };
                <\/script>
            </body>
            </html>
        `);

    printWindow.document.close();
}

function saveInvoice() {
    // Validate required fields
    if (!$('#majdur').val()) {
        alert("Please enter Majduri before saving.");
        return;
    }

    if (!$('#dateInput').val()) {
        alert("Please enter Date before saving.");
        return;
    }

    if (!$('#partySelect').val()) {
        alert("Please enter party name before printing.");
        return;
    }

    // Update party and date display
    const selectedParty = $('#partySelect option:selected').text();
    $('#partyNameDisplay').text(selectedParty);

    const selectedDate = $('#dateInput').val();
    if (selectedDate) {
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
        $('#invoiceDate').text(formattedDate);
    }

    // Force update all totals before saving
    updateTotals();

    // Clone the printArea to avoid affecting the original
    const printArea = document.getElementById('printArea').cloneNode(true);

    // Remove any remaining "no-print" elements
    const noPrintElements = printArea.querySelectorAll('.no-print');
    noPrintElements.forEach(el => el.remove());

    // Get the HTML content with proper styling
    const printContent = printArea.innerHTML;

    // Create a complete HTML document with styles
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice</title>
            <meta charset="UTF-8">
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    font-size: 11px; 
                    margin: 10px;
                }
                table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    font-size: 10px; 
                }
                th, td { 
                    border: 1px solid #000; 
                    padding: 4px; 
                    text-align: center; 
                }
                h2 {
                    font-size: 16px;
                }
                .no-print { display: none; }
                .work {display: none;}
                
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `;

    // Create filename
    const partyName = selectedParty.replace(/\s+/g, '_');
    const invoiceDate = $('#dateInput').val();

    // Create and trigger download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice_${invoiceDate}_${partyName}.html`;
    link.click();
    URL.revokeObjectURL(link.href);
}


$(document).ready(function () {
    // Handle page selection change
    $('#pageSelector').change(function () {
        const selectedRoute = $(this).val();
        if (selectedRoute) {
            window.location.href = selectedRoute;
        }
    });
});

