document.addEventListener('DOMContentLoaded', function () {
    const width = 1200;
    const height = 800;

    const svg = d3.select('#dfd')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Sample data
    const nodes = [
        { id: 1, name: 'External ISP', x: 50, y: 50, color: '#ff7f0e' },
        { id: 2, name: 'ISP Router', x: 200, y: 50, color: '#2ca02c' },
        { id: 3, name: 'Core Router', x: 400, y: 50, color: '#d62728' },
        { id: 4, name: 'Firewall1', x: 600, y: 50, color: '#9467bd' },
        { id: 5, name: 'Gateway Switch', x: 800, y: 50, color: '#8c564b' },
        { id: 6, name: 'Web Server', x: 1000, y: 50, color: '#e377c2' },
        { id: 7, name: 'Admin User', x: 50, y: 200, color: '#7f7f7f' },
        { id: 8, name: 'Standard User', x: 50, y: 300, color: '#7f7f7f' },
        { id: 9, name: 'Intercepted Node', x: 525, y: 150, color: '#bcbd22' }
    ];

    const links = [
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 3, target: 4 },
        { source: 4, target: 5 },
        { source: 5, target: 6 },
        { source: 7, target: 6 },
        { source: 8, target: 6 },
        { source: 1, target: 9, red: true },
        { source: 9, target: 4, red: true },
        { source: 9, target: 6, red: true }
    ];

    // Create links
    svg.selectAll('.link')
        .data(links)
        .enter()
        .append('line')
        .attr('class', d => `link${d.red ? ' red' : ''}`)
        .attr('x1', d => nodes.find(n => n.id === d.source).x)
        .attr('y1', d => nodes.find(n => n.id === d.source).y)
        .attr('x2', d => nodes.find(n => n.id === d.target).x)
        .attr('y2', d => nodes.find(n => n.id === d.target).y);

    // Create nodes
    svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 20)
        .attr('fill', d => d.color);

    // Add labels
    svg.selectAll('.label')
        .data(nodes)
        .enter()
        .append('text')
        .attr('x', d => d.x - 20)
        .attr('y', d => d.y + 4)
        .text(d => d.name)
        .attr('font-size', '10px')
        .attr('text-anchor', 'middle');
});