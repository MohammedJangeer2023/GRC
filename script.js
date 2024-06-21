document.addEventListener('DOMContentLoaded', function () {
    // DFD rendering using D3.js
    const width = 800; // Decreased width
    const height = 600; // Decreased height

    const svg = d3.select('#dfd')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Sample data for DFD
    const nodes = [
        { id: 1, name: 'External ISP', x: 50, y: 50, color: '#ff7f0e' },
        { id: 2, name: 'ISP Router', x: 200, y: 50, color: '#2ca02c' },
        { id: 3, name: 'Core Router', x: 400, y: 50, color: '#d62728' },
        { id: 4, name: 'Firewall1', x: 600, y: 50, color: '#9467bd' },
        { id: 5, name: 'Gateway Switch', x: 750, y: 50, color: '#8c564b' },
        { id: 6, name: 'Web Server', x: 700, y: 300, color: '#e377c2' },
        { id: 7, name: 'Admin User', x: 100, y: 200, color: '#7f7f7f' },
        { id: 8, name: 'Standard User', x: 100, y: 400, color: '#7f7f7f' },
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
        .attr('y2', d => nodes.find(n => n.id === d.target).y)
        .style('stroke', d => d.red ? 'red' : 'black')
        .style('stroke-width', 2);

    // Create nodes
    svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 15) // Decreased radius
        .attr('fill', d => d.color)
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    // Add labels
    svg.selectAll('.label')
        .data(nodes)
        .enter()
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y - 20)
        .text(d => d.name)
        .attr('font-size', '10px')
        .attr('text-anchor', 'middle');

    // Add notes
    const notes = [
        { x: 50, y: 300, text: 'Note: External ISP is the starting point of the network.' },
        { x: 700, y: 350, text: 'Note: Web Server interacts with both Admin and Standard Users.' },
        { x: 525, y: 200, text: 'Note: Intercepted Node represents a potential security risk.' }
    ];

    svg.selectAll('.note')
        .data(notes)
        .enter()
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .text(d => d.text)
        .attr('font-size', '12px')
        .attr('fill', '#000');

    function dragstarted(event, d) {
        d3.select(this).raise().attr('stroke', 'black');
    }

    function dragged(event, d) {
        d3.select(this)
            .attr('cx', d.x = event.x)
            .attr('cy', d.y = event.y);

        svg.selectAll('.link')
            .filter(l => l.source === d.id || l.target === d.id)
            .attr('x1', l => nodes.find(n => n.id === l.source).x)
            .attr('y1', l => nodes.find(n => n.id === l.source).y)
            .attr('x2', l => nodes.find(n => n.id === l.target).x)
            .attr('y2', l => nodes.find(n => n.id === l.target).y);
    }

    function dragended(event, d) {
        d3.select(this).attr('stroke', null);
    }
});