import React, { useEffect, useRef } from 'react';

const DecisionTreeVisualization = ({ rules, selectedPreferences }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!rules || !svgRef.current) return;
    
    renderTree();
  }, [rules, selectedPreferences]);
  
  const renderTree = () => {
    // Clear previous SVG content
    const svg = svgRef.current;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Set up dimensions
    const width = 900;
    const height = 600;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    
    // Create mapping of conclusions to rules
    const conclusionMap = {};
    rules.forEach(rule => {
      if (!conclusionMap[rule.conclusion]) {
        conclusionMap[rule.conclusion] = [];
      }
      conclusionMap[rule.conclusion].push(rule);
    });
    
    // Get all unique conditions and conclusions
    const allConditions = new Set();
    rules.forEach(rule => {
      rule.conditions.forEach(condition => allConditions.add(condition));
    });
    
    const allConclusions = new Set();
    rules.forEach(rule => {
      allConclusions.add(rule.conclusion);
    });
    
    // Calculate positions for the tree
    const conditionY = 50;
    const conclusionY = 400;
    const conditionSpacing = width / (allConditions.size + 1);
    const conclusionSpacing = width / (Object.keys(conclusionMap).length + 1);
    
    // Mapping conditions to x positions
    const conditionXPositions = {};
    Array.from(allConditions).sort().forEach((condition, index) => {
      conditionXPositions[condition] = (index + 1) * conditionSpacing;
    });
    
    // Mapping conclusions to x positions
    const conclusionXPositions = {};
    Object.keys(conclusionMap).sort().forEach((conclusion, index) => {
      conclusionXPositions[conclusion] = (index + 1) * conclusionSpacing;
    });
    
    // Draw conditions (top layer)
    Array.from(allConditions).forEach(condition => {
      const x = conditionXPositions[condition];
      
      // Create condition node
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', conditionY);
      circle.setAttribute('r', 20);
      circle.setAttribute('fill', selectedPreferences.includes(condition) ? '#4CAF50' : '#646cff');
      svg.appendChild(circle);
      
      // Create text label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', conditionY - 30);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'white');
      text.textContent = condition;
      svg.appendChild(text);
    });
    
    // Draw conclusions (bottom layer)
    Object.keys(conclusionMap).forEach(conclusion => {
      const x = conclusionXPositions[conclusion];
      
      // Find the movie name from the rule message
      const movieName = conclusionMap[conclusion][0].message.split(' - ')[0];
      
      // Create conclusion node
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x - 60);
      rect.setAttribute('y', conclusionY - 15);
      rect.setAttribute('width', 120);
      rect.setAttribute('height', 30);
      rect.setAttribute('rx', 5);
      rect.setAttribute('fill', '#1a1a1a');
      rect.setAttribute('stroke', '#646cff');
      rect.setAttribute('stroke-width', 2);
      svg.appendChild(rect);
      
      // Create text label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', conclusionY + 5);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'white');
      text.textContent = movieName;
      svg.appendChild(text);
      
      // Draw connections from conditions to this conclusion
      conclusionMap[conclusion].forEach(rule => {
        rule.conditions.forEach(condition => {
          const conditionX = conditionXPositions[condition];
          
          // Create line connecting condition to conclusion
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const startX = conditionX;
          const startY = conditionY + 20;
          const endX = x;
          const endY = conclusionY - 15;
          const midY = (startY + endY) / 2;
          
          path.setAttribute('d', 
            `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`);
          path.setAttribute('stroke', selectedPreferences.includes(condition) ? '#4CAF50' : '#646cff');
          path.setAttribute('stroke-width', 2);
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke-opacity', '0.6');
          svg.appendChild(path);
        });
      });
    });
    
    // Add legend
    const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const legendRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    legendRect.setAttribute('x', 20);
    legendRect.setAttribute('y', 20);
    legendRect.setAttribute('width', 160);
    legendRect.setAttribute('height', 80);
    legendRect.setAttribute('fill', '#2a2a2a');
    legendRect.setAttribute('rx', 5);
    legend.appendChild(legendRect);
    
    // Selected preference
    const selectedCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    selectedCircle.setAttribute('cx', 40);
    selectedCircle.setAttribute('cy', 40);
    selectedCircle.setAttribute('r', 10);
    selectedCircle.setAttribute('fill', '#4CAF50');
    legend.appendChild(selectedCircle);
    
    const selectedText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    selectedText.setAttribute('x', 60);
    selectedText.setAttribute('y', 45);
    selectedText.setAttribute('fill', 'white');
    selectedText.textContent = 'Selected Preference';
    legend.appendChild(selectedText);
    
    // Available preference
    const availableCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    availableCircle.setAttribute('cx', 40);
    availableCircle.setAttribute('cy', 70);
    availableCircle.setAttribute('r', 10);
    availableCircle.setAttribute('fill', '#646cff');
    legend.appendChild(availableCircle);
    
    const availableText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    availableText.setAttribute('x', 60);
    availableText.setAttribute('y', 75);
    availableText.setAttribute('fill', 'white');
    availableText.textContent = 'Available Preference';
    legend.appendChild(availableText);
    
    svg.appendChild(legend);
  };
  
  return (
    <div className="decision-tree">
      <h3>Decision Tree Visualization</h3>
      <p>This diagram shows how your preferences connect to movie recommendations</p>
      <div className="tree-container">
        <svg ref={svgRef} width="100%" height="600px"></svg>
      </div>
    </div>
  );
};

export default DecisionTreeVisualization;
