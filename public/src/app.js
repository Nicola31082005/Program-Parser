const groupSelect = document.querySelector('#groupSelect');
const rowsNodeList = document.querySelectorAll('.mainTable tbody tr:not(.mainRow)')

groupSelect.addEventListener('change', (e) => {
    filterTableData(e)
});


function filterTableData(e) {
    const currentGroup = e.target.value;

    rowsNodeList.forEach(row => {
        const group = row.getAttribute('data-group');

        if (!currentGroup || group === currentGroup || group === 'всички') {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}

