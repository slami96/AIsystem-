export function forwardChaining(facts, rules) {
  // Clone our facts array to avoid mutating the original
  let knownFacts = [...facts];
  let conclusions = [];
  let hasNewFacts = true;
  let iterations = 0;
  const MAX_ITERATIONS = 100; // Safety check to prevent infinite loops
  
  // Track each rule application for explanation purposes
  let explanations = [];
  
  while (hasNewFacts && iterations < MAX_ITERATIONS) {
    hasNewFacts = false;
    iterations++;
    
    // Go through each rule
    for (const rule of rules) {
      // Check if this rule's conditions are satisfied by our facts
      const conditionsSatisfied = rule.conditions.every(condition => 
        knownFacts.includes(condition)
      );
      
      // If conditions are met and we haven't already drawn this conclusion
      if (conditionsSatisfied && !knownFacts.includes(rule.conclusion)) {
        knownFacts.push(rule.conclusion);
        conclusions.push({
          conclusion: rule.conclusion,
          message: rule.message
        });
        
        // Track why this conclusion was reached
        explanations.push({
          appliedRule: rule.id,
          conditions: rule.conditions,
          conclusion: rule.conclusion,
          message: rule.message
        });
        
        hasNewFacts = true;
      }
    }
  }
  
  return {
    newFacts: knownFacts,
    conclusions: conclusions,
    explanations: explanations
  };
}
