export function backwardChaining(goal, facts, rules) {
  // Create sets to track visited goals and explanations
  const visited = new Set();
  let explanations = [];
  
  // Define recursive helper function
  function backchainHelper(currentGoal, depth = 0) {
    // If we've already considered this goal, avoid cycles
    if (visited.has(currentGoal)) return false;
    visited.add(currentGoal);
    
    // If the goal is already a known fact, we're done
    if (facts.includes(currentGoal)) return true;
    
    // Find all rules that could satisfy our goal
    const relevantRules = rules.filter(rule => rule.conclusion === currentGoal);
    
    // For each rule, try to satisfy its conditions
    for (const rule of relevantRules) {
      let allConditionsMet = true;
      const pendingConditions = [];
      
      // Check each condition in the rule
      for (const condition of rule.conditions) {
        if (facts.includes(condition)) {
          // Already known fact
          continue;
        } else {
          // Try to prove this condition recursively
          if (!backchainHelper(condition, depth + 1)) {
            allConditionsMet = false;
            pendingConditions.push(condition);
          }
        }
      }
      
      // If all conditions are satisfied, we've proven the goal
      if (allConditionsMet) {
        explanations.push({
          goal: currentGoal,
          rule: rule.id,
          satisfiedBy: rule.conditions,
          message: rule.message
        });
        return true;
      } else {
        // Record what was missing
        explanations.push({
          goal: currentGoal,
          rule: rule.id,
          missing: pendingConditions,
          message: rule.message
        });
      }
    }
    
    // If we get here, we couldn't satisfy the goal
    return false;
  }
  
  // Run the algorithm and return results
  const isGoalAchievable = backchainHelper(goal);
  
  return {
    isAchievable: isGoalAchievable,
    explanations: explanations
  };
}
