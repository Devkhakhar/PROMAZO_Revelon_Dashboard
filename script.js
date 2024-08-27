document.addEventListener('DOMContentLoaded', function () {
    // Setting up the charts as before
    var ctx1 = document.getElementById('salesChart').getContext('2d');
    var salesChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Overall Sales',
                data: [12000, 19000, 3000, 5000, 20000],
                borderColor: '#007BFF',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    enabled: true
                }
            }
        }
    });

    var ctx2 = document.getElementById('marginChart').getContext('2d');
    var marginChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Category A', 'Category B', 'Category C'],
            datasets: [{
                label: 'Gross Margin',
                data: [65, 59, 80],
                backgroundColor: '#28a745'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    enabled: true
                }
            }
        }
    });

    var ctx3 = document.getElementById('growthChart').getContext('2d');
    var growthChart = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Category A', 'Category B', 'Category C'],
            datasets: [{
                label: 'Growth',
                data: [300, 50, 100],
                backgroundColor: ['#007BFF', '#28a745', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                tooltip: {
                    enabled: true
                }
            }
        }
    });

    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.navigation-panel a');
    const views = document.querySelectorAll('.dashboard-view');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetView = link.getAttribute('data-view');

            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            link.classList.add('active');

            // Hide all views
            views.forEach(view => view.classList.remove('active-view'));
            // Show the targeted view
            document.getElementById(targetView).classList.add('active-view');

            // Update the header title
            const title = link.textContent;
            document.getElementById('dashboard-title').textContent = title;
        });
    });

    // Save view functionality
    document.querySelector('.save-view').addEventListener('click', function () {
        const savedViews = JSON.parse(localStorage.getItem('savedViews')) || [];
        const currentView = {
            name: prompt("Enter a name for this view:"),
            salesData: salesChart.data.datasets[0].data,
            marginData: marginChart.data.datasets[0].data,
            growthData: growthChart.data.datasets[0].data
        };
        savedViews.push(currentView);
        localStorage.setItem('savedViews', JSON.stringify(savedViews));
        alert('View saved successfully!');
    });
});
